"use client";
import {
  Alert,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { z as zod } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "@/lib/auth/client";
import { useRouter } from "next/navigation";
import { paths } from "@/paths";
import { Eye as EyeIcon } from "@phosphor-icons/react/dist/ssr/Eye";
import { EyeSlash as EyeSlashIcon } from "@phosphor-icons/react/dist/ssr/EyeSlash";

const schema = zod.object({
  email: zod.string().min(1, { message: "El email es requerido" }).email(),
  password: zod.string().min(1, { message: "La contraseña es requerida" }),
  name: zod.string().min(1, { message: "El nombre es requerido" }),
  surname: zod.string().min(1, { message: "El apellido es requerido" }),
  phoneNumber: zod.string().min(1, { message: "El teléfono es requerido" }),
  currentSalary: zod.string().min(1, { message: "Salario requerido" }),
  desiredSalary: zod.string().min(1, { message: "Salario requerido" }),
  birthDate: zod.string().min(1, { message: "Fecha de nacimiento requerido" }),
  file: zod
    .object({
      file: zod
        .any()
        .refine((files) => files?.length == 1, "File is required."),
    })
    .or(zod.string()),
});

type Values = zod.infer<typeof schema>;

const defaultValues = {
  email: "",
  password: "",
  name: "",
  surname: "",
  phoneNumber: "",
  currentSalary: "",
  desiredSalary: "",
  birthDate: "",
  file: "",
} satisfies Values;

const CreateCandidateDashboard = () => {
  const router = useRouter();
  const [isPending, setIsPending] = React.useState<boolean>(false);
  let file = "";
  const [showPassword, setShowPassword] = React.useState<boolean>();

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });

  const onSubmit = React.useCallback(async (values: Values) => {
    values.file = file;
    setIsPending(true);

    const { error } = await authClient.createCandidateFromDashboard(values);

    if (error) {
      setError("root", { type: "server", message: error });
      setIsPending(false);
      return;
    }

    router.replace(paths.dashboard.candidates);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Expected
  }, []);

  return (
    <Stack spacing={3}>
      <Stack spacing={1}>
        <Typography variant="h4">Crear candidato</Typography>
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
            name="email"
            render={({ field }) => (
              <FormControl error={Boolean(errors.email)} required>
                <InputLabel>Email</InputLabel>
                <OutlinedInput {...field} label="Email" type="email" />
                {errors.email ? (
                  <FormHelperText>{errors.email.message}</FormHelperText>
                ) : null}
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <FormControl error={Boolean(errors.password)} required>
                <InputLabel>Contraseña</InputLabel>
                <OutlinedInput
                  {...field}
                  endAdornment={
                    showPassword ? (
                      <EyeIcon
                        cursor="pointer"
                        fontSize="var(--icon-fontSize-md)"
                        onClick={(): void => {
                          setShowPassword(false);
                        }}
                      />
                    ) : (
                      <EyeSlashIcon
                        cursor="pointer"
                        fontSize="var(--icon-fontSize-md)"
                        onClick={(): void => {
                          setShowPassword(true);
                        }}
                      />
                    )
                  }
                  label="Contraseña"
                  type={showPassword ? "text" : "password"}
                />
                {errors.password ? (
                  <FormHelperText>{errors.password.message}</FormHelperText>
                ) : null}
              </FormControl>
            )}
          />

          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <FormControl error={Boolean(errors.name)} required>
                <InputLabel>Nombre</InputLabel>
                <OutlinedInput {...field} label="Nombre" />
                {errors.name ? (
                  <FormHelperText>{errors.name.message}</FormHelperText>
                ) : null}
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="surname"
            render={({ field }) => (
              <FormControl error={Boolean(errors.surname)} required>
                <InputLabel>Apellido/s</InputLabel>
                <OutlinedInput {...field} label="Apellido/s" />
                {errors.surname ? (
                  <FormHelperText>{errors.surname.message}</FormHelperText>
                ) : null}
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="phoneNumber"
            render={({ field }) => (
              <FormControl error={Boolean(errors.phoneNumber)} required>
                <InputLabel>Teléfono</InputLabel>
                <OutlinedInput {...field} label="Teléfono" />
                {errors.phoneNumber ? (
                  <FormHelperText>{errors.phoneNumber.message}</FormHelperText>
                ) : null}
              </FormControl>
            )}
          />

          <Controller
            control={control}
            name="currentSalary"
            render={({ field }) => (
              <FormControl error={Boolean(errors.currentSalary)} required>
                <InputLabel>Salario actual</InputLabel>
                <OutlinedInput
                  {...field}
                  label="Salario Actual"
                  type="number"
                />
                {errors.currentSalary ? (
                  <FormHelperText>
                    {errors.currentSalary.message}
                  </FormHelperText>
                ) : null}
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="desiredSalary"
            render={({ field }) => (
              <FormControl error={Boolean(errors.desiredSalary)} required>
                <InputLabel>Salario deseado</InputLabel>
                <OutlinedInput
                  {...field}
                  label="Salario deseado"
                  type="number"
                />
                {errors.desiredSalary ? (
                  <FormHelperText>
                    {errors.desiredSalary.message}
                  </FormHelperText>
                ) : null}
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="birthDate"
            render={({ field }) => (
              <FormControl error={Boolean(errors.birthDate)} required>
                <InputLabel shrink={true}>Fecha de nacimiento</InputLabel>
                <OutlinedInput
                  {...field}
                  label="Fecha de nacimiento"
                  type="date"
                  notched={true}
                />
                {errors.birthDate ? (
                  <FormHelperText>{errors.birthDate.message}</FormHelperText>
                ) : null}
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="file"
            render={({ field }) => (
              <FormControl
                sx={{ gridColumn: "1/3" }}
                error={Boolean(errors.file)}
                required
              >
                <InputLabel shrink={true}>Curriculum</InputLabel>
                <OutlinedInput
                  label="Curriculum"
                  inputProps={{ accept: ".xlsx, .xls, .pdf" }}
                  {...field}
                  onChange={(e: any) => {
                    file = e.target.files[0];
                    field.onChange(e);
                  }}
                  type="file"
                  notched={true}
                />
                {errors.file ? (
                  <FormHelperText>{errors.file.message}</FormHelperText>
                ) : null}
              </FormControl>
            )}
          />
          {errors.root ? (
            <Alert severity="error" color="error">
              {errors.root.message}
            </Alert>
          ) : null}
          <Button
            disabled={isPending}
            type="submit"
            variant="contained"
            sx={{
              placeSelf: "center",
              gridColumn: "1/3",
              width: "200px",
              marginTop: "30px",
            }}
          >
            Continuar
          </Button>
        </Stack>
      </form>
    </Stack>
  );
};

export default CreateCandidateDashboard;
