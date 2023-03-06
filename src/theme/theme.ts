import { createTheme } from '@mui/material'

declare module '@mui/material/styles' {
  interface Theme {
    colors: {
      white: string
      mainGreen: string
      middleGreen: string
      lightGreen: string
      line: string
      gray: string
    }
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    colors?: {
      white?: string
      mainGreen?: string
      middleGreen?: string
      lightGreen?: string
      line?: string
      gray?: string
    }
  }
}

export const theme = createTheme({
  spacing: 4,
  shape: {
    borderRadius: 4,
  },
  colors: {
    white: '#fff',
    mainGreen: '#00a8a9',
    middleGreen: '#009da6',
    lightGreen: '#e9f0f0',
    line: '#c1eaea',
    gray: '#41424B'
  },
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#00a8a9',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
  },
  typography: {
    fontFamily: ['SegoeUI', 'sans-serif'].join(','),
    body1: {
      fontSize: 16,
    },
    body2: {
      fontSize: 14,
    },
    h1: {
      fontSize: 20,
      lineHeight: '27px',
    },
    h2: {
      fontSize: 18,
    },
    subtitle1: {
      fontSize: 12,
      lineHeight: '12px',
      letterSpacing: '1.92px',
    },
    subtitle2: {
      fontSize: 11,
      lineHeight: '15px',
      letterSpacing: '0.88px',
    },
  },
  components: {
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: 14,
        },
      },
    },
  },
})
