import { Text, View, Image } from "react-native";
import { Button, Card, useTheme } from "react-native-paper";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();
  const theme = useTheme();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.colors.background,
        padding: 24,
      }}
    >
      <Card
        style={{
          width: "100%",
          maxWidth: 400,
          padding: 24,
          alignItems: "center",
          backgroundColor: theme.colors.surface,
          borderRadius: 16,
          elevation: 4,
        }}
      >

        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            color: theme.colors.secondary,
            marginBottom: 8,
            textAlign: "center",
          }}
        >
          Bem-vindo ao Sistema de Gestão de Alunos
        </Text>
        <Text
          style={{
            textAlign: "center",
            color: theme.colors.onSurface,
            marginBottom: 24,
            fontSize: 16,
          }}
        >
          Organize, acompanhe e otimize o gerenciamento dos seus alunos com praticidade e eficiência.

        </Text>
        <Button
          mode="contained"
          onPress={() => router.push("/alunos")} 
          style={{
            backgroundColor: "#f77f00",
            borderRadius: 8,
            paddingVertical: 6,
            width: "100%",
            alignSelf: "center"
          }}
          labelStyle={{ fontSize: 16, color: theme.colors.surface, fontWeight: "bold" }}
          icon="format-list-bulleted"
        >
          Ver Alunos Cadastrados
        </Button>
      </Card>
    </View>
  );
}