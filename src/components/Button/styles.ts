import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  width: 100%;
  height: 60px;
  background-color: #ff9000;
  border-radius: 10px;

  justify-content: center;
  margin-top: 8px;
`;
export const Label = styled.Text`
  text-align: center;
  font-family: 'RobotoSlab-Medium';
  color: #312e38;
  font-size: 18px;
`;
