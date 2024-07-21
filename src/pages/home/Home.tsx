import { Card as NotaCard, Menu, PaperContainer } from 'components';
import { useNotas } from 'hooks';
import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import AddIcon from '@mui/icons-material/Add';
import { Box, Fab } from '@mui/material';
import { NotaTypeResponse } from '@types';

interface CreatePageProps {
  children?: React.ReactNode;
  nav: number;
};

const CreatePage : FC<CreatePageProps> = ({ children, nav }) => {
  const { t } = useTranslation();
  const notas = useNotas();

  const handleOnNotaCreation = async (nota: NotaTypeResponse) => {};

  const [openMenu, setOpenMenu] = useState<boolean>(false);
  return (
    <Box className="bg-white flex flex-col flex-auto items-center sm:justify-center min-w-0 md:h-full">
      <Menu nav={nav} open={openMenu} setOpen={setOpenMenu} />
      <Box className={`w-[808px] transition-all ease-in-out ${openMenu ? 'ml-[300px]' : 'ml-40'}`}>
        <Box className="mt-8">
          <PaperContainer>
            {
              notas.map((nota, index) => (
                <NotaCard key={index} nota={nota} />
              ))
            }
          </PaperContainer>
        </Box>
      </Box>
      <Fab component={Link} to="/new" color="primary" aria-label="add" className="fixed bottom-10 right-10">
        <AddIcon />
      </Fab>
    </Box>
  )
};
export default CreatePage;