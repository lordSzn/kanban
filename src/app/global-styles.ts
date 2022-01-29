import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  html{
    font-size: 10px;
  }
  body{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Open Sans;
  }
  li{
     list-style: none;
  }
  #root{
    background: var(--background);
  }
  h1,
  h2,
  h3,
  h5,
  h6{
    margin: 0;
    padding: 0;
  }
`
