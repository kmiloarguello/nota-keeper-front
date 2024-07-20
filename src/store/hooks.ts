import { useDispatch, useSelector } from 'react-redux';

import type { NotaDispatch, NotaState } from "./store";

export const useNotaDispatch = useDispatch.withTypes<NotaDispatch>();
export const useNotaSelector = useSelector.withTypes<NotaState>();
