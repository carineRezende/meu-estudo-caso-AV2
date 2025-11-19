import { createTheme } from '@mui/material/styles';

const customTheme = createTheme({
  palette: {
    // 🎯 Cores do Projeto
    primary: {
      // Mapeia para a cor principal de sua interface (cor-secundaria)
      main: '#415a77', 
    },
    secondary: {
      // Mapeia para a cor dos botões de ação (cor-botao)
      main: '#f77f00', 
    },
    warning: {
      // Mapeia para a nova cor de destaque do título (#fcbf49)
      main: '#fcbf49', 
    },
    // 🎯 Cores de Fundo e Texto para o Tema Escuro
    background: {
      default: '#0d1b2a', // --cor-fundo (Fundo principal da página)
      paper: '#1b263b',   // --cor-primaria (Fundo para Paper, Card, etc.)
    },
    text: {
        primary: '#e0e1dd', // --cor-destaque (Texto principal claro)
        secondary: '#e0e1dd', 
    }
  },
  components: {
    // 🎯 MuiAppBar (Barra de Navegação)
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: '#1b263b', // Usa --cor-primaria para o AppBar
        },
      },
    },
    // 🎯 MuiPaper (Container do Formulário e Tabela)
    MuiPaper: {
        styleOverrides: {
            root: {
                backgroundColor: '#1b263b', // Usa --cor-primaria
                color: '#e0e1dd', // Usa --cor-destaque para o texto
            }
        }
    },
    // 🎯 MuiButton (Botões)
    MuiButton: {
        styleOverrides: {
            containedSecondary: {
                '&:hover': {
                    backgroundColor: '#ffb703', // --cor-hover
                }
            }
        }
    },

    // 🎯 MuiTextField (Campos de Input: Solução para o fundo branco)
    MuiTextField: {
        // Define o 'filled' como o padrão para todos os TextFields
        defaultProps: {
            variant: 'filled', 
        }
    },
    // MuiFilledInput (Customiza o fundo do input preenchido)
    MuiFilledInput: {
      styleOverrides: {
        root: {
          // Fundo escuro
          backgroundColor: '#1b263b', 
          color: '#e0e1dd',
          
          '&:hover': {
            backgroundColor: 'rgba(65, 90, 119, 0.7)', // --cor-secundaria com opacidade para hover
          },
          '&.Mui-focused': {
            backgroundColor: '#1b263b',
          },
        },
      },
    },
    // MuiInputLabel (Customiza a cor do label/etiqueta)
    MuiInputLabel: {
        styleOverrides: {
            filled: {
                color: '#e0e1dd', // Label em cor clara
                '&.Mui-focused': {
                    color: '#415a77', // Cor primária no foco
                },
            }
        }
    }
  }
});

export default customTheme;