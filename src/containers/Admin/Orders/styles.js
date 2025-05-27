import styled from 'styled-components';
import Select from 'react-select';

export const SelectStatus = styled(Select)`
  width: 240px;
`;

export const Filter = styled.div`
  display: flex;
  justify-content: center;
  margin: 28px 0;
  gap: 50px;
`;

export const FilterOption = styled.button`
  cursor: pointer;
  background-color: none;
  border: none;
  border-bottom: ${(props) =>
    props.$isActiveStatus ? `3px solid ${props.theme.purple}` : 'none'};
  color: ${(props) =>
    props.$isActiveStatus ? props.theme.purple : props.theme.darkGray};
  font-size: 18px;
  line-height: 20px;
  padding-bottom: 5px;
`;
