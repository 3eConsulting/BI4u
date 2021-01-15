import red from '@material-ui/core/colors/red';
import {createMuiTheme} from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
    h1: {
        fontFamily: "'Noto Sans JP', sans-serif",
    },
    h2: {
        fontFamily: "'Noto Sans JP', sans-serif",
    },
    h3: {
        fontFamily: "'Noto Sans JP', sans-serif",
    },
    h4: {
        fontFamily: "'Noto Sans JP', sans-serif",
    },
    h5: {
        fontFamily: "'Noto Sans JP', sans-serif",
    },
    h6: {
        fontFamily: "'Noto Sans JP', sans-serif",
    },
    button: {
        fontFamily: "'Noto Sans JP', sans-serif",
    },
  }, 
  palette: {
    type: 'dark',
    text: {
        secondary: '#FFF'
    },
    primary: {
        main: '#76B662',
    },
    secondary: {
        main: '#FFF',
    },
    error: {
        main: red.A400,
    },
    background: {
        default: '#303030',
        paper: '#424242'
    },
  },
});

export default theme;