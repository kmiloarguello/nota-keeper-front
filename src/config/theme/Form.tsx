import { alpha, TextField } from '@mui/material';
import { styled } from '@mui/system';

import { blues } from './theme';

export const CustomTextField = styled(TextField)(({ theme }) => ({
    backgroundColor: blues[500],
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'transparent', // remove border
      },
      '&:hover fieldset': {
        borderColor: 'transparent', // remove border on hover
      },
      '&.Mui-focused fieldset': {
        borderColor: 'transparent', // remove border when focused
      },
    },
    '& .MuiInputBase-input': {
      color: 'white', // change input color
    },
    '& .MuiFormLabel-root': {
      color: alpha(theme.palette.divider, 0.6), // change placeholder color
    },
    '& .MuiFormLabel-root.Mui-focused': {
      color: alpha(theme.palette.divider, 0.6), // keep placeholder color when focused
    },
    '&.prefilled': {
      backgroundColor: alpha(blues[100], 0.4),
    }
}));