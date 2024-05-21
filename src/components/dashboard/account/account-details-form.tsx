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
import { authClient, getUser } from "@/lib/auth/client";
import { Company, UserToken } from "@/types/user";
import { z as zod } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert } from "@mui/material";
import { useRouter } from "next/navigation";

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

export function AccountDetailsForm({
  client,
}: {
  client: Company;
}): React.JSX.Element {
  const [isPending, setIsPending] = React.useState<boolean>(false);
  const router = useRouter();

  const defaultValues = {
    name: client.name,
    surname: client.surname ?? "",
    position: client.position ?? "",
    phoneNumber: client.phoneNumber ?? "",
    companyAddress: client.companyAddress ?? "",
    companyName: client.companyName ?? "",
    companyNIF: client.companyNIF ?? "",
    numberOfEmployees: client.numberOfEmployees.toString() ?? "",
  } satisfies Values;

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });

  const onSubmit = React.useCallback(async (values: Values): Promise<void> => {
    console.log(values);
    setIsPending(true);

    const { error } = await authClient.editClientDetails(values);

    if (error) {
      setError("root", { type: "server", message: error });
      setIsPending(false);
      return;
    }

    router.refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Expected
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
                    <OutlinedInput {...field} label="Nombre" />
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
                    <OutlinedInput {...field} label="Apellido" />
                  </FormControl>
                )}
              />
            </Grid>
            <Grid md={6} xs={12}>
              <Controller
                control={control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormControl fullWidth>
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
        <CardActions sx={{ justifyContent: "flex-end", padding: "10px" }}>
          {errors.root ? (
            <Alert color="error" severity="error">
              {errors.root.message}
            </Alert>
          ) : null}

          <Button variant="contained" disabled={isPending} type="submit">
            Guardar cambios
          </Button>
        </CardActions>
      </Card>
    </form>
  );
}
