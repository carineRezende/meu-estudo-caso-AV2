// src/pages/DetalhesAluno.jsx

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Paper, Typography, CircularProgress, Button, Box } from "@mui/material";
import alunoService from "../services/alunoService"; 

export default function DetalhesAluno() { 
    const { id } = useParams();
    const [aluno, setAluno] = useState(null); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const carregarDetalhes = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await alunoService.obter(id); 
                setAluno(data);
            } catch (err) {
                console.error("Erro ao carregar detalhes:", err);
                setError("Não foi possível carregar os detalhes do aluno."); 
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            carregarDetalhes();
        } else {
            setLoading(false);
            setError("ID do aluno não fornecido."); 
        }
    }, [id]);

    if (loading) {
        return <CircularProgress sx={{ display: "block", mx: "auto", my: 4 }} />;
    }

    if (error) {
        return <Typography color="error" align="center" sx={{ my: 4 }}>{error}</Typography>;
    }

    if (!aluno) {
        return <Typography align="center" sx={{ my: 4, color: 'text.primary' }}>Aluno não encontrado.</Typography>; 
    }

    return (
        <Paper
            sx={{
                p: { xs: 2, sm: 4 },
                maxWidth: 600,
                mx: "auto",
                borderRadius: 3,
                boxShadow: 3,
            }}
        >
            <Typography variant="h5" gutterBottom color="warning" fontWeight="bold" align="center">
                Detalhes do Aluno // Alterado o texto
            </Typography>

            <Box sx={{ mt: 3, textAlign: 'left' }}>
                <Typography variant="h6" sx={{ color: 'primary.main', mb: 1 }}>
                    Nome: <span style={{ color: '#e0e1dd', fontWeight: 'normal' }}>{aluno.nome}</span>
                </Typography>
                <Typography variant="h6" sx={{ color: 'primary.main', mb: 1 }}>
                    Matrícula: <span style={{ color: '#e0e1dd', fontWeight: 'normal' }}>{aluno.matricula}</span> 
                </Typography>
                <Typography variant="h6" sx={{ color: 'primary.main', mb: 1 }}>
                    ID: <span style={{ color: '#e0e1dd', fontWeight: 'normal' }}>{aluno.id}</span>
                </Typography>
            </Box>

            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => navigate(`/editar/${aluno.id}`)}
                >
                    Editar
                </Button>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => navigate("/")}
                >
                    Voltar à Lista
                </Button>
            </Box>
        </Paper>
    );
}