import React, { useEffect } from "react";
import { View } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { TextInput, Button } from "react-native-paper";
import { Aluno } from "../script/alunoService";

interface Props {
    aluno: Aluno; 
    loading: boolean;
    onChange: (name: keyof Aluno, value: string) => void;
    onSubmit: (data?: any) => void;
    onCancel: () => void;
}

export default function FormAluno({ // 💡 Nome do componente
    aluno,
    loading,
    onChange,
    onSubmit,
    onCancel,
}: Props) {
    const { control, handleSubmit, setValue } = useForm({
        defaultValues: {
            nome: aluno.nome,
            matricula: aluno.matricula ?? "", // 💡 Campo matricula
        },
    });

    useEffect(() => {
        setValue("nome", aluno.nome);
        setValue("matricula", aluno.matricula ?? ""); // 💡 Campo matricula
    }, [aluno, setValue]);

    return (
        <View style={{ width: "100%" }}>
            <Controller
                control={control}
                name="nome"
                rules={{ required: "Nome obrigatório" }}
                render={({ field: { onChange: onChangeField, value }, fieldState }) => (
                    <TextInput
                        label="Nome do Aluno" // 💡 Texto atualizado
                        value={value}
                        onChangeText={(text) => {
                            onChangeField(text);
                            onChange("nome", text);
                        }}
                        mode="outlined"
                        style={{ marginBottom: 16, backgroundColor: "#fff" }}
                        autoFocus
                        textColor="#222"
                        underlineColor="#415a77"
                        selectionColor="#415a77"
                        error={!!fieldState.error}
                    />
                )}
            />
            <Controller
                control={control}
                name="matricula" // 💡 Campo Matrícula
                rules={{
                    required: "Matrícula obrigatória",
                }}
                render={({ field: { onChange: onChangeField, value }, fieldState }) => (
                    <TextInput
                        label="Matrícula" // 💡 Label atualizado
                        value={value}
                        onChangeText={(text) => {
                            // Removida a sanitização de preço/decimal
                            onChangeField(text);
                            onChange("matricula", text);
                        }}
                        mode="outlined"
                        // 💡 Removido o keyboardType decimal
                        style={{ marginBottom: 16, backgroundColor: "#fff" }}
                        underlineColor="#415a77"
                        selectionColor="#415a77"
                        textColor="#222"
                        error={!!fieldState.error}
                    />
                )}
            />
            <Button
                mode="contained"
                onPress={handleSubmit(onSubmit)}
                loading={loading}
                style={{ marginBottom: 10, backgroundColor: "#f77f00" }}
                labelStyle={{ color: "#1b263b", fontWeight: "bold" }}
            >
                Salvar
            </Button>
            <Button
                mode="outlined"
                onPress={onCancel}
                labelStyle={{ color: "#f77f00", fontWeight: "bold" }}
            >
                Cancelar
            </Button>
        </View>
    );
}