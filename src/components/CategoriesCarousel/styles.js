import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  padding-left: 40px;

  .carousel-item {
    padding-right: 40px;
  }
  .react-multiple-carousel__arrow--left {
    left: 15px;
    top: 10px;
  }

  .react-multiple-carousel__arrow--right {
    top: 10px;
  }
  .react-multiple-carousel__arrow {
    min-width: 30px;
    min-height: 30px;
    font-size: 14px;
  }
  .react-multiple-carousel__arrow::before {
    font-size: 12px;
  }
`;

export const Title = styled.h1`
  color: #9758a6;
  font-size: 32px;
  font-weight: 800;
  padding-bottom: 12px;
  margin-bottom: 40px;
  position: relative;
  margin-top: 20px;
  text-align: center;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    width: 56px;
    height: 4px;
    background-color: #9758a6;
    left: calc(50% - 28px);
  }
`;
export const ContainerItems = styled.div`
  background: url('${(props) => props.url}'), no-repeat;
  background-position: center;
  background-size: cover;
  border-radius: 20px;
  display: flex;
  align-items: center;
  padding: 20px 10px;
  width: 100%;
  height: 230px;

  p {
  }
`;
export const CategoryButton = styled(Link)`
  color: white;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 30px;
  padding: 4px 25px;
  font-size: 20.5px;
  font-weight: bold;
  margin-top: 90px;
  font-weight: 500;
  text-decoration: none;

  &:hover {
    background-color: #9758a6;
  }
`;
