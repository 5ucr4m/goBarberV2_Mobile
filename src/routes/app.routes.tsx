import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import AppointmentCreated from '../pages/AppointmentCreated';
import CreateAppointment from '../pages/CreateAppointment';
import DashboardScreen from '../pages/Dashboard';
import Profile from '../pages/Profile';

const App = createStackNavigator();

const Routes: React.FC = () => {
  return (
    <App.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#312e38' },
      }}
    >
      <App.Screen name="Dashboard" component={DashboardScreen} />
      <App.Screen name="AppointmentCreated" component={AppointmentCreated} />
      <App.Screen name="CreateAppointment" component={CreateAppointment} />
      <App.Screen name="Profile" component={Profile} />
    </App.Navigator>
  );
};

export default Routes;
