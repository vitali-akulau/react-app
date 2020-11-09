import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Open Sans Condensed';
    padding: 20px 60px;
  }
  
  a {
    text-decoration: none;
    color: black;
  }
  
  * {
      box-sizing: border-box;
  }
`;

export default GlobalStyle;
