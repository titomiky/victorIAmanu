"use client";
import {
  Alert,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { z as zod } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = zod.object({
  firstName: zod.string().min(1, { message: "El nombre es requerido" }),
  lastName: zod.string().min(1, { message: "El apellido es requerido" }),
  phone: zod.string().min(1, { message: "El teléfono es requerido" }),
  email: zod.string().min(1, { message: "El email es requerido" }).email(),
  current_salary: zod.string().optional(),
  wished_salary: zod.string().optional(),
  more_data: zod.string(),
  resume: zod.string().min(1, { message: "El curriculum es obligatorio" }),
  password: zod
    .string()
    .min(6, { message: "La contraseña debe contener al menos 6 caracteres" }),
});

type Values = zod.infer<typeof schema>;

const defaultValues = {
  firstName: "",
  lastName: "",
  phone: "",
  current_salary: undefined,
  wished_salary: undefined,
  more_data: "",
  resume: "",
  email: "",
  password: "",
} satisfies Values;

const CreateCandidate = () => {
  const [isPending, setIsPending] = React.useState<boolean>(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });

  const onSubmit = () => {}; // api request to create a new candidature

  return (
    <Stack spacing={3}>
      <Stack spacing={1}>
        <Typography variant="h4">Crear candidatura</Typography>
      </Stack>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack
          spacing={2}
          sx={{
            display: { xs: "flex", md: "grid" },
            gridTemplateColumns: "1fr 1fr",
          }}
        >
          <Controller
            control={control}
            name="firstName"
            render={({ field }) => (
              <FormControl error={Boolean(errors.firstName)}>
                <InputLabel>Nombre</InputLabel>
                <OutlinedInput {...field} label="Nombre" />
                {errors.firstName ? (
                  <FormHelperText>{errors.firstName.message}</FormHelperText>
                ) : null}
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="lastName"
            render={({ field }) => (
              <FormControl error={Boolean(errors.lastName)}>
                <InputLabel>Apellido/s</InputLabel>
                <OutlinedInput {...field} label="Apellido/s" />
                {errors.lastName ? (
                  <FormHelperText>{errors.lastName.message}</FormHelperText>
                ) : null}
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="phone"
            render={({ field }) => (
              <FormControl error={Boolean(errors.phone)}>
                <InputLabel>Teléfono</InputLabel>
                <OutlinedInput {...field} label="Teléfono" />
                {errors.phone ? (
                  <FormHelperText>{errors.phone.message}</FormHelperText>
                ) : null}
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <FormControl error={Boolean(errors.email)}>
                <InputLabel>Email </InputLabel>
                <OutlinedInput {...field} label="Email" type="email" />
                {errors.email ? (
                  <FormHelperText>{errors.email.message}</FormHelperText>
                ) : null}
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="current_salary"
            render={({ field }) => (
              <FormControl error={Boolean(errors.current_salary)}>
                <InputLabel>Salario actual</InputLabel>
                <OutlinedInput
                  {...field}
                  label="Salario Actual"
                  type="number"
                />
                {errors.current_salary ? (
                  <FormHelperText>
                    {errors.current_salary.message}
                  </FormHelperText>
                ) : null}
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="wished_salary"
            render={({ field }) => (
              <FormControl error={Boolean(errors.wished_salary)}>
                <InputLabel>Salario deseado</InputLabel>
                <OutlinedInput
                  {...field}
                  label="Salario deseado"
                  type="number"
                />
                {errors.wished_salary ? (
                  <FormHelperText>
                    {errors.wished_salary.message}
                  </FormHelperText>
                ) : null}
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="more_data"
            render={({ field }) => (
              <FormControl error={Boolean(errors.more_data)}>
                <InputLabel>Datos adicionales</InputLabel>
                <OutlinedInput
                  {...field}
                  label="Datos adicionales"
                  type="text"
                />
                {errors.more_data ? (
                  <FormHelperText>{errors.more_data.message}</FormHelperText>
                ) : null}
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="resume"
            render={({ field }) => (
              <FormControl error={Boolean(errors.resume)}>
                <InputLabel shrink={true}>Curriculum</InputLabel>
                <OutlinedInput
                  label="Curriculum"
                  {...field}
                  type="file"
                  notched={true}
                />
                {errors.resume ? (
                  <FormHelperText>{errors.resume.message}</FormHelperText>
                ) : null}
              </FormControl>
            )}
          />
          {errors.root ? (
            <Alert color="error">{errors.root.message}</Alert>
          ) : null}
          <Button
            disabled={isPending}
            type="submit"
            variant="contained"
            sx={{ placeSelf: "center", gridColumn: "1/3", width: "200px" }}
          >
            Continuar
          </Button>
        </Stack>
      </form>
    </Stack>
  );
};

export default CreateCandidate;
