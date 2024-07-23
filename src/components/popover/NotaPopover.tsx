import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { NotaService } from 'services';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButton, List, ListItem, ListItemButton, ListItemText, Popover } from '@mui/material';
import { NotaTypeResponse } from '@types';

interface NotaPopoverProps {
  nota: NotaTypeResponse
}

const NotaPopover : FC<NotaPopoverProps> = ({ nota }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleEditNota = async (nota_id: string) => {
    if (!nota_id) return;
    navigate(`/edit/${nota_id}`);
    // Todo: Implement edit nota
  };

  const handleDeleteNota = async (nota_id: string) => {
    if (!nota_id) return;
    try {
      const consumer = new NotaService();
      await consumer.delete(nota_id);
      window.location.reload();
    } catch (error) {
      // Handle error
      console.error("Error deleting nota:", error);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <IconButton aria-label="settings" onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <List component="nav" aria-label="secondary mailbox folders">
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleEditNota(nota.id)}>
              <ListItemText primary={t('edit')} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton  onClick={() => handleDeleteNota(nota.id)}>
              <ListItemText primary={t('delete')} />
            </ListItemButton>
          </ListItem>
        </List>
      </Popover>
    </>
  );
};

export default NotaPopover;