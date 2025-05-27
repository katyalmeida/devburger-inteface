import styled from 'styled-components';
import BannerHome from '../../assets/homeLogo.png';
import Background from '../../assets/bacgroundHome2.png';
export const Container = styled.div`
  background: url('${Background}');
  /* height: 400px; */
`;
export const Banner = styled.section`
  background: url('${BannerHome}');
  background-size: cover;
  background-position: center;
  height: 440px;
  h1 {
    font-family: 'Road Rage', sans-serif;
    font-size: 80px;
    color: white;
    position: absolute;
    right: 6%;
    top: 10%;
  }
`;
export const Content = styled.div`
  /* padding-bottom: 70px; */
`;
