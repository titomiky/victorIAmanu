"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Grid from "@mui/material/Unstable_Grid2";
import { getUser } from "@/lib/auth/client";
import { UserToken } from "@/types/user";
import { z as zod } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = zod.object({
  name: zod.string().min(1, { message: "El nombre es requerido" }),
  surname: zod.string().min(1, { message: "El apellido es requerido" }),
  position: zod.string().min(1, { message: "El cargo es requerido" }),
  phoneNumber: zod.string().min(1, { message: "El teléfono es requerido" }),
  companyName: zod
    .string()
    .min(1, { message: "El nombre de la empresa es requerido" }),
  companyNIF: zod.string().min(1, { message: "El companyNIF es requerido" }),
  numberOfEmployees: zod
    .string()
    .min(1, { message: "El número de empleados es requerido" }),
  companyAddress: zod.string().min(1, { message: "Campo requerido" }),
});

type Values = zod.infer<typeof schema>;

export function AccountDetailsForm(): React.JSX.Element {
  const user = getUser() as UserToken;

  const defaultValues = {
    name: user.name,
    surname: user.surname,
    position: "",
    phoneNumber: "",
    companyAddress: "",
    companyName: "",
    companyNIF: "",
    numberOfEmployees: "",
  } satisfies Values;

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <Card>
        <CardHeader subheader="" title="Datos editables de la cuenta" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid md={6} xs={12}>
              <Controller
                control={control}
                name="name"
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel>Nombre</InputLabel>
                    <OutlinedInput
                      {...field}
                      defaultValue={user.name}
                      label="Nombre"
                    />
                  </FormControl>
                )}
              />
            </Grid>
            <Grid md={6} xs={12}>
              <Controller
                name="surname"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel>Apellido</InputLabel>
                    <OutlinedInput
                      {...field}
                      defaultValue={user.surname}
                      label="Apellido"
                    />
                  </FormControl>
                )}
              />
            </Grid>
            <Grid md={6} xs={12}>
              <Controller
                control={control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormControl fullWidth required>
                    <InputLabel>Teléfono</InputLabel>
                    <OutlinedInput {...field} label="Teléfono" />
                  </FormControl>
                )}
              />
            </Grid>
            <Grid md={6} xs={12}>
              <Controller
                control={control}
                name="companyName"
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel>Nombre de la empresa</InputLabel>
                    <OutlinedInput {...field} label="Nombre de la empresa" />
                  </FormControl>
                )}
              />
            </Grid>

            <Grid md={6} xs={12}>
              <Controller
                control={control}
                name="companyNIF"
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel>NIF</InputLabel>
                    <OutlinedInput {...field} label="NIF" />
                  </FormControl>
                )}
              />
            </Grid>

            <Grid md={6} xs={12}>
              <Controller
                control={control}
                name="position"
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel>Position</InputLabel>
                    <OutlinedInput {...field} label="Position" />
                  </FormControl>
                )}
              />
            </Grid>

            <Grid md={6} xs={12}>
              <Controller
                control={control}
                name="numberOfEmployees"
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel>Número de empleados</InputLabel>
                    <OutlinedInput {...field} label="Número de empleados" />
                  </FormControl>
                )}
              />
            </Grid>

            <Grid md={6} xs={12}>
              <Controller
                control={control}
                name="companyAddress"
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel>Dirección de la empresa</InputLabel>
                    <OutlinedInput {...field} label="Dirección de la empresa" />
                  </FormControl>
                )}
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Button variant="contained">Guardar cambios</Button>
        </CardActions>
      </Card>
    </form>
  );
}
