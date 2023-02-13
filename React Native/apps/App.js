/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  LogBox
} from 'react-native';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { default as theme } from '../custom-theme.json';
import { AppNavigator } from './navigation/appnavigator';
import { Provider } from 'react-redux';
import store from './redux/store';

const App = () => {
  LogBox.ignoreAllLogs();
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
        <Provider store={store}>
          <AppNavigator />
        </Provider>
      </ApplicationProvider>
    </>
  );
};

export default App;
