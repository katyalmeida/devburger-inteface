/* eslint-disable react/react-in-jsx-scope */
import PropTypes from 'prop-types';
import { CartButton } from '../CartButton';
import { useCart } from '../../hooks/CartContext';
import { Container, CardImage } from './styles';

export function CardProduct({ product }) {
  const { putProductInCart } = useCart();
  return (
    <Container>
      <CardImage src={product.url} alt={product.name} />

      <div>
        <p>{product.name}</p>
        <strong>{product.currencyValue}</strong>
      </div>
      <CartButton onClick={() => putProductInCart(product)}></CartButton>
    </Container>
  );
}
CardProduct.propTypes = {
  product: PropTypes.object,
};
