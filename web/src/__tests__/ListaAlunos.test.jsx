import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ListaAlunos from '../pages/ListaAlunos';
import alunoService from '../services/alunoService';

vi.mock('../services/alunoService');
const navigateMock = vi.fn();
vi.mock('react-router-dom', async (importOriginal) => {
    const actual = await importOriginal();
    return {
        ...actual,
        useNavigate: () => navigateMock,
    };
});

describe('ListaAlunos', () => {
    const mockAlunos = [
        { id: 1, nome: 'Ana Silva', matricula: 'M123' },
        { id: 2, nome: 'Bruno Costa', matricula: 'M456' },
    ];

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('deve exibir a lista de alunos após carregar os dados', async () => {
        alunoService.listar.mockResolvedValue(mockAlunos);

        render(
            <BrowserRouter>
                <ListaAlunos />
            </BrowserRouter>
        );

        expect(screen.getByRole('progressbar')).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.getByText('Lista de Alunos')).toBeInTheDocument();
            expect(screen.getByText('Ana Silva')).toBeInTheDocument();
            expect(screen.getByText('M123')).toBeInTheDocument();
            expect(screen.getByText('Bruno Costa')).toBeInTheDocument();
            expect(screen.getByText('M456')).toBeInTheDocument();
        });
    });

    it('deve exibir a mensagem de "Nenhum aluno cadastrado" se a lista estiver vazia', async () => {
        alunoService.listar.mockResolvedValue([]);

        render(
            <BrowserRouter>
                <ListaAlunos />
            </BrowserRouter>
        );

        await waitFor(() => {
            expect(screen.getByText('Nenhum aluno cadastrado.')).toBeInTheDocument();
        });
    });
});