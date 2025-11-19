import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { useRouter } from "expo-router";
import { useState } from "react";
import alunoService, { Aluno } from "../../script/alunoService"; 
import FormAluno from "../../components/FormAluno"; 

export default function NovoAluno() { 
    const [aluno, setAluno] = useState<Aluno>({ nome: "", matricula: "" }); 
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleChange = (name: keyof Aluno, value: string) => { 
        setAluno((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (data?: any) => {
        const nome = data?.nome ?? aluno.nome;
        const matricula = data?.matricula ?? aluno.matricula; 

        if (!nome || !matricula) {
            alert("Preencha todos os campos!");
            return;
        }
        setLoading(true);
        try {
            await alunoService.criar({ nome, matricula }); 
            router.replace("/alunos"); 
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text
                variant="titleLarge"
                style={{ textAlign: "center", marginBottom: 20, color: "#fcbf49" }}
            >
                Novo Aluno 
            </Text>
            <FormAluno 
                aluno={aluno}
                loading={loading}
                onChange={handleChange}
                onSubmit={handleSubmit}
                onCancel={() => {
                    if (router.canGoBack?.()) {
                        router.back();
                    } else {
                        router.replace("/alunos"); 
                    }
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: "#0d1b2a" },
});