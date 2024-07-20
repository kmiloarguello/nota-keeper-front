import { configureStore } from '@reduxjs/toolkit';

import languageSlice from './reducers/languageSlice';
import notaSlice from './reducers/notaSlice';

const store = configureStore({
  reducer: {
    nota: notaSlice,
    language: languageSlice,
  },
});

export type NotaState = ReturnType<typeof store.getState>;
export type NotaDispatch = typeof store.dispatch;
export default store;
