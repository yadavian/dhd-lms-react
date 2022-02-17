import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { combineReducers, createStore, applyMiddleware } from 'redux';
// import AsyncStorage from '@react-native-async-storage/async-storage'

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';


import homeReducer from './slice/homeSlice'; 
import loginReducer from './slice/loginSlice';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import storage from 'redux-persist/lib/storage';


const reducers = combineReducers({
  home: homeReducer, 
  login:loginReducer
});

const persistConfig = {
  key: 'root',
  version: 1,
  timeout: null,
  storage: storage,
  stateReconciler: autoMergeLevel2,
  whitelist: ['login'], //Things u want to persist
  blacklist: ['dark','home',], //Things u dont
};

const persistedReducer = persistReducer(persistConfig, reducers);

// export const store = createStore(persistedReducer, applyMiddleware(logger));

// export const store = configureStore({
//   reducer: persistedReducer,
//   // devTools: true
//   // middleware: [createLogger()],

// });
export const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: getDefaultMiddleware({
    serializableCheck: false
    // serializableCheck: {
    //   ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    // },
  }),
});

export const persistor = persistStore(store);
