import { Menu } from 'components';
import { gradients } from 'config/theme/theme';
import { useNotas } from 'hooks';
import { FC, forwardRef, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { NotaService } from 'services';
import { useNotaDispatch } from 'store/hooks';
import { setNotas } from 'store/reducers/notaSlice';
import * as yup from 'yup';

import { NotaType, NotaTypeRequest, NotaTypeResponse } from '@/@types';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  content: yup.string().required("Content is required"),
});

const defaultValues = (
  nota_id?: string,
  notas?: NotaTypeResponse[]
): NotaType => {
  if (!nota_id) return { title: "", content: "" };
  const nota = notas?.find((nota) => String(nota.id) === nota_id);
  if (!nota) return { title: "", content: "" };
  return { title: nota.title, content: nota.content };
};

const Alert = forwardRef<HTMLDivElement, AlertProps>(
  function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  }
);

interface NewEditNoteProps {
  nota_id?: string;
}

const NewEditNote: FC<NewEditNoteProps> = ({ nota_id }) => {
  const dispatch = useNotaDispatch();
  const notas = useNotas();

  console.log("nn", notas);
  const { t } = useTranslation();
  const navigate = useNavigate();

  // get nota_id from url
  const { id } = useParams();

  const { control, formState, handleSubmit, reset } = useForm({
    mode: "onChange",
    defaultValues: { title: "", content: "" },
    resolver: yupResolver(schema),
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  const { errors } = formState;

  const onSubmit = async (data: NotaType) => {
    setIsSubmitting(true);
    try {
      const notaData = { ...data, user_id: "1" } as NotaTypeRequest;
      const consumer = new NotaService();
      if (id) {
        const nota = await consumer.update(id, notaData);
        dispatch(setNotas([...notas, nota]));
      } else {
        const nota = await consumer.create(notaData);
        dispatch(setNotas([...notas, nota]));
      }

      reset();
      navigate("/");
    } catch (error) {
      console.error(error);
    }
    setIsSubmitting(false);
  };

  useEffect(() => {
    if (!id || !notas.length) return;
    // set default values to each field
    reset(defaultValues(id, notas));
  }, [id, notas]);

  return (
    <Box className="flex flex-col flex-auto items-center sm:justify-center min-w-0 md:h-full">
      <Menu nav={0} open={openMenu} setOpen={setOpenMenu} />
      <Box className="p-4 w-11/12 md:w-1/2 lg:w-96 mx-auto">
        <Typography
          variant="h2"
          className="font-inter text-white text-center mt-2 text-4xl md:text-3xl font-semibold tracking-tight leading-tight text-black"
        >
          {t("new-edit-note.title")}
        </Typography>
      </Box>
      <Paper
        className="p-4 w-11/12 md:w-1/2 lg:w-96 mx-auto rounded-xl"
        sx={{
          "&": {
            background: gradients.menu,
          },
        }}
      >
        <form
          name="new-edit-note"
          noValidate
          className="flex flex-col gap-y-4 justify-center w-full mb-4 sm:mb-0"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <>
                <TextField
                  {...field}
                  className="text-slate-300 font-light grow w-full rounded-lg"
                  autoFocus
                  type="text"
                  error={!!errors.title}
                  variant="outlined"
                  fullWidth
                  size="small"
                  placeholder="Title"
                />
                {errors.title && (
                  <Typography variant='caption' className='text-red-500 -mt-4'>{errors.title.message}</Typography>
                )}
              </>
            )}
          />
          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <>
                <TextField
                  {...field}
                  multiline
                  rows={4}
                  className="text-slate-300 font-light grow w-full rounded-lg"
                  autoFocus
                  type="text"
                  error={!!errors.title}
                  variant="outlined"
                  fullWidth
                  size="small"
                  placeholder="Content"
                />
                {errors.content && (
                  <Typography variant='caption' className='text-red-500 -mt-4'>{errors.content.message}</Typography>
                )}
              </>
            )}
          />
          <Button
            type="submit"
            disabled={isSubmitting}
            variant="contained"
            className="bg-white text-black mx-auto normal-case my-4"
          >
            Submit
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default NewEditNote;
