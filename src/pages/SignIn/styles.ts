import styled from 'styled-components/native';
import Feather from 'react-native-vector-icons/Feather';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { darken } from 'polished';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 30px;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
  margin: 64px 0 24px;
`;

export const ForgotPassword = styled.TouchableOpacity`
  margin-top: 24px;
`;

export const ForgotPasswordText = styled.Text`
  font-family: 'RobotoSlab-Regular';
  color: #f4ede8;
  font-size: 16px;
`;

export const NewAcount = styled.TouchableOpacity.attrs({})`
  border-top-width: 1px;
  border-style: solid;
  border-color: ${darken(0.05, '#312e38')};
  justify-content: center;
  align-items: center;
  flex-direction: row;
  background-color: #312e38;
  padding: 16px 0 ${16 + getBottomSpace()}px;
`;

export const NewAcountText = styled.Text`
  font-family: 'RobotoSlab-Regular';
  color: #ff9000;
  font-size: 18px;
  margin-left: 16px;
`;

export const Icons = styled(Feather)`
  color: #ff9000;
  font-size: 16px;
`;
