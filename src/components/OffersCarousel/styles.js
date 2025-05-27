import styled from 'styled-components';

export const Container = styled.div`
  .carousel-item {
    padding-right: 40px;
  }
  overflow-x: hidden;
  .react-multi-carousel-list {
    overflow: visible;
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
  }
  .react-multiple-carousel__arrow::before {
    font-size: 14px;
  }
  padding-left: 40px;
  padding-bottom: 40px;
`;

export const Title = styled.h1`
  color: #61a120;
  font-size: 32px;
  font-weight: 800;
  padding-bottom: 12px;
  position: relative;
  margin: 70px 0;
  text-align: center;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    width: 56px;
    height: 4px;
    background-color: #61a120;
    left: calc(50% - 28px);
  }
`;
// export const ContainerItems = styled.div`
//   background: url('${(props) => props.url}'), no-repeat;
//   background-position: center;
//   background-size: cover;
//   border-radius: 20px;
//   display: flex;
//   align-items: center;
//   padding: 20px 10px;
//   width: 100%;
//   height: 230px;

//   p {
//     color: white;
//     background-color: rgba(0, 0, 0, 0.5);
//     border-radius: 30px;
//     padding: 4px 25px;
//     font-size: 20.5px;
//     font-weight: bold;
//     margin-top: 90px;
//   }
