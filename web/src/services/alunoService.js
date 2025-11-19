import axios from "axios";

const API_URL = "https://proweb.leoproti.com.br/alunos";

const listar = async () => {
    const response = await axios.get(API_URL);
    const alunos = response.data.data || response.data;
    return Array.isArray(alunos) ? alunos : [];
};

const obter = async (id) => {
    const { data } = await axios.get(`${API_URL}/${id}`);
    return data;
};

const criar = async (aluno) => {
    const { data } = await axios.post(API_URL, aluno);
    return data;
};

const atualizar = async (id, aluno) => {
    const { data } = await axios.put(`${API_URL}/${id}`, aluno);
    return data;
};

const excluir = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
};

export default {
    listar,
    obter,
    criar,
    atualizar,
    excluir,
};