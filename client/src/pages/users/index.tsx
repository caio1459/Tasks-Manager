// src/pages/users/index.jsx
import { Form, useNavigate } from 'react-router-dom';
import { Container, FormContainer, Title, Input, ErrorMessage, Button } from './style';
import { useCallback, useState } from 'react';
import axios from 'axios';

export const Users = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const reset = () => {
    setEmail('');
    setName('');
    setPassword('');
    setError('');
  };

  const criarUser = useCallback((formData: { name: string, email: string, password: string }) => {
    console.log(formData)
    axios.post('http://localhost:5000/api/users', formData)
      .then(() => {
        reset();
        navigate('/');
      }).catch((err) => {
        console.log(err)
        setError('Falha ao logar. Por favor, verifique os dados informados.')
      });
  }, []);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    criarUser({ name, email, password });
  };

  return (
    <Container>
      <FormContainer>
        <Title>Cadastrar Usuário</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="name"
            placeholder="Nome de Usuário"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <Input
            type="password"
            name="password"
            placeholder="Senha"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <Button type="submit" title="Criar Usuário">
            Salvar
          </Button>
          <Button title='Logar' type="button" onClick={(() => navigate('/'))}>
            Voltar
          </Button>
        </Form>
      </FormContainer>
    </Container>
  );
};
