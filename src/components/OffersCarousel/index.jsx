import React, { useEffect, useState } from 'react';
import api from '../../services/api.jsx';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import formatPrice from '../../utils/formatPrice';
import { CardProduct } from '../CardProduct/index.jsx';
import { Container, Title } from './styles.js';

export default function OffersCarousel() {
  const [offers, setOffers] = useState([]);
  useEffect(() => {
    async function localProducts() {
      const { data } = await api.get('/products');
      const onlyOffers = data
        .filter((product) => product.offer)
        .map((product) => ({
          currencyValue: formatPrice(product.price),
          ...product,
        }));
      setOffers(onlyOffers);
    }
    localProducts();
  }, []);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 4,
    },
    Desktop: {
      breakpoint: { max: 3000, min: 1280 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1280, min: 690 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 690, min: 0 },
      items: 2,
    },
  };

  return (
    <Container>
      <Title>OFERTAS DO DIA</Title>
      <Carousel
        responsive={responsive}
        infinite={true}
        partialVisbile={false}
        itemClass="carousel-item"
      >
        {offers.map((product) => (
          <CardProduct key={product.id} product={product}></CardProduct>
        ))}
      </Carousel>
    </Container>
  );
}
