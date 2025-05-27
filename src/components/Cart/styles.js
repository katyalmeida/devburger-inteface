import styled from 'styled-components';
import Background from '../../assets/backgournCart.svg';
import Background1 from '../../assets/bacgroundHome2.png';

export const Container = styled.div`
  width: 100%;
  min-height: 100%;
  background: url('${Background1}');
  min-height: 100vh;
`;
export const Banner = styled.div`
  background: url('${Background}');
  background-size: cover;
  background-color: #1f1f1f;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 180px;
  img {
    height: 120px;
  }
`;
export const Title = styled.div`
  font-size: 24px;
  font-weight: 800;
  padding-bottom: 12px;
  color: #61a120;
  position: relative;
  text-align: center;

  &::after {
    position: absolute;
    left: calc(50% + -28px);
    bottom: 0;
    content: '';
    width: 56px;
    height: 3px;
    background-color: #61a120;
  }
`;
export const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 30%;
  max-width: 1280px;
  padding: 40px;
  margin: 0 auto;
  gap: 40px;
`;
