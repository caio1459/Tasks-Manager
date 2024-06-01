import styled from "styled-components";

export const Container = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const FormContainer = styled.div`
  width: 300px;
  padding: 20px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
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
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
`;

export const LinkContainer = styled.div`
  display: flex;
  gap: 20px;
`;

export const Link = styled.a`
  color: blue;
  text-decoration: none;
  margin-right: 10px;
  cursor: pointer;
  font-size: 12px;
`;

export const Button = styled.button`
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

export const ErrorMessage = styled.p`
  color: red;
  font-size: 1rem;
  font-weight: 500;
  margin: 12px;
  text-align: center;
`;
