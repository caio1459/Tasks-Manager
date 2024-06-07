import styled from "styled-components";

export const Container = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const FormContainer = styled.div`
  width: 500px;
  padding: 20px;
  background-color: var(--blue-light);
  border-radius: 5px;
  box-shadow: 0 0 5px #b7aea5;
  display: block;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.h1`
  font-size: 20px;
  margin-bottom: 20px;
  text-align: center;
  color: #fff;
  font-weight: 700;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  color: #fff;
  margin-bottom: 10px;
  border: 1px solid #fff;
  border-radius: 4px;
  background-color: transparent;
  outline: none;
`;

export const LinkContainer = styled.div`
`;

export const Link = styled.a`
  color: blue;
  text-decoration: none;
  cursor: pointer;
  font-size: 10px;
  margin: 5px;
`;

export const Button = styled.button`
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  border: none;
  background-color: var(--blue);
  color: white;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.6s;
  margin: 10px;
  &:hover {
    background-color: #433d3d;
  }
`;

export const ErrorMessage = styled.p`
  color: red;
  font-size: 1rem;
  font-weight: 500;
  margin: 12px;
  text-align: center;
`;
export const DivBtn = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
`;
