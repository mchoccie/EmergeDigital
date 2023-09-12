import { createGlobalStyle } from "styled-components";
import "@fontsource/prata";
import "@fontsource/lato";

// Defines global CSS styles
const GlobalStyle = createGlobalStyle`
    :root {
        // font sizes
        --title-font: Prata;
        --text-font: Lato;
        --font-size-small: 12px;
        --font-size-medium: 14px;
        --font-size-large: 16px;

        // header & footer sizes
        --header-height: 70px;
        --footer-content-height: 50px;
        --footer-wave-height: 150px;

        // page dimensions
        --max-width: calc(1200px + 4rem);

        // popup dimensions
        --popup-height: 450;
        --popup-width: 350;

        // Colors
        --dark-blue: #5680E9;
        --teal: #84CEEB;
        --light-blue: #5AB9EA;
        --dull-blue: #C1C8E4;
        --white: #FFFFFF;
        --black: #000000;
        --light-gray: #dddddd;
        --shadow: #cacaca;

        --primary: #050715;
        --secondary: #5E3AD4;

        // Padding 
        --horizontal-padding: 2em;
        
        // Default fonts
        font-family: sans-serif;
        font-family: var(--text-font);

        overflow-y: overlay;
    }

    body {
        margin: 0;
        
        // Header styles
        h1, h2, h3 {
            font-family: var(--title-font);
            font-weight: normal;
            color: var(--black);
        }

        // Paragraph text styles
        p {
            color: var(--black);
        }

        // Link styles
        a {
            color: var(--secondary);
            text-underline-offset: 0.2rem;

            // Fade in on hover
            text-decoration: underline solid transparent;
            transition: text-decoration 0.5s ease;
            &:hover {
                text-decoration: underline;
            }
        }

        ul {
            padding: 0;
        }

        font-size: var(--font-size-small);

        @media only screen and (min-width: 600px) {
            font-size: var(--font-size-medium);
        }

        @media only screen and (min-width: 768px) {
            font-size: var(--font-size-large);
        }
    }
`;

export default GlobalStyle;
