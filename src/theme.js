import { createTheme } from "@mui/material"

export const lightPaletteText = {
  primary: "rgb(17, 24, 39)",
  secondary: "rgb(107, 114, 128)",
  disabled: "rgb(149, 156, 169)"
}

export const darkPaletteText = {
  primary: "rgb(255,255,255)",
  secondary: "rgb(148, 163, 184)",
  disabled: "rgb(156, 163, 175)"
}

const lightTheme = createTheme({
  palette: {
    mode: "light",
    divider: "#e2e8f0",
    text: lightPaletteText,
    common: {
      black: "rgb(17, 24, 39)",
      white: "rgb(255, 255, 255)"
    },
    primary: {
      light: "#64748b",
      main: "#1e293b",
      dark: "#0f172a",
      contrastText: darkPaletteText.primary
    },
    secondary: {
      light: "#818cf8",
      main: "#4f46e5",
      dark: "#3730a3",
      contrastText: darkPaletteText.primary
    },
    background: {
      paper: "#FFFFFF",
      default: "#f1f5f9"
    },
    error: {
      light: "#ffcdd2",
      main: "#f44336",
      dark: "#b71c1c"
    }
  },
  status: {
    danger: "orange"
  },
  typography: {
    fontFamily: [
      "Inter var",
      "Roboto",
      '"Helvetica"',
      "Arial",
      "sans-serif"
    ].join(","),
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    htmlFontSize: 10,
    fontSize: 14,
    body1: {
      fontSize: "1.4rem"
    },
    body2: {
      fontSize: "1.4rem"
    }
  },
  components: {
    MuiDateTimePicker: {
      defaultProps: {
        PopperProps: { className: "z-9999" }
      }
    },
    MuiAppBar: {
      defaultProps: {
        enableColorOnDark: true
      },
      styleOverrides: {
        root: {
          backgroundImage: "none"
        }
      }
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true
      }
    },
    MuiButton: {
      defaultProps: {
        variant: "text",
        color: "inherit"
      },
      styleOverrides: {
        root: {
          textTransform: "none"
          // lineHeight: 1,
        },
        sizeMedium: {
          borderRadius: 20,
          height: 40,
          minHeight: 40,
          maxHeight: 40
        },
        sizeSmall: {
          borderRadius: "15px"
        },
        sizeLarge: {
          borderRadius: "28px"
        },
        contained: {
          boxShadow: "none",
          "&:hover, &:focus": {
            boxShadow: "none"
          }
        }
      }
    },
    MuiButtonGroup: {
      defaultProps: {
        color: "secondary"
      },
      styleOverrides: {
        contained: {
          borderRadius: 18
        }
      }
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none"
        }
      }
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 16
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none"
        },
        rounded: {
          borderRadius: 16
        }
      }
    },
    MuiPopover: {
      styleOverrides: {
        paper: {
          borderRadius: 8
        }
      }
    },
    MuiTextField: {
      defaultProps: {
        color: "secondary"
      }
    },
    MuiInputLabel: {
      defaultProps: {
        color: "secondary"
      }
    },
    MuiSelect: {
      defaultProps: {
        color: "secondary"
      }
    },
    MuiOutlinedInput: {
      defaultProps: {
        color: "secondary"
      }
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          minHeight: 40,
          lineHeight: 1
        }
      }
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          "&:before, &:after": {
            display: "none"
          }
        }
      }
    },
    MuiSlider: {
      defaultProps: {
        color: "secondary"
      }
    },
    MuiCheckbox: {
      defaultProps: {
        color: "secondary"
      }
    },
    MuiRadio: {
      defaultProps: {
        color: "secondary"
      }
    },
    MuiSwitch: {
      defaultProps: {
        color: "secondary"
      }
    },
    MuiTypography: {
      variants: [
        {
          props: { color: "text.secondary" },
          style: {
            color: "text.secondary"
          }
        }
      ]
    }
  }
})

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    divider: "rgba(241,245,249,.12)",
    text: darkPaletteText,
    common: {
      black: "rgb(17, 24, 39)",
      white: "rgb(255, 255, 255)"
    },
    primary: {
      light: "#64748b",
      main: "#334155",
      dark: "#0f172a",
      contrastText: darkPaletteText.primary
    },
    secondary: {
      light: "#818cf8",
      main: "#4f46e5",
      dark: "#3730a3",
      contrastText: darkPaletteText.primary
    },
    background: {
      paper: "#1e293b",
      default: "#111827"
    },
    error: {
      light: "#ffcdd2",
      main: "#f44336",
      dark: "#b71c1c"
    },
    status: {
      danger: "orange"
    }
  },
  typography: {
    fontFamily: [
      "Inter var",
      "Roboto",
      '"Helvetica"',
      "Arial",
      "sans-serif"
    ].join(","),
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    htmlFontSize: 10,
    fontSize: 14,
    body1: {
      fontSize: "1.4rem"
    },
    body2: {
      fontSize: "1.4rem"
    }
  },
  components: {
    MuiDateTimePicker: {
      defaultProps: {
        PopperProps: { className: "z-9999" }
      }
    },
    MuiAppBar: {
      defaultProps: {
        enableColorOnDark: true
      },
      styleOverrides: {
        root: {
          backgroundImage: "none"
        }
      }
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true
      }
    },
    MuiButton: {
      defaultProps: {
        variant: "text",
        color: "inherit"
      },
      styleOverrides: {
        root: {
          textTransform: "none"
          // lineHeight: 1,
        },
        sizeMedium: {
          borderRadius: 20,
          height: 40,
          minHeight: 40,
          maxHeight: 40
        },
        sizeSmall: {
          borderRadius: "15px"
        },
        sizeLarge: {
          borderRadius: "28px"
        },
        contained: {
          boxShadow: "none",
          "&:hover, &:focus": {
            boxShadow: "none"
          }
        }
      }
    },
    MuiButtonGroup: {
      defaultProps: {
        color: "secondary"
      },
      styleOverrides: {
        contained: {
          borderRadius: 18
        }
      }
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none"
        }
      }
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 16
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none"
        },
        rounded: {
          borderRadius: 16
        }
      }
    },
    MuiPopover: {
      styleOverrides: {
        paper: {
          borderRadius: 8
        }
      }
    },
    MuiTextField: {
      defaultProps: {
        color: "secondary"
      }
    },
    MuiInputLabel: {
      defaultProps: {
        color: "secondary"
      }
    },
    MuiSelect: {
      defaultProps: {
        color: "secondary"
      }
    },
    MuiOutlinedInput: {
      defaultProps: {
        color: "secondary"
      }
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          minHeight: 40,
          lineHeight: 1
        }
      }
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          "&:before, &:after": {
            display: "none"
          }
        }
      }
    },
    MuiSlider: {
      defaultProps: {
        color: "secondary"
      }
    },
    MuiCheckbox: {
      defaultProps: {
        color: "secondary"
      }
    },
    MuiRadio: {
      defaultProps: {
        color: "secondary"
      }
    },
    MuiSwitch: {
      defaultProps: {
        color: "secondary"
      }
    },
    MuiTypography: {
      variants: [
        {
          props: { color: "text.secondary" },
          style: {
            color: "text.secondary"
          }
        }
      ]
    }
  }
})

export { lightTheme, darkTheme }
