import { createGlobalStyle } from "styled-components";

export const headingSizes = {
  h1: `32px`,
  h2: `28px`,
  h3: `25px`,
  h4: `20px`,
  h5: `18px`,
  h6: `15px`,
};

export const flex = {
  gap: `15px`,
};

export default createGlobalStyle`
  
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
    font-family: "Raleway", sans-serif;
    margin-block-start: 0;
    margin-block-end: 0;
  }

  :root {
  --main-color: #333;
  --text-color: #f9f9f9;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.6;
  }

  h1 {
    font-size: ${headingSizes.h1};
  }
  h2 {
    font-size: ${headingSizes.h2};
  }
  h3 {
    font-size: ${headingSizes.h3};
  }
  h4 {
    font-size: ${headingSizes.h4};
  }
  h5 {
    font-size: ${headingSizes.h5};
  }
  h6 {
    font-size: ${headingSizes.h6};
  }

  a,
  p {
    font-weight: 400;
  }

  .form-control {
    width: 100%;
    padding: 8px 4px;
    font-size: 15px;
    outline: none;
    font-family: "Raleway", sans-serif;
    font-weight: 400;
    border: 1px solid transparent;
    background-color: inherit;
  }

  .profile {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    padding-right: 15px;
    padding-top: 15px;
    margin-bottom: 30px;

    a {
      color: var(---text-color);
      text-decoration: none;
      margin-left: 15px;
    }
  }

  .home {
    align-items: center;
    background-color: #333;
    color: #f9f9f9;
    display: flex;
    flex-direction: column;
    height: 100vh;
    gap: 15px;
    justify-content: flex-start;
    padding-top: 30%;

    .btn-sign-in {
      padding: 15px;
      text-transform: uppercase;
      border-radius: 8px;
      outline: none;
      border: none;
      box-shadow: 0 0 3px rgb(0,0,0,.25);
      cursor: pointer;
    }
  }
`;
