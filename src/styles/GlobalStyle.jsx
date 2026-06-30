import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  /* 1. 기본 여백 및 박스 사이징 초기화 */
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  /* 2. html 및 body 기본 세팅 */
  html, body {
    width: 100%;
    height: 100%;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    background-color: #ffffff; /* 원하는 배경색 */
    color: #333333;            /* 원하는 기본 글자색 */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* 3. 링크, 리스트 등 기본 컴포넌트 스타일 초기화 */
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
