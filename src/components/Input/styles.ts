import styled from 'styled-components/native';
import FeatherIcons from 'react-native-vector-icons/Feather';

interface ContainerProps {
  isFocus: boolean;
  isErrored: boolean;
}

export const Container = styled.View<ContainerProps>`
  width: 100%;
  height: 60px;
  padding: 0 16px;
  margin-bottom: 10px;
  border-radius: 10px;
  align-items: center;
  flex-direction: row;
  background-color: #232129;
  border-width: 2px;
  border-color: #232129;

  ${props => !!props.isErrored && 'border-color: #c53030'}
  ${props => !!props.isFocus && 'border-color: #ff9000'}
`;

export const TextInput = styled.TextInput`
  flex: 1;
  font-size: 16px;
  font-family: 'RobotoSlab-Regular';
  text-align: left;
  color: #f4ede8;
`;

export const Icons = styled(FeatherIcons)`
  margin-right: 16px;
`;
