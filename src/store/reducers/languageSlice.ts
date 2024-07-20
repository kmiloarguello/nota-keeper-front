import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Language } from '@types';

import type { NotaState } from "../store";

export const languageSlice = createSlice({
  name: "language",
  initialState: ({} as Language) || null,
  reducers: {
    setTargetLanguage: (state, action: PayloadAction<Language>) => {
      return { ...action.payload };
    },
    clearTargetLanguage: () => (({}) as Language) || null,
  },
});

export const { setTargetLanguage, clearTargetLanguage } = languageSlice.actions;
export const selectLanguage = (state: NotaState) => state.language;
export default languageSlice.reducer;
