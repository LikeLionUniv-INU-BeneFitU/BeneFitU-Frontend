import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body, #root {
    width: 100%;
    height: 100%;
    background-color: #ffffff; 
    color: #333333;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  html {
    font-size: 16px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  }

  @media (max-width: 380px){
    html {
      font-size: 13.5px;
    }
  }

  @media (max-width: 370px){
    html {
      font-size: 12px;
    }
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  ul, ol, li {
    list-style: none;
  }

  button {
    cursor: pointer;
    border: none;
    background: none;
    font: inherit;
  }
`;

export default GlobalStyle;
