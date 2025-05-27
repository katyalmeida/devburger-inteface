import React from 'react';
import { UserCircle, ShoppingCart } from '@phosphor-icons/react';
import { useNavigate, useResolvedPath } from 'react-router-dom';
import { useUser } from '../../hooks/UserContext';
import {
  Container,
  HeaderLink,
  Navigation,
  Options,
  Profile,
  LinkContainer,
  Logout,
  Content,
} from './styles';

function Header() {
  const navigate = useNavigate();
  const { logout, userData } = useUser();
  const { pathname } = useResolvedPath();
  function logoutUser() {
    logout();
    navigate('/login');
  }
  return (
    <Container>
      <Content>
        <Navigation>
          <div>
            <HeaderLink to="/" $isActive={pathname === '/'}>
              Home
            </HeaderLink>
            <hr></hr>
            <HeaderLink to="/cardapio" $isActive={pathname === '/cadarpio'}>
              Cardápio
            </HeaderLink>
          </div>
        </Navigation>
        <Options>
          <Profile>
            <UserCircle color="#fff" size={24} S />
            <div>
              <p>
                Olá,<span>{userData.name}</span>
              </p>
              <Logout onClick={logoutUser}>Sair</Logout>
            </div>
          </Profile>
          <LinkContainer>
            <ShoppingCart color="#fff" size={24} />
            <HeaderLink to="/carrinho">Carrinho</HeaderLink>
          </LinkContainer>
        </Options>
      </Content>
    </Container>
  );
}

export default Header;
