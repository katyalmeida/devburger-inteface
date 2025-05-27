/* eslint-disable react/react-in-jsx-scope */
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';

import Logo from '../../assets/logo.png';
import { Button } from '../../components/Button';
import { useUser } from '../../hooks/UserContext.jsx';
import api from '../../services/api.jsx';
import {
  Container,
  LeftContainer,
  RightContainer,
  Title,
  InputContainer,
  Link,
} from './styles';

export function Login() {
  const { putUserData } = useUser();

  const navigate = useNavigate();
  const schema = yup
    .object({
      email: yup
        .string()
        .email('Digite um e-mail válido')
        .required('O e-mail é obrigatório'),
      password: yup
        .string()
        .min(6, 'A senha deve ter pelo menos 6 caracteres')
        .required('Digite uma senha'),
    })

    .required();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (clientData) => {
    const { data } = await toast.promise(
      api.post('/sessions', {
        email: clientData.email,
        password: clientData.password,
      }),
      {
        pending: 'Verificando seus dados',
        success: {
          render() {
            setTimeout(() => {
              if (data?.admin) {
                navigate('/admin/pedidos');
              } else {
                navigate('/');
              }
            }, 2000);
            return ' Seja Bem-vindo(a)';
          },
        },
        error: 'Email ou Senha Incorretos',
      },
    );
    putUserData(data);
  };

  return (
    <Container>
      <LeftContainer>
        <img src={Logo} alt="logo-devburger" />
      </LeftContainer>
      <RightContainer>
        <Title>
          Olá, seja bem vindo ao <span>Dev Burger!</span>
          <br />
          Acesse com seu
          <span> Login e senha.</span>
        </Title>

        <form onSubmit={handleSubmit(onSubmit)}>
          <InputContainer>
            <label>Email</label>
            <input type="email" {...register('email')} />
            <p>{errors?.email?.message}</p>
          </InputContainer>

          <InputContainer>
            <label>Senha</label>
            <input type="password" {...register('password')} />
            <p>{errors?.password?.message}</p>
          </InputContainer>
          <Button type="submit">Entrar</Button>
        </form>
        <p>
          Não possui conta? <Link to="/cadastro">Clique aqui.</Link>
        </p>
      </RightContainer>
    </Container>
  );
}
