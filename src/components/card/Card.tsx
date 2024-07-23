import { IconArrowRight } from 'assets';
import { NotaPopover } from 'components';
import { gradients } from 'config/theme/theme';
import { diffChars } from 'diff';
import { TFunction } from 'i18next';
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
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

/**
 * @desc Handles the selection of a version of a Nota
 * @param {string} version_id
 * @returns {void}
 */
const handleSelectVersion = (nota_id: string, version: VersionTypeResponse) => {
  if (!nota_id || !version) return;
  try {
    const consumer = new NotaService();
    consumer.selectVersion(nota_id, version.id, version.content);
    window.location.reload();
  } catch (error) {
    console.error("Error selecting version:", error);
  }
};

/**
 * @desc Renders the differences between versions of a Nota
 * - It uses the `diffChars` function from the `diff` package to compare the content of two versions
 * - It compares the content of the current version with the next version
 * - It highlights the differences in the content
 * @param {VersionTypeResponse[]} versions
 * @param {TFunction<"translation", undefined>} t
 * @returns {JSX.Element[] | null}
 */
const renderDiff = (
  versions: VersionTypeResponse[],
  nota_id: string,
  t: TFunction<"translation", undefined>
): (JSX.Element | null)[] => {
  const diffs = versions.map((version, index, array) => {
    // Check if there's a next version to compare with
    if (index + 1 < array.length) {
      const nextVersion = array[index + 1];
      const diffResult = diffChars(version.content, nextVersion.content);
      return (
        <Step key={index}>
          <StepLabel>
            <Stack direction="row" spacing={2}>
              <Box>
                <Typography variant="h6" color="text.primary">
                  {t("version")} {index + 1}
                </Typography>
                <Typography
                  variant="caption"
                  className="text-white font-light text-xs"
                >
                  {new Date(version.created_at).toDateString()} {", "}
                  {new Date(version.created_at).toLocaleTimeString()}
                </Typography>
                <br />
                {diffResult.map((part, partIndex) => {
                  if (part.added) {
                    return (
                      <span
                        key={partIndex}
                        style={{ backgroundColor: "lightgreen" }}
                      >
                        {part.value}
                      </span>
                    );
                  } else if (part.removed) {
                    return (
                      <span
                        key={partIndex}
                        style={{ backgroundColor: "salmon" }}
                      >
                        {part.value}
                      </span>
                    );
                  } else {
                    return <span key={partIndex}>{part.value}</span>;
                  }
                })}
              </Box>
              <Box className="self-center">
                <Tooltip title={t("select-version")} placement="top">
                  <IconButton
                    onClick={() => handleSelectVersion(nota_id, version)}
                  >
                    <IconArrowRight />
                  </IconButton>
                </Tooltip>
              </Box>
            </Stack>
          </StepLabel>
        </Step>
      );
    }
    return null;
  });

  return diffs;
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

  return (
    <Card
      className="rounded-xl pinterest-item bg-white border border-gray-300"
      sx={{
        "&.MuiPaper-root": {
          background: gradients.menu,
        },
      }}
    >
      <CardHeader
        action={<NotaPopover nota={nota} />}
        title={title}
        subheader={new Date(created_at).toLocaleDateString()}
      />
      <CardContent>
        <Typography
          variant="body2"
          color="text.secondary"
          className="font-medium"
        >
          {content}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={() => handleExpandClick(nota.id)}
          aria-expanded={expanded}
          aria-label={t("show-more")}
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Stepper orientation="vertical">
            {renderDiff(versions, nota.id, t)}
          </Stepper>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default LanguageCard;
