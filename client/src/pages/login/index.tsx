import { useNavigate } from 'react-router-dom';
import { Container, Title, Input, Button, Form, FormContainer, ErrorMessage, DivBtn } from './style';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useCallback, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

export const Login = () => {
  const { register, handleSubmit, reset } = useForm();
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setToken } = useContext(AuthContext);

  useEffect(() => {
    const cookie = Cookies.get("@tasks:token");
    if (cookie) navigate('/home');
  }, [navigate]);

  const onSubmit = useCallback(async (data: {}) => {
    try {
      const response = await axios.post("http://localhost:5000/api/login", data);
      const twoHours = new Date(new Date().getTime() + 2 * 60 * 60 * 1000); // Validade de 2 horas a partir de agora
      Cookies.set("@tasks:token", response.data.token, { expires: twoHours }); // Seta o valor do cookie

      // Atualizar o token no contexto
      setToken(response.data.token);

      reset();
      setError('');
      navigate('/home');
    } catch (err) {
      setError('Falha ao logar. Por favor, verifique os dados informados. ');
      console.error(err)
    }
  }, [reset, setToken, navigate]);

  // Seta o erro como vazio sempre que for digitado alguma coisa
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
          <div className='d-flex'>
            <a className='me-5' href=''>Esqueceu a senha?</a>
            <Link to={'/users'}>Criar uma conta</Link>
          </div>
          <Button title='Logar' type="submit">
            Logar
          </Button>
          <DivBtn>
            <Button title='Google'><i className="bi bi-google"></i></Button>
            <Button title='Microsoft'><i className="bi bi-microsoft"></i></Button>
          </DivBtn>
        </Form>
      </FormContainer>
    </Container>
  );
};