import styled from 'styled-components';
import { Link } from 'react-router-dom';
import BannerHamburguer from '../../assets/banner.svg';
import Background from '../../assets/backgroundMenu.png';

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background: url('${Background}');
`;
export const Banner = styled.div`
  background: url('${BannerHamburguer}') no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 440px;
  width: 100%;
  background-color: #1f1f1f;
  background-position: center;
  background-size: cover;
  position: relative;

  h1 {
    font-family: 'Road Rage';
    font-size: 80px;
    line-height: 65px;
    color: #fff;
    position: absolute;
    right: 20%;
    top: 30%;
  }
  span {
    display: block;
    color: #fff;
    font-size: 20px;
  }
`;
export const CategoryMenu = styled.div`
  display: flex;
  justify-content: center;
  gap: 50px;
  margin-top: 30px;
`;
export const CategoryButton = styled(Link)`
  text-decoration: none;
  background: none;
  cursor: pointer;
  color: ${(props) => (props.$isActiveCategory ? '#9758a6' : '#696969')};
  font-size: 24px;
  font-weight: 500;
  padding-bottom: 5px;
  line-height: 20px;
  border-bottom: ${(props) => props.$isActiveCategory && '3px solid #9758a6'};
`;
export const ProductsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 40px;
  justify-content: center;
  max-width: 1280px;
  gap: 60px;
  margin: 50px auto;
`;
