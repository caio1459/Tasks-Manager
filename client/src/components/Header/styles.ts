import styled from "styled-components";

export const Container = styled.header`
  background-color: var(--blue);
  padding: 1rem 1rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  h1 {
    color: var(--blue-light);
    font-weight: 700;
  }

  button {
    font-size: 1rem;
    color: #fff;
    background-color: var(--blue-light);
    border: 0;
    padding: 0 2rem;
    border-radius: 8px;
    height: 3rem;
    transition: 1s;
    &:hover {
      /* filter: brightness(0.9); */
      background-color: #433d3d;
    }
  }

  div {
    display: flex;
    gap: 20px;
  }
  .btn-logout {
    padding: 0;
    font-size: 1rem;
    color: #fff;
    background-color: var(--blue-light);
    height: 3rem;
    width: 3rem;
    text-align: center;
    border-radius: 100px;
  }
`;
