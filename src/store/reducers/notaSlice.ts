import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NotaTypeResponse } from '@types';

import type { NotaState } from "../store";

export const notaSlice = createSlice({
  name: "nota",
  initialState: [] as NotaTypeResponse[],
  reducers: {
    setNotas: (state, action: PayloadAction<NotaTypeResponse[]>) =>
      action.payload,
    clearNota: () => [],
  },
});

export const { setNotas, clearNota } = notaSlice.actions;
export const selectNotas = (state: NotaState) => state.nota;
export default notaSlice.reducer;
