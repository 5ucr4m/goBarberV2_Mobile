import 'react-native-gesture-handler';

import React from 'react';
import { StatusBar, View, StyleSheet } from 'react-native';
import Routes from './routes';
import { NavigationContainer } from '@react-navigation/native';

import AppProvider from './hooks';

declare const global: { HermesInternal: null | {} };

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor={styles.container.backgroundColor}
      />
      <AppProvider>
        <View style={styles.container}>
          <Routes />
        </View>
      </AppProvider>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#312e38',
    flex: 1,
  },
});

export default App;
