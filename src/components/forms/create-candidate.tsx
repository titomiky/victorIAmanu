"use client";
import {
  Alert,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  Stack,
} from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { z as zod } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNextStep } from "@/hooks/use-nextstep";
import { authClient } from "@/lib/auth/client";

const schema = zod.object({
  name: zod.string().min(1, { message: "El nombre es requerido" }),
  surname: zod.string().min(1, { message: "El apellido es requerido" }),
  phoneNumber: zod.string().min(1, { message: "El teléfono es requerido" }),
  currentSalary: zod.string().min(1, { message: "Salario requerido" }),
  desiredSalary: zod.string().min(1, { message: "Salario requerido" }),
  birthDate: zod.string().min(1, { message: "Fecha de nacimiento requerido" }),
  cvPdf: zod
    .object({
      file: zod
        .any()
        .refine((files) => files?.length == 1, "File is required."),
    })
    .or(zod.string()),
});

type Values = zod.infer<typeof schema>;

const defaultValues = {
  name: "Test",
  surname: "test",
  phoneNumber: "+45616154",
  currentSalary: "120",
  desiredSalary: "500",
  birthDate: "",
  cvPdf: "",
} satisfies Values;

const CreateCandidateForm = () => {
  const { handleNextStep } = useNextStep();
  const [isPending, setIsPending] = React.useState<boolean>(false);
  let file = { file: {} };

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });

  const onSubmit = React.useCallback(async (values: Values) => {
    values.cvPdf = file;
    setIsPending(true);

    const { error } = await authClient.createCandidate(values);

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
            name="currentSalary"
            render={({ field }) => (
              <FormControl error={Boolean(errors.currentSalary)}>
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
              <FormControl error={Boolean(errors.desiredSalary)}>
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
              <FormControl error={Boolean(errors.birthDate)}>
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
            name="cvPdf"
            render={({ field }) => (
              <FormControl error={Boolean(errors.cvPdf)}>
                <InputLabel shrink={true}>Curriculum</InputLabel>
                <OutlinedInput
                  label="Curriculum"
                  inputProps={{ accept: ".xlsx, .xls, .pdf" }}
                  {...field}
                  onChange={(e: any) => (file = e.target.files[0])}
                  type="file"
                  notched={true}
                />
                {errors.cvPdf ? (
                  <FormHelperText>{errors.cvPdf.message}</FormHelperText>
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

export default CreateCandidateForm;
