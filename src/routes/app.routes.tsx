import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import DashboardScreen from '../pages/Dashboard';

const App = createStackNavigator();

const Routes: React.FC = () => {
  return (
    <App.Navigator
      screenOptions={{
        // headerShown: false,
        cardStyle: { backgroundColor: '#312e38' },
      }}
    >
      <App.Screen name="Dashboard" component={DashboardScreen} />
    </App.Navigator>
  );
};

export default Routes;
