import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SignInScreen from '../pages/SignIn';
import SignUpScreen from '../pages/SignUp';

const Auth = createStackNavigator();

const Routes: React.FC = () => {
  return (
    <Auth.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#312e38' },
      }}
    >
      <Auth.Screen name="SignIn" component={SignInScreen} />
      <Auth.Screen name="SignUp" component={SignUpScreen} />
    </Auth.Navigator>
  );
};

export default Routes;
