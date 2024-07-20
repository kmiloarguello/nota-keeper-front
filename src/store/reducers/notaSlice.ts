import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NotaType } from '@types';

import type { NotaState } from "../store";

export const notaSlice = createSlice({
  name: "nota",
  initialState: [] as NotaType[],
  reducers: {
    setNotas: (state, action: PayloadAction<NotaType[]>) => action.payload,
    clearNota: () => [],
  },
});

export const { setNotas, clearNota } = notaSlice.actions;
export const selectNotas = (state: NotaState) => state.nota;
export default notaSlice.reducer;
