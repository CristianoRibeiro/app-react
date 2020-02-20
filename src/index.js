import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider as PaperProvider, DefaultTheme} from 'react-native-paper';
import configureStore from './reducers/store';

import '~/config/ReactotronConfig';

import Routes from '~/routes';

const {store, persistor} = configureStore();
//import store from '~/reducers/st';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: "#0D4274",
    accent: "#FF6666",
    dark: "#222",
    light: "#fff"
  }
};

console.disableYellowBox = true;

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <PaperProvider theme={theme}>
        <Routes/>
      </PaperProvider>
    </PersistGate>
  </Provider>
);

export default App;
