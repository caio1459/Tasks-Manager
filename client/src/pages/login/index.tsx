import { Link, useNavigate } from 'react-router-dom';
import { Container, Title, Input, Button, LinkContainer, Form, FormContainer, ErrorMessage } from './style';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

export const Login = () => {
  const { register, handleSubmit, reset } = useForm()
  const [error, setError] = useState('');
  const navigate = useNavigate()

  useEffect(() => {
    const cokkie = Cookies.get("@tasks:token")
    if (cokkie) navigate('/home')
  }, [])

  const onSubmit = useCallback((data: {}) => {
    axios.post("http://localhost:5000/api/login", data)
      .then((res) => {
        const twoHours = new Date(new Date().getTime() + 2 * 60 * 60 * 1000); // Validade de 2 horas a partir de agora
        Cookies.set("@tasks:token", res.data.token, { expires: twoHours }) //Seta o valor do cokkie
        reset()
        setError('')
        navigate('/home')
      })
      .catch(() => setError('Falha ao logar. Por favor, verifique os dados informados.'))
  }, [reset])

  const handleInputChange = () => {
    if (error) setError('');
  };

  return (
    <Container>
      <FormContainer>
        <Title>Tasks Manager</Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="email"
            placeholder="Email"
            {...register("email")}
            onChange={handleInputChange}
          />
          <Input
            type="password"
            placeholder="Senha"
            {...register("password")}
            onChange={handleInputChange}
          />
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <LinkContainer>
            <Link to={''}>Esqueceu a senha?</Link>
            <Link to={''}>Criar uma conta</Link>
          </LinkContainer>
          <Button type="submit">
            Logar
          </Button>
          <Button>Google</Button>
          <Button>Microsoft</Button>
        </Form>
      </FormContainer>
    </Container>
  );
};

export default Login;
