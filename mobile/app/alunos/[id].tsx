import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { Text } from "react-native-paper";
import alunoService, { Aluno } from "../../script/alunoService"; 
import FormAluno from "../../components/FormAluno"; 

export default function EditarAluno() { 
    const { id } = useLocalSearchParams<{ id: string }>();
    const [aluno, setAluno] = useState<Aluno>({ nome: "", matricula: "" }); 
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (id) {
            setLoading(true);
            alunoService.obter(Number(id)).then((data) => { 
                setAluno({ nome: data.nome, matricula: data.matricula }); 
                setLoading(false);
            });
        }
    }, [id]);

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
            await alunoService.atualizar(Number(id), { nome, matricula }); 
            router.replace("/alunos"); 
        } finally {
            setLoading(false);
        }
    };

    if (loading)
        return <ActivityIndicator size="large" style={{ marginTop: 40 }} />;

    return (
        <View style={{ flex: 1, padding: 16 }}>
            <Text
                variant="titleLarge"
                style={{ textAlign: "center", marginBottom: 20 }}
            >
                Editar Aluno 
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