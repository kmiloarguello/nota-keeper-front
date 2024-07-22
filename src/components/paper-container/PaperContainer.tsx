import { FC } from 'react';

import { Box, Paper } from '@mui/material';

interface PaperContainerProps {
  children: React.ReactNode;
}

const PaperContainer : FC<PaperContainerProps> = ({ children }) => {
  return (
    <Box 
      className="mt-4 p-[1px] rounded-0 sm:rounded-2xl mx-auto">
      <Paper className="shadow-none rounded-0 sm:pt-auto sm:min-h-auto sm:rounded-2xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-start bg-transparent">
        {children}
      </Paper>
    </Box>
  );
};

export default PaperContainer;
