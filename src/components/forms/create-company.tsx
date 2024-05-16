"use client";
import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Stack from "@mui/material/Stack";
import { Controller, useForm } from "react-hook-form";
import { z as zod } from "zod";
import { authClient } from "@/lib/auth/client";
import { useNextStep } from "@/hooks/use-nextstep";

const schema = zod.object({
  name: zod.string().min(1, { message: "El nombre es requerido" }),
  surname: zod.string().min(1, { message: "El apellido es requerido" }),
  phoneNumber: zod.string().min(1, { message: "El teléfono es requerido" }),
  email: zod.string().min(1, { message: "El email es requerido" }).email(),
  position: zod.string().min(1, { message: "El cargo es requerido" }),
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

const defaultValues = {
  name: "",
  surname: "",
  phoneNumber: "",
  email: "",
  position: "",
  companyName: "",
  companyNIF: "",
  numberOfEmployees: "",
  companyAddress: "",
} satisfies Values;

const CreateCompanyForm = () => {
  const { handleNextStep } = useNextStep();

  const [isPending, setIsPending] = React.useState<boolean>(false);

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });

  const onSubmit = React.useCallback(async (values: Values): Promise<void> => {
    setIsPending(true);

    const { error } = await authClient.createCompany(values);

    if (error) {
      setError("root", { type: "server", message: error });
      setIsPending(false);
      return;
    }

    handleNextStep();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Expected
  }, []);

  return (
    <Stack spacing={3}>
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
            name="name"
            render={({ field }) => (
              <FormControl error={Boolean(errors.name)}>
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
              <FormControl error={Boolean(errors.surname)}>
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
              <FormControl error={Boolean(errors.phoneNumber)}>
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
            name="position"
            render={({ field }) => (
              <FormControl error={Boolean(errors.position)}>
                <InputLabel>Cargo</InputLabel>
                <OutlinedInput {...field} label="Cargo" type="text" />
                {errors.position ? (
                  <FormHelperText>{errors.position.message}</FormHelperText>
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
            name="companyAddress"
            render={({ field }) => (
              <FormControl error={Boolean(errors.companyAddress)}>
                <InputLabel>Dirección de la empresa</InputLabel>
                <OutlinedInput
                  {...field}
                  label="Dirección de la empresa"
                  type="text"
                />
                {errors.companyAddress ? (
                  <FormHelperText>
                    {errors.companyAddress.message}
                  </FormHelperText>
                ) : null}
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="companyNIF"
            render={({ field }) => (
              <FormControl error={Boolean(errors.companyNIF)}>
                <InputLabel>companyNIF</InputLabel>
                <OutlinedInput {...field} label="companyNIF" type="text" />
                {errors.companyNIF ? (
                  <FormHelperText>{errors.companyNIF.message}</FormHelperText>
                ) : null}
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="numberOfEmployees"
            render={({ field }) => (
              <FormControl error={Boolean(errors.numberOfEmployees)}>
                <InputLabel>Número de empleados</InputLabel>
                <OutlinedInput
                  {...field}
                  label="Número de empleados"
                  type="number"
                />
                {errors.numberOfEmployees ? (
                  <FormHelperText>
                    {errors.numberOfEmployees.message}
                  </FormHelperText>
                ) : null}
              </FormControl>
            )}
          />
          {errors.root ? (
            <Alert color="error" severity="error">
              {errors.root.message}
            </Alert>
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

export default CreateCompanyForm;
