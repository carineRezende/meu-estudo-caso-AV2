import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import DetalhesAluno from '../pages/DetalhesAluno';
import alunoService from '../services/alunoService';

vi.mock('../services/alunoService');

const navigateMock = vi.fn();
const useParamsMock = vi.fn();

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: () => navigateMock,
    useParams: () => useParamsMock(),
  };
});

const MockWrapper = ({ initialPath }) => (
  <MemoryRouter initialEntries={[initialPath]}>
    <Routes>
      <Route path="/detalhes/:id" element={<DetalhesAluno />} />
    </Routes>
  </MemoryRouter>
);

describe('DetalhesAluno', () => {
  const alunoMock = { id: 50, nome: 'Pedro Álvares', matricula: 'P808' };

  beforeEach(() => {
    vi.clearAllMocks();
    useParamsMock.mockReturnValue({ id: '50' });
  });

  it('deve exibir os detalhes do aluno após carregar os dados', async () => {
    alunoService.obter.mockResolvedValue(alunoMock);

    render(<MockWrapper initialPath="/detalhes/50" />);

    await waitFor(() => {
      expect(alunoService.obter).toHaveBeenCalledWith('50');
      expect(screen.getByRole('heading', { name: /Detalhes do Aluno/i })).toBeInTheDocument();
    });

    expect(screen.getByText(/Pedro Álvares/i)).toBeInTheDocument();
    expect(screen.getByText(/P808/i)).toBeInTheDocument();
    expect(screen.getByText(/50/i)).toBeInTheDocument();
  });

  it('deve exibir mensagem de erro se a API falhar ao carregar', async () => {
    alunoService.obter.mockRejectedValue(new Error('Falha de rede'));

    render(<MockWrapper initialPath="/detalhes/50" />);

    await waitFor(() => {
      expect(screen.getByText(/Não foi possível carregar os detalhes do aluno/i)).toBeInTheDocument();
    });
  });

  it('deve navegar para a página de edição ao clicar no botão "Editar"', async () => {
    alunoService.obter.mockResolvedValue(alunoMock);

    render(<MockWrapper initialPath="/detalhes/50" />);

    await waitFor(() => {
      const editButton = screen.getByRole('button', { name: /editar/i });
      fireEvent.click(editButton);
      expect(navigateMock).toHaveBeenCalledWith(`/editar/${alunoMock.id}`);
    });
  });
});