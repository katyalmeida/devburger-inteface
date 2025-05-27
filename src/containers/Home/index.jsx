import React from 'react';
import CategoriesCarousel from '../../components/CategoriesCarousel';

import { Container, Banner, Content } from './styles.js';
import OffersCarousel from '../../components/OffersCarousel/index.jsx';

export function Home() {
  return (
    <main>
      <Banner>
        <h1> Bem-Vindo(a)!</h1>
      </Banner>
      <Container>
        <Content>
          <CategoriesCarousel></CategoriesCarousel>
          <OffersCarousel></OffersCarousel>
        </Content>
      </Container>
    </main>
  );
}
