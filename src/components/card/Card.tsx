
import { IconEdit } from 'assets';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NotaService } from 'services';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
    Box, Card, CardActions, CardContent, CardHeader, Collapse, IconButton, IconButtonProps, Stack,
    Step, StepLabel, Stepper, styled, Typography
} from '@mui/material';
import { NotaType, NotaTypeResponse, VersionTypeResponse } from '@types';

import NotaPopover from '../popover/NotaPopover';

interface CardProps {
  nota: NotaTypeResponse;
  selected?: boolean;
  onClick?: (nota: NotaType) => void;
}

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const LanguageCard: FC<CardProps> = ({ nota, onClick, selected }) => {
  const { t } = useTranslation();
  const { title, content, created_at } = nota;
  
  const [versions, setVersions] = useState<VersionTypeResponse[]>([]);
  const [expanded, setExpanded] = useState<boolean>(false);

  const handleExpandClick = async (nota_id: string) => {
    if (!nota_id) return;
    const consumer = new NotaService();
    const versions = await consumer.getVersionsFromNota(nota_id);
    setVersions(versions);
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        action={
          <NotaPopover nota={nota} />
        }
        title={title}
        subheader={new Date(created_at).toLocaleDateString()}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {content}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={() => handleExpandClick(nota.id)}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Stepper orientation='vertical'>
            {versions.map((version, index) => (
              <Step key={index}>
                <StepLabel>
                  <Stack direction='row' spacing={2}>
                    <Box>
                      <Typography variant='h6'>Version {version.id}</Typography>
                      <Typography variant='body1'>{new Date(version.created_at).toDateString()}</Typography>
                      <Typography variant='body2'>{version.content}</Typography>
                    </Box>
                    <Box>
                      <IconButton>
                        <IconEdit />
                      </IconButton>
                    </Box>
                  </Stack>
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </CardContent>
      </Collapse>
    </Card>
  );
};


export default LanguageCard;