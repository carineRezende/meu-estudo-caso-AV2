import React, { useEffect, useState } from "react";
import { View, FlatList, ActivityIndicator, Alert } from "react-native";
import { Card, Button, Text, FAB, useTheme, Dialog, Portal } from "react-native-paper";
import { useRouter } from "expo-router";
import alunoService, { Aluno } from "../../script/alunoService"; 

export default function ListaAlunos() { 
    const [alunos, setAlunos] = useState<Aluno[]>([]); 
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const theme = useTheme();

    const [dialogVisible, setDialogVisible] = useState(false);
    const [alunoParaExcluir, setAlunoParaExcluir] = useState<number | null>(null); 

    const carregarAlunos = async () => { 
        setLoading(true);
        try {
            const lista = await alunoService.listar();
            setAlunos(lista);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        carregarAlunos();
    }, []);

    const showDialog = (id: number) => {
        setAlunoParaExcluir(id);
        setDialogVisible(true);
    };
    const hideDialog = () => setDialogVisible(false);

    const handleConfirmDelete = async () => {
        if (alunoParaExcluir !== null) {
            hideDialog();
            setLoading(true);
            try {
                await alunoService.excluir(alunoParaExcluir); 
                await carregarAlunos();
            } catch (error) {
                Alert.alert("Erro", "Falha ao excluir aluno."); 
            } finally {
                setLoading(false);
                setAlunoParaExcluir(null);
            }
        }
    };

    if (loading)
        return <ActivityIndicator size="large" style={{ marginTop: 40 }} />;

    return (
        <View style={{ flex: 1, padding: 16, backgroundColor: theme.colors.background }}>

            <Portal>
                <Dialog
                    visible={dialogVisible}
                    onDismiss={hideDialog}
                    style={{ backgroundColor: theme.colors.surface }}
                >
                    <Dialog.Title>Confirmar Exclusão</Dialog.Title>
                    <Dialog.Content>
                        <Text variant="bodyMedium">Deseja realmente excluir este aluno?</Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={hideDialog}>Cancelar</Button>
                        <Button
                            onPress={handleConfirmDelete}
                            textColor={theme.colors.onSurface}
                        >
                            Excluir
                        </Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>

            <FlatList
                data={alunos}
                keyExtractor={(item) => item.id?.toString() ?? ""}
                renderItem={({ item }) => (
                    <Card
                        style={{
                            marginBottom: 12,
                            backgroundColor: theme.colors.surface
                        }}
                    >
                        <Card.Title
                            title={item.nome}
                            subtitle={`Matrícula: ${item.matricula}`} 
                        />
                        <Card.Actions>
                            <Button
                                mode="outlined"
                                textColor={theme.colors.onSurface}
                                onPress={() => router.replace(`/alunos/${item.id}`)} 
                                style={{
                                    marginRight: 8,
                                    backgroundColor: theme.colors.background
                                }}
                            >
                                Editar
                            </Button>
                            <Button
                                mode="contained"
                                textColor={theme.colors.onSurface}
                                onPress={() => showDialog(item.id!)}
                                style={{
                                    backgroundColor: theme.colors.secondary
                                }}
                            >
                                Excluir
                            </Button>
                        </Card.Actions>
                    </Card>
                )}
                ListEmptyComponent={
                    <Text style={{ textAlign: "center", marginTop: 20 }}>
                        Nenhum aluno cadastrado. 
                    </Text>
                }
            />
            <FAB
                icon="plus"
                style={{
                    position: "absolute",
                    right: 16,
                    bottom: 16,
                    backgroundColor: theme.colors.secondary,
                    pointerEvents: "auto",
                }}
                onPress={() => router.replace("/alunos/novo")} 
                color={theme.colors.onSurface}
            />
        </View>
    );
}