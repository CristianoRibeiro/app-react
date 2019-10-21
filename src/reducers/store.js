// Necessary imports
import { persistStore,persistReducer, persistCombineReducers} from 'redux-persist';
import { createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
//import storage from 'redux-persist/lib/storage';
import { AsyncStorage } from "react-native";
import reducers from '../reducers/reducer';

// Persistor Configuration to whitelist and blacklist any reducer
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  //blacklist: ['loading'] // navigation will not be persisted
};

const persistedReducer = persistReducer(persistConfig,reducers);

export default () => {
  const store = createStore(persistedReducer);
  const persistor = persistStore(store);
  return { store, persistor };
};