import { useEffect, useState } from 'react';
import { NotaService } from 'services';
import { useNotaDispatch, useNotaSelector } from 'store/hooks';
import { selectNotas, setNotas as setGlobalNotas } from 'store/reducers/notaSlice';

import { NotaType } from '@types';

const useNotas = (): NotaType[]  => {
  const dispatch = useNotaDispatch();
  const globalNotas  = useNotaSelector(selectNotas);
  const [notas, setNotas] = useState<NotaType[]>(globalNotas);

  useEffect(() => {
    const getNotas = async () => {
      const notasConsumer = new NotaService();
      const notas = await notasConsumer.getAll();
      setNotas(notas);
      dispatch(setGlobalNotas(notas));
    };

    getNotas();
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [globalNotas]);


  return notas;
};

export default useNotas;