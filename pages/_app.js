import { createGlobalStyle, ThemeProvider } from 'styled-components';

import { AlurakutStyles } from '../src/lib/AlurakutCommons';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: sans-serif;
    background: #d9e6f6;
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  #__next {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  ${AlurakutStyles}
`;

const theme = {
  colors: {
    primary: '#0070f3',
  },
};

const App = ({ Component, pageProps }) => (
  <>
    <GlobalStyle />
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  </>
);

export default App;
