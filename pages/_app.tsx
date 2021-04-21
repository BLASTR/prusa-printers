import { createGlobalStyle, ThemeProvider } from 'styled-components';

if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
  require('../mocks');
}

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  * {
   box-sizing: border-box;
  }
  
  .mr-sm {
    margin-right: 10px;
  }
  
  .mb-sm {
    margin-bottom: 20px;
  }
  
  .mb-lg {
    margin-bottom: 60px;
  }
`;

const theme = {
  colors: {
    brand: '#ed6b21',
    white: '#fff',
    gray: {
      300: '#f6f6f6',
      400: '#e2e3e4',
      500: '#b0afaf',
    },
  },
  breakpoints: {
    xs: '375px',
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
  },
};

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
