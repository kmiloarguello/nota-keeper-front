import { Card as NotaCard, Menu, PaperContainer } from 'components';
import { useNotas } from 'hooks';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import AddIcon from '@mui/icons-material/Add';
import { Box, Fab, Tooltip, Typography } from '@mui/material';

interface CreatePageProps {
  nav: number;
};

const CreatePage : FC<CreatePageProps> = ({ nav }) => {
  const { t } = useTranslation();
  const notas = useNotas();

  const [openMenu, setOpenMenu] = useState<boolean>(false);
  return (
    <Box className="bg-white flex flex-col flex-auto items-center sm:justify-center min-w-0 md:h-full">
      <Menu nav={nav} open={openMenu} setOpen={setOpenMenu} />
      <Box className={`w-[1000px] transition-all ease-in-out ${openMenu ? 'ml-[300px]' : 'ml-40'}`}>
        <Box className="mt-8">
          <Typography variant="h1" className="text-4xl font-bold text-center text-slate-500 pt-4">{t('home.title')}</Typography>
          <Typography variant="body1" className="text-xl text-center text-slate-600 pb-4">{t('home.description')}</Typography>
          <PaperContainer>
            {
              notas.map((nota, index) => (
                <NotaCard key={index} nota={nota} />
              ))
            }
          </PaperContainer>
        </Box>
      </Box>
      <Tooltip title={t('home.add-note')}>
      <Fab component={Link} to="/new" color="primary" aria-label="add" className="fixed bottom-10 right-10">
        <AddIcon />
      </Fab>
      </Tooltip>
    </Box>
  )
};
export default CreatePage;