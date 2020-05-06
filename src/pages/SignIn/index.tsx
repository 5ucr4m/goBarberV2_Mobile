import React from 'react';
import { Image } from 'react-native';
import LogoImage from '../../assets/logo.png';

import { Container } from './styles';

const SignIn: React.FC = () => {
  return (
    <Container>
      <Image source={LogoImage} />
    </Container>
  );
};

export default SignIn;
