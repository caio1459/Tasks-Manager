import { createGlobalStyle, styled } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    :root {
        --background: #0067a3;
        --blue: #004269;
        --text-body: #363f5f;
        --background-modal: #f0f2f5;
        --blue-light: #6933ff;
    }

    * {
        margin: 0;
        padding: 0;
    }

    body {
        background-color: var(--background);
    }

    body, input-security, textarea, button {
        font-family: Arial, Helvetica, sans-serif;
    }

    button {
        cursor: pointer;
    }

    [disabled] {
        opacity: 0.6;
        cursor: not-allowed;
    }

    .react-modal-overlay{
        background: rgba(0,0,0,0.5);
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .react-modal-content{
        max-width:100%;
        max-width: 576px;
        background: var(--background-modal);
        padding: 3rem;
        position: relative;
        border-radius: 0.24rem;
    }
    .react-modal-close {
        position: absolute;
        right: 1.5rem;
        top: 1.5rem;
        border: 0;
        background: transparent;
        transition: filter 0.2s;
        &:hover {
            filter: brightness(0.8);
        }
    }
`;
export const FormContainer = styled.form`
  h2 {
    color: var(--blue);
    font-size: 1.5rem;
    margin-bottom: 2rem;
  }

  input {
    width: 96%;
    padding: 10px;
    border-radius: 8px;
    border: 1px solid #d7d7d7;
    background-color: #e7e9ee;
    font-size: 1rem;
    &::placeholder {
      color: var(--text-body);
    }
  }

  textarea {
    width: 96%;
    padding: 10px;
    border-radius: 8px;
    border: 1px solid #d7d7d7;
    background-color: #e7e9ee;
    font-size: 1rem;
    &::placeholder {
      color: var(--text-body);
    }
    margin-top: 1rem;
  }

  select {
    width: 100%;
    padding: 10px;
    border-radius: 8px;
    border: 1px solid #d7d7d7;
    background-color: #e7e9ee;
    font-size: 1rem;
    margin-top: 1rem;
  }

  button[type="submit"] {
    width: 100%;
    padding: 0 1.5rem;
    height: 4rem;
    background-color: #03bb85;
    color: #fff;
    border-radius: 8px;
    border: 0;
    font-size: 1rem;
    margin-top: 1.5rem;
    &:hover {
      filter: brightness(0.9);
    }
  }

  button[type="button"] {
    width: 100%;
    padding: 0 1.5rem;
    height: 4rem;
    background-color: #933b27;
    color: #fff;
    border-radius: 8px;
    border: 0;
    font-size: 1rem;
    margin-top: 1.5rem;
    &:hover {
      filter: brightness(0.9);
    }
  }
`;
