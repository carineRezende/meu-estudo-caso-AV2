# 🚀 Estudo de Caso: CRUD de Alunos (Web e Mobile)

## 📝 Descrição do Projeto

Este projeto é um **Estudo de Caso Avançado** que visa demonstrar a implementação completa de um **CRUD (Create, Read, Update, Delete)** em dois ambientes de desenvolvimento distintos, consumindo a mesma **API REST** de alunos.

O objetivo funcional é simular um sistema de gerenciamento de alunos, permitindo:
1.  **Visualização** da lista de alunos.
2.  **Consulta** e **Edição** dos detalhes de um aluno específico.
3.  **Criação** de novos registros.
4.  **Exclusão** de alunos existentes.
5.  Inclusão de **Testes Automatizados** na versão web.

O projeto é dividido em:
* **Aplicação Web** (`web/`): Implementada com React, Vite e testes com Vitest.
* **Aplicação Mobile** (`mobile/`): Implementada com React Native, Expo e navegação.

---

## 💻 Tecnologias e Dependências

Abaixo estão as ferramentas e bibliotecas utilizadas para cada plataforma:

| Plataforma | Framework Base | Roteamento | Requisições | Testes & Componentes |
| :--- | :--- | :--- | :--- | :--- |
| **Web** (`web/`) | React (Vite) | React Router DOM  | Axios  | React Bootstrap, Vitest , Testing Library  |
| **Mobile** (`mobile/`) | React Native (Expo)  | Expo Router (React Navigation)  | Axios  | React Native Paper (Estilização) |
| **API** | REST de Alunos | Endpoint: `https://proweb.leoproti.com.br/alunos` |

---

## 🗺️ Rotas Implementadas

A navegação e a lógica de exibição de detalhes são controladas pelas rotas específicas de cada plataforma.

### 🌐 Aplicação Web (React Router DOM)

As rotas são definidas pela URL e direcionam para as páginas de gerenciamento:

| Rota | Descrição | Funcionalidades |
| :--- | :--- | :--- |
| `/` | **Página Inicial / Lista de Alunos** | Exibe a lista completa de alunos. Ponto de partida para a navegação. |
| `/alunos/novo` | **Cadastro de Aluno** | Formulário para a operação **Create**. |
| `/alunos/:id` | **Detalhes e Edição** | Carrega um aluno pelo ID e permite a operação **Update**. |

### 📱 Aplicação Mobile (Expo Router)

As rotas seguem o padrão de roteamento baseado em arquivos do Expo Router:

| Rota | Arquivo | Funcionalidades |
| :--- | :--- | :--- |
| `/` | `app/index.tsx` | Tela de Boas-Vindas e link principal para a listagem. |
| `/alunos/index.tsx` | `app/alunos/index.tsx` | **Listagem de Alunos (Read)**, acesso rápido para Criação e botões para Edição e **Exclusão (Delete)**. |
| `/alunos/novo.tsx` | `app/alunos/novo.tsx` | Formulário para **Criação (Create)** de um novo aluno. |
| `/alunos/[id].tsx` | `app/alunos/[id].tsx` | **Edição (Update)** do aluno selecionado, carregando os dados via ID da rota. |

---

## 🔧 Instruções de Instalação e Execução (Passo a Passo)

Certifique-se de ter o **Node.js** e o **npm** ou **yarn** instalados em sua máquina.

### 1. 📦 Configuração Inicial (Criação da Pasta Raiz)

Crie a pasta principal do projeto e acesse-a:
```bash
mkdir meu-estudo-caso
cd meu-estudo-caso
```
---

### 2. 🌐 Parte Web (web/)

Os comandos abaixo criam e iniciam a aplicação Web com o React e as dependências:
```bash
# Criação do Projeto Web (Vite + React)
npm create vite@latest web -- --template react

# Acessar a Pasta Web e Instalar o Núcleo
cd web
npm install

# Instalar Roteador, Axios e Testes
npm install react-router-dom axios react-bootstrap vitest @testing-library/react @testing-library/jest-dom

# Executar o Servidor
npm run dev
# A aplicação Web estará rodando em http://localhost:5173/
```
---

### 3. 📱 Parte Mobile (mobile/)

Os comandos abaixo criam e iniciam a aplicação Mobile com o Expo e o React Navigation (via Expo Router):
```bash
# Voltar para a Pasta Raiz (meu-estudo-caso)
cd ..

# Criação do Projeto Mobile (Expo)
npx create-expo-app mobile

# Acessar a Pasta Mobile e Instalar Dependências
cd mobile
npm install

# Instalar Bibliotecas Essenciais (Navigation, Axios, React Native Paper)
npx expo install @react-navigation/native @react-navigation/native-stack react-native-screens react-native-safe-area-context axios react-native-paper

# Executar o Projeto
npx expo start
# Use o app Expo Go no celular ou um emulador para rodar a aplicação Mobile.
```

---

### 4. 🧪 Instruções para Rodar Testes com Vitest 

A versão web inclui testes automatizados com Vitest e React Testing Library.

Certifique-se de estar no diretório web/.

Execute o comando de teste:

```bash
npm test
# ou yarn test
```
Isso executará os testes e exibirá o relatório de cobertura e resultados no terminal.

---
### 5. ☁️ Deploy e Publicação da Versão Web (Vercel)

Link: (https://meu-estudo-caso-av-2-nu.vercel.app/)

---

### 6. Créditos e Referências

- Roteiro da Atividade: AV2 - Estudo de Caso com Rotas, Consumo de API e Testes Automatizados.
- API REST Pública de Alunos: https://proweb.leoproti.com.br/alunos.
- Documentação e Tutoriais de Apoio:
- React Router DOM (Web) 
- React Navigation com Expo (Mobile) 
- Deploy com Vercel 
- Testes com Vitest
