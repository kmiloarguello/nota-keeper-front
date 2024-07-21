import { blues, gradients } from 'config/theme/theme';
import { FC } from 'react';

import { Box, Paper } from '@mui/material';

interface PaperContainerProps {
  children: React.ReactNode;
}

const PaperContainer : FC<PaperContainerProps> = ({ children }) => {
  return (
    <Box 
      sx={{ backgroundImage: gradients.full }} 
      className=" animate-gradient-circle mt-4 p-[1px] rounded-0 sm:rounded-2xl lg:w-[589px] mx-auto">
      <Paper 
        sx={{ backgroundColor: blues[500] }} 
        className="shadow-none rounded-0 sm:pt-auto sm:min-h-auto sm:rounded-2xl sm:shadow lg:h-80 lg:w-[588px] mx-auto">
        {children}
      </Paper>
    </Box>
  );
};

export default PaperContainer;
