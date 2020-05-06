import React from 'react';
import {SafeAreaView, StatusBar, Text} from 'react-native';

declare const global: {HermesInternal: null | {}};

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <Text>OI</Text>
      </SafeAreaView>
    </>
  );
};

export default App;
