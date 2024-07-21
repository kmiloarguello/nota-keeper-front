
import theme from 'config/theme/theme';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
    Card, CardActions, CardContent, CardHeader, Collapse, IconButton, IconButtonProps, Step,
    StepLabel, Stepper, styled, Typography
} from '@mui/material';
import { NotaType, NotaTypeResponse } from '@types';

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

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
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
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Stepper orientation='vertical'>
            <Step>
              <StepLabel>Step 1</StepLabel>
            </Step>
            <Step>
              <StepLabel>Step 2</StepLabel>
            </Step>
            <Step>
              <StepLabel>Step 3</StepLabel>
            </Step>
            <Step>
              <StepLabel>Step 4</StepLabel>
            </Step>
          </Stepper>
        </CardContent>
      </Collapse>
    </Card>
  );
};


export default LanguageCard;