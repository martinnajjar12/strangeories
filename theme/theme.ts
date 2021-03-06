import { unstable_createMuiStrictModeTheme as createTheme } from '@material-ui/core/styles'

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5'
    },
    secondary: {
      main: '#ff5a71'
    }
  }
})

export default theme
