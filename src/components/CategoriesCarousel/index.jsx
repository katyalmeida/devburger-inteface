import React, { useEffect, useState } from 'react';
import api from '../../services/api.jsx';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import { Container, Title, ContainerItems, CategoryButton } from './styles.js';
import { useNavigate } from 'react-router-dom';

export default function CategoriesCarousel() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    async function localCategories() {
      const { data } = await api.get('/categories');
      setCategories(data);
    }
    localCategories();
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
      <Title>Categorias</Title>
      <Carousel
        responsive={responsive}
        infinite={true}
        partialVisbile={false}
        itemClass="carousel-item"
      >
        {categories.map((category) => (
          <ContainerItems key={category.id} url={category.url}>
            <CategoryButton
              onClick={() => {
                navigate({
                  pathname: '/cardapio',
                  search: `?categoria=${category.id}`,
                });
              }}
            >
              {category.name}
            </CategoryButton>
          </ContainerItems>
        ))}
      </Carousel>
    </Container>
  );
}
