import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        padding: 0;
        display: block;
        width: 100vw;
        height: 100vh;
    }

    #root {
        width: 100%;
        height: 100%;
    }
`;

export default GlobalStyle;
