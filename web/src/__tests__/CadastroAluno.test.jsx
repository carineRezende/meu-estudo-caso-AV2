import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CadastroAluno from '../pages/CadastroAluno';
import alunoService from '../services/alunoService';

const navigateMock = vi.fn();
const useParamsMock = vi.fn();

vi.mock('../services/alunoService');

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: () => navigateMock,
    useParams: useParamsMock,
  };
});

const MockWrapper = ({ route }) => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<h1>Lista de Alunos</h1>} />
      <Route path={route} element={<CadastroAluno />} />
    </Routes>
  </BrowserRouter>
);

describe('CadastroAluno', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useParamsMock.mockReturnValue({});
  });

  it('deve criar um novo aluno e redirecionar para a listagem', async () => {
    alunoService.criar.mockResolvedValue({ id: 99, nome: 'Novo Aluno', matricula: 'M001' });

    render(<MockWrapper route="/novo" />);

    expect(screen.getByRole('heading', { name: /Novo Aluno/i })).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/Nome/i), { target: { value: 'João da Silva' } });
    fireEvent.change(screen.getByLabelText(/Matrícula/i), { target: { value: 'A2024' } });

    fireEvent.click(screen.getByRole('button', { name: /salvar/i }));

    await waitFor(() => {
      expect(alunoService.criar).toHaveBeenCalledWith({
        nome: 'João da Silva',
        matricula: 'A2024',
      });
    });

    expect(navigateMock).toHaveBeenCalledWith('/');
  });

  it('deve carregar os dados e atualizar o aluno ao submeter', async () => {
    const alunoExistente = { id: 10, nome: 'Maria Antiga', matricula: 'X999' };

    useParamsMock.mockReturnValue({ id: '10' });
    alunoService.obter.mockResolvedValue(alunoExistente);
    alunoService.atualizar.mockResolvedValue({});

    render(<MockWrapper route="/editar/:id" />);

    await waitFor(() => {
      expect(alunoService.obter).toHaveBeenCalledWith('10');
      expect(screen.getByRole('heading', { name: /Editar Aluno/i })).toBeInTheDocument();
    });

    const inputNome = screen.getByLabelText(/Nome/i);
    fireEvent.change(inputNome, { target: { value: 'Maria Nova' } });

    fireEvent.click(screen.getByRole('button', { name: /salvar/i }));

    await waitFor(() => {
      expect(alunoService.atualizar).toHaveBeenCalledWith('10', {
        nome: 'Maria Nova',
        matricula: 'X999',
      });
    });

    expect(navigateMock).toHaveBeenCalledWith('/');
  });
});