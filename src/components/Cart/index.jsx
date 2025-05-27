import React from 'react';
import Logo from '../../assets/logoCart.png';
import { Container, Banner, Title, Content } from './styles';
import { CartItems } from '../CartItems';
import { CartResume } from '../CartResume';

export function Cart() {
  return (
    <Container>
      <Banner>
        <img src={Logo} />
      </Banner>
      <Title>Checkout - Pedido</Title>
      <Content>
        <CartItems />
        <CartResume></CartResume>
      </Content>
    </Container>
  );
}
