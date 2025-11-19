import { Routes, Route } from "react-router-dom";
import ListaAluno from "../pages/ListaAlunos"; 
import FormAluno from "../pages/CadastroAluno"; 
import DetalhesAluno from "../pages/DetalhesAluno"; 

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<ListaAluno />} />
            <Route path="/novo" element={<FormAluno />} />
            <Route path="/editar/:id" element={<FormAluno />} />
            <Route path="/detalhes/:id" element={<DetalhesAluno />} />
        </Routes>
    );
}