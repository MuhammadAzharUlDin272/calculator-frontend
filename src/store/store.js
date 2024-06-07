import { configureStore } from '@reduxjs/toolkit';
import itemsReducer from '../slices/slices';
import emailReducer from '../slices/emailslice';
import tenderReducer from '../slices/tenderslice';
import countReducer from '../slices/countslice';
import companyReducer from '../slices/companyslice';
import passwordReducer from '../slices/passwordslice';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';

const persistConfig = {
  key: 'counter',
  storage,
};

const reducers = combineReducers({
  items: itemsReducer,
  tender: tenderReducer,
  email: emailReducer,
  count: countReducer,
  company:companyReducer,
  password:passwordReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);


const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
          serializableCheck: {
              ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
      }),
})

export default store;