"use client";
import * as React from "react";
import RouterLink from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import Link from "@mui/material/Link";
import OutlinedInput from "@mui/material/OutlinedInput";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Controller, useForm } from "react-hook-form";
import { z as zod } from "zod";

import { paths } from "@/paths";
import { authClient } from "@/lib/auth/client";
import { useUser } from "@/hooks/use-user";

const schema = zod.object({
  firstName: zod.string().min(1, { message: "El nombre es requerido" }),
  lastName: zod.string().min(1, { message: "El apellido es requerido" }),
  phone: zod.string().min(1, { message: "El teléfono es requerido" }),
  email: zod.string().min(1, { message: "El email es requerido" }).email(),
  charge: zod.string().min(1, { message: "El cargo es requerido" }),
  companyName: zod
    .string()
    .min(1, { message: "El nombre de la empresa es requerido" }),
  cif: zod.string().min(1, { message: "El CIF es requerido" }),
  companyEmployees: zod
    .number()
    .min(1, { message: "El número de empleados es requerido" }),
  password: zod
    .string()
    .min(6, { message: "La contraseña debe contener al menos 6 caracteres" }),
  terms: zod
    .boolean()
    .refine((value) => value, "Debes aceptar los términos y condiciones"),
});

type Values = zod.infer<typeof schema>;

const defaultValues = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  charge: "",
  companyName: "",
  cif: "",
  companyEmployees: 0,
  password: "",
  terms: false,
} satisfies Values;

export function SignUpForm(): React.JSX.Element {
  const router = useRouter();

  const { checkSession } = useUser();

  const [isPending, setIsPending] = React.useState<boolean>(false);

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });

  const onSubmit = React.useCallback(
    async (values: Values): Promise<void> => {
      setIsPending(true);

      const { error } = await authClient.signUp(values);

      if (error) {
        setError("root", { type: "server", message: error });
        setIsPending(false);
        return;
      }

      // Refresh the auth state
      await checkSession?.();

      // UserProvider, for this case, will not refresh the router
      // After refresh, GuestGuard will handle the redirect
      router.refresh();
    },
    [checkSession, router, setError]
  );

  return (
    <Stack spacing={3}>
      <Stack spacing={1}>
        <Typography variant="h4">Registro</Typography>
        <Typography color="text.secondary" variant="body2">
          ¿Ya tienes una cuenta?{" "}
          <Link
            component={RouterLink}
            href={paths.auth.signIn}
            underline="hover"
            variant="subtitle2"
          >
            Iniciar sesión
          </Link>
        </Typography>
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
            name="charge"
            render={({ field }) => (
              <FormControl error={Boolean(errors.charge)}>
                <InputLabel>Cargo</InputLabel>
                <OutlinedInput {...field} label="Cargo" type="text" />
                {errors.charge ? (
                  <FormHelperText>{errors.charge.message}</FormHelperText>
                ) : null}
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="companyName"
            render={({ field }) => (
              <FormControl error={Boolean(errors.companyName)}>
                <InputLabel>Nombre de la empresa</InputLabel>
                <OutlinedInput
                  {...field}
                  label="Nombre de la empresa"
                  type="text"
                />
                {errors.companyName ? (
                  <FormHelperText>{errors.companyName.message}</FormHelperText>
                ) : null}
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="cif"
            render={({ field }) => (
              <FormControl error={Boolean(errors.cif)}>
                <InputLabel>CIF</InputLabel>
                <OutlinedInput {...field} label="CIF" type="text" />
                {errors.cif ? (
                  <FormHelperText>{errors.cif.message}</FormHelperText>
                ) : null}
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="companyEmployees"
            render={({ field }) => (
              <FormControl error={Boolean(errors.companyEmployees)}>
                <InputLabel>Número de empleados</InputLabel>
                <OutlinedInput
                  {...field}
                  label="Número de empleados"
                  type="number"
                />
                {errors.companyEmployees ? (
                  <FormHelperText>
                    {errors.companyEmployees.message}
                  </FormHelperText>
                ) : null}
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <FormControl
                error={Boolean(errors.password)}
                sx={{ gridColumn: "1/3" }}
              >
                <InputLabel>Contraseña</InputLabel>
                <OutlinedInput {...field} label="Contraseña" type="password" />
                {errors.password ? (
                  <FormHelperText>{errors.password.message}</FormHelperText>
                ) : null}
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="terms"
            render={({ field }) => (
              <div style={{ gridColumn: "1/3" }}>
                <FormControlLabel
                  control={<Checkbox {...field} />}
                  label={
                    <React.Fragment>
                      He leído los <Link> términos y condiciones. </Link>
                    </React.Fragment>
                  }
                />
                {errors.terms ? (
                  <FormHelperText error>{errors.terms.message}</FormHelperText>
                ) : null}
              </div>
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
      <Alert color="warning">Created users are not persisted</Alert>
    </Stack>
  );
}
