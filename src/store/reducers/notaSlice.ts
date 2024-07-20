import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NotaType } from '@types';

import type { NotaState } from "../store";

export const notaSlice = createSlice({
  name: "nota",
  initialState: ({} as NotaType) || null,
  reducers: {
    setNota: (state, action: PayloadAction<NotaType>) => action.payload,
    clearNota: () => ({}) as NotaType,
  },
});

export const { setNota, clearNota } = notaSlice.actions;
export const selectNota = (state: NotaState) => state.language;
export default notaSlice.reducer;
