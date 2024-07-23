
import { IconArrowRight } from 'assets';
import { NotaPopover } from 'components';
import { gradients } from 'config/theme/theme';
import { diffChars } from 'diff';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NotaService } from 'services';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
    Box, Card, CardActions, CardContent, CardHeader, Collapse, IconButton, IconButtonProps, Stack,
    Step, StepLabel, Stepper, styled, Tooltip, Typography
} from '@mui/material';
import { NotaType, NotaTypeResponse, VersionTypeResponse } from '@types';

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

const renderDiff = (noteContent: string, versionContent: string) => {
  const diffResult = diffChars(versionContent, noteContent);
  return diffResult.map((part : any, index: number) => {
    if (part.added) {
      return <span key={index} style={{ backgroundColor: 'lightgreen' }}>{part.value}</span>;
    } else if (part.removed) {
      return <span key={index} style={{ backgroundColor: 'salmon' }}>{part.value}</span>;
    } else {
      return <span key={index}>{part.value}</span>;
    }
  });
};

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

  const handleSelectVersion = (version_id: string) => {
    if (!version_id) return;
    try {
      const consumer = new NotaService();
      consumer.selectVersion(nota.id, version_id);
      // onClick && onClick(nota);
    } catch (error) {
      console.error('Error selecting version:', error);
    }
  };

  return (
    <Card className="rounded-xl pinterest-item bg-white border border-gray-300" sx={{
      '&.MuiPaper-root': {
        background: gradients.menu
      },
    }} >
      <CardHeader
        action={<NotaPopover nota={nota} />}
        title={title}
        subheader={new Date(created_at).toLocaleDateString()}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary" className='font-medium'>
          {content}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={() => handleExpandClick(nota.id)}
          aria-expanded={expanded}
          aria-label={t('show-more')}
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
                      <Typography variant='h6' color="text.primary">{t('version')} {version.id}</Typography>
                      <Typography variant='body1' className="text-black">{new Date(version.created_at).toDateString()}</Typography>
                      <Typography variant='body2' className="text-black">{renderDiff(nota.content, version.content)}</Typography>
                    </Box>
                    <Box className="self-center">
                      <Tooltip title={t('select-version')} placement='top'>
                        <IconButton onClick={() => handleSelectVersion(version.id)}>
                          <IconArrowRight />
                        </IconButton>
                      </Tooltip>
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