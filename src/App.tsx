import { ThemeProvider } from '@mui/material/styles'
import { theme } from './theme/theme'
import { Tims } from './Tims'
import { GlobalStyles, CssBaseline } from '@mui/material'
import { globalStyles } from './theme/global'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles styles={globalStyles} />
      <Tims />
    </ThemeProvider>
  )
}

export default App
