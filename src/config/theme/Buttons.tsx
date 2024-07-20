

import { alpha, Button, ListItemButton, Tab, Tabs } from '@mui/material';
import { styled } from '@mui/system';

import { gradients } from './theme';

export const WhitePurpleButton = styled(Button)(({ theme }) => ({
  borderRadius: 12,
  variant: "contained",
  color: theme.palette.primary.main,
  background: theme.palette.common.white,
  border: `2px solid ${theme.palette.primary.light}`,
  boxShadow: "none",
  ':hover': {
    background: theme.palette.primary.light,
    color: theme.palette.common.white,
  },
}));

export const MenuPurpleGradientListButton = styled(ListItemButton)(({ theme }) => ({
  borderRadius: 12,
  variant: "contained",
  height: "56px",
  color: theme.palette.primary.light,
  '&.active': {
    color: theme.palette.common.white,
    background: gradients.purples,
  },
}));

export const CustomTabs = styled(Tabs)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.common.white, 0.1),
  borderRadius: '999px',
  width: 'fit-content',
  padding: '8px',
  '& .MuiTabs-indicator': {
    display: 'none',
  },
}));

export const CustomTab = styled(Tab)(({ theme }) => ({
  backgroundColor: 'transparent',
  borderRadius: '999px',
  padding: '8px 16px',
  margin: '0 4px',
  textTransform: 'capitalize',
  color: theme.palette.common.white,
  fontWeight: 600,
  transition: 'background-color 0.3s ease',
  minWidth: '144px',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  '&.Mui-selected': {
    background: gradients.purplesDark,
    color: theme.palette.common.white
  },
}));

