import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  :root {
    --gray100: hsl(220, 7%, 92%);
    --gray200: hsl(216, 8%, 88%);
    --gray300: hsl(210, 7%, 84%);

    --yellow100: hsl(70, 100%, 86%);
    --yellow200: hsl(70, 100%, 84%);
    --yellow300: hsl(70, 100%, 80%);

    --sienna100: hsl(23, 57%, 64%);
    --sienna200: hsl(23, 57%, 60%);
    --sienna300: hsl(23, 57%, 56%);
  }

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
