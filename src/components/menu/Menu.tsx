import { IconCreate } from 'assets';
import { MenuPurpleGradientListButton } from 'config/theme';
import { gradients, greyIsh } from 'config/theme/theme';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { VscChevronLeft } from 'react-icons/vsc';
import { Link } from 'react-router-dom';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import HomeIcon from '@mui/icons-material/Home';
import {
    alpha, Avatar, Box, CssBaseline, IconButton, ListItem, ListItemIcon, ListItemText, Paper, Stack,
    Typography
} from '@mui/material';
import MuiDrawer, { DrawerProps } from '@mui/material/Drawer';
import { styled } from '@mui/material/styles';

interface MenuProps {
  nav: number;
  open: boolean;
  setOpen?: (open: boolean) => void;
};

const drawerWidth = 256;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

  
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})<DrawerProps>(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    '& .MuiDrawer-paper': {
      display: 'flex',
      justifyContent: 'space-between',
      overflow: 'initial',
      margin: "20px",
      border: "none",
      borderRadius: 20,
      width: drawerWidth,
      height: "95%",
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      borderRight: 'none',
      background: gradients.menu
    },
  }),
  ...(!open && {
    '& .MuiDrawer-paper': {
      display: 'flex',
      margin: "20px",
      justifyContent: 'space-between',
      overflow: 'initial',
      width: "119px",
      height: "95%",
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      borderRight: 'none',
      borderRadius: 20,
      background: gradients.menu
    },
  }),
}));
  
const menuItemsLogged = (t : any) => [
  {
    icon: <HomeIcon />,
    text: t('menu.home'),
    dest: '/',
  },
  {
    icon: <IconCreate />,
    text: t('menu.create'),
    dest: '/new',
  },
];
  
const Menu : FC<MenuProps> = ({ nav, open: propsOpen = false, setOpen : propsSetOpen = () => {} }) => {
    const { t } = useTranslation();
    const [isRotated, setIsRotated] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(propsOpen);
    const isMobile = window.innerWidth < 768;

    const closeMenu = () => {
      setOpen(false);
      propsSetOpen && propsSetOpen(false);
    }
    const toggleMenu = () => {
      setIsRotated(!isRotated);
      setOpen(!open);
      propsSetOpen && propsSetOpen(!open);
    }


    return (
      <Box className="flex">
        <CssBaseline />
        <Drawer variant="permanent" open={open}>
          {isMobile && (
              <DrawerHeader>
                <IconButton onClick={closeMenu}>
                  <VscChevronLeft />
                </IconButton>
              </DrawerHeader>
          )}
          <Box>
            <Box className={`relative flex justify-start items-center mt-8 mb-4 px-5 ${!open && 'flex-col'}`}>
              <Avatar  /> 
              <IconButton 
                aria-label="close-menu" 
                className="absolute -right-5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
                onClick={toggleMenu}
                sx={{
                  transition: 'transform .4s',
                  transform: isRotated ? 'rotate(180deg)' : 'rotate(0deg)',
                }}
              >
                <ArrowBackIosNewIcon />
              </IconButton>
            </Box>
            {
              menuItemsLogged(t).map((itemMenu, index) => (
                <ListItem key={index} className='py-1'>
                  <Link to={itemMenu.dest} className="w-full">
                    <MenuPurpleGradientListButton className={`w-full hover:w-[208px] menu-item-button transition-all ease-in-out duration-300 ${nav === index ? "active" : ""}`}>
                        <ListItemIcon
                          className="justify-center"
                          sx={{ 
                            mr: open ? 3 : 'auto', 
                            fontSize: '1.4em',
                            color: alpha(greyIsh[100], 1),
                            ...(nav === index && {
                              color: "common.white",
                            }) 
                          }}
                        >
                          {itemMenu.icon}
                        </ListItemIcon>
                      <ListItemText primary={itemMenu.text} sx={{ opacity: open ? 1 : 0 }} className="menu-item-button-text transition-all ease-in-out duration-300" />
                    </MenuPurpleGradientListButton>
                  </Link>
                </ListItem>
              ))
            }
          </Box>
          <Stack direction="column" className="mx-4 mb-2">
            <Paper sx={{ backgroundColor: alpha(greyIsh[100], .05 ) }} className="flex flex-col justify-center items-center rounded-3xl p-6">
              <Typography variant="caption" className="text-center font-medium">NOTA<br/>KEEPER</Typography>
              <br />
              <Typography variant="caption" className="text-center font-light text-xs">{t('home.created-by')}</Typography>
              <Link to="https://camiloarguello.xyz" target='_blank' className="text-center font-semibold text-blue-500 text-sm">CA</Link>
            </Paper>
          </Stack>
        </Drawer>
      </Box>
    );
  }
  
  export default Menu;
  