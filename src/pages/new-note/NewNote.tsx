import { gradients } from 'config/theme/theme';
import { forwardRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { NotaService } from 'services';
import { useNotaDispatch, useNotaSelector } from 'store/hooks';
import { selectNotas, setNotas } from 'store/reducers/notaSlice';
import * as yup from 'yup';

import { NotaType, NotaTypeRequest } from '@/@types';
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

const defaultValues: NotaType = {
  title: "",
  content: "",
};

const Alert = forwardRef<HTMLDivElement, AlertProps>(
  function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  }
);

const SignInPage: React.FC = () => {
  const dispatch = useNotaDispatch();
  const notas  = useNotaSelector(selectNotas);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { control, formState, handleSubmit, reset } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(schema),
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { errors } = formState;

  const onSubmit = async (data : NotaType) => {
    setIsSubmitting(true);
    try {
      const notaData = { ...data, user_id: "1" } as NotaTypeRequest;
      const consumer = new NotaService();
      const nota = await consumer.create(notaData);
      dispatch(setNotas([...notas, nota]));
      reset();
      navigate("/");
    } catch (error) {
      console.error(error);
    }
    setIsSubmitting(false);
  };

  return (
    <Box
      sx={{ background: gradients.full }}
      className="flex flex-col flex-auto items-center sm:justify-center min-w-0 md:h-full"
    >
      <Box className="bg-none p-4 w-11/12 md:w-1/2 lg:w-96 mx-auto">
        <Typography
          variant="h2"
          className="font-inter text-white text-center mt-2 text-4xl md:text-3xl font-semibold tracking-tight leading-tight"
        >
          {t("signin.login-to-enflu")}
        </Typography>
      </Box>
      <Paper className="bg-none bg-enflu-grey-400 p-4 w-11/12 md:w-1/2 lg:w-96 mx-auto rounded-xl">
        <form
          name="loginForm"
          noValidate
          className="flex flex-col justify-center w-full mb-4 sm:mb-0"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
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
            )}
          />
          <Controller
            name="content"
            control={control}
            render={({ field }) => (
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
                  placeholder='Content'
                />
            )}
          />
          <Button
            type="submit"
            disabled={isSubmitting}
            variant="contained"
            className="text-enflu-purple-100 mx-auto underline hover:bg-transparent normal-case my-4"
          >
            Submit
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default SignInPage;
