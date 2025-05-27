/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect } from 'react';
import api from '../../services/api.jsx';
import formatPrice from '../../utils/formatPrice';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Container,
  Banner,
  CategoryMenu,
  CategoryButton,
  ProductsContainer,
} from './styles';
import { CardProduct } from '../../components/CardProduct/index.jsx';

export function Menu() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const navigate = useNavigate();
  const { search } = new useLocation();
  const queryParams = new URLSearchParams(search);

  const [activeCategory, setActiveCategory] = useState(() => {
    const categoryId = +queryParams.get('categoria');
    if (categoryId) {
      return categoryId;
    }
    return 0;
  });

  useEffect(() => {
    async function localCategories() {
      const { data } = await api.get('/categories');

      const newCategories = [{ id: 0, name: 'Todas' }, ...data];
      setCategories(newCategories);
    }
    async function localProducts() {
      const { data } = await api.get('/products');
      const newProducts = data.map((product) => ({
        currencyValue: formatPrice(product.price),
        ...product,
      }));
      setProducts(newProducts);
    }
    localProducts();
    localCategories();
  }, []);
  useEffect(() => {
    if (activeCategory === 0) {
      setFilteredProducts(products);
    } else {
      const newFilterdProducts = products.filter(
        (product) => product.category_id === activeCategory,
      );
      setFilteredProducts(newFilterdProducts);
    }
  }, [products, activeCategory]);
  return (
    <Container>
      <Banner>
        <h1>
          O MELHOR
          <br />
          HAMBURGUER
          <br />
          ESTÁ AQUI
          <span>Este cardápio está irresistível!</span>
        </h1>
      </Banner>

      <CategoryMenu>
        {categories.map((category) => (
          <CategoryButton
            key={category.id}
            $isActiveCategory={category.id === activeCategory}
            onClick={() => {
              navigate(
                {
                  pathname: '/cardapio',
                  search: `?categoria=${category.id}`,
                },
                {
                  replace: true,
                },
              );
              setActiveCategory(category.id);
            }}
          >
            {category.name}
          </CategoryButton>
        ))}
      </CategoryMenu>
      <ProductsContainer>
        {filteredProducts.map((product) => (
          <CardProduct product={product} key={product.id} />
        ))}
      </ProductsContainer>
    </Container>
  );
}
