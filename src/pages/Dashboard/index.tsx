import React from 'react';
import { Button } from 'react-native';
import { Container } from './styles';

import { useAuth } from '../../hooks/Auth';

const Dashboard: React.FC = () => {
  const { signout } = useAuth();
  return (
    <Container>
      <Button title="Sair" onPress={signout} />
    </Container>
  );
};

export default Dashboard;
