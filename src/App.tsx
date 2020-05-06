import 'react-native-gesture-handler';

import React from 'react';
import { StatusBar, View, StyleSheet } from 'react-native';
import Routes from './routes';
import { NavigationContainer } from '@react-navigation/native';

declare const global: { HermesInternal: null | {} };

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar
        barStyle="light-content"
        backgroundColor={styles.container.backgroundColor}
      />
      <View style={styles.container}>
        <Routes />
      </View>
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
