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
import Typography from "@mui/material/Typography";
import { Controller, useForm } from "react-hook-form";
import { z as zod } from "zod";
import { authClient } from "@/lib/auth/client";
import Image from "next/image";

const schema = zod.object({
  email: zod.string().min(1, { message: "Email requerido" }).email(),
});

type Values = zod.infer<typeof schema>;

const defaultValues = { email: "" } satisfies Values;

export function EmailLinkForm(): React.JSX.Element {
  const [isPending, setIsPending] = React.useState<boolean>(false);
  const [success, setSuccess] = React.useState<boolean>(false);

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });

  const onSubmit = React.useCallback(
    async (values: Values): Promise<void> => {
      setIsPending(true);

      const { error } = await authClient.sendRecoveryLink(values.email);

      if (error) {
        setError("root", { type: "server", message: error });
        setIsPending(false);
        return;
      }

      setSuccess(true);
      setIsPending(false);
    },
    [setError]
  );

  return (
    <Stack spacing={4}>
      {success ? (
        <>
          <Image
            src="/assets/email.svg"
            alt="Mail Image"
            width={250}
            height={400}
            style={{ margin: "auto", height: "auto", maxWidth: "100%" }}
          />

          <Alert severity="success" sx={{ placeContent: "center" }}>
            Enviamos el link de recuperación a tu correo electrónico
          </Alert>
        </>
      ) : (
        <>
          <Typography variant="h5">Cambiar contraseña</Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={4}>
              <Controller
                control={control}
                name="email"
                render={({ field }) => (
                  <FormControl error={Boolean(errors.email)}>
                    <InputLabel>Email de tu cuenta</InputLabel>
                    <OutlinedInput
                      {...field}
                      label="Email de tu cuenta"
                      type="email"
                    />
                    {errors.email ? (
                      <FormHelperText>{errors.email.message}</FormHelperText>
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
                sx={{ width: "fit-content", margin: "auto" }}
              >
                Enviar link de recuperación
              </Button>
            </Stack>
          </form>
        </>
      )}
    </Stack>
  );
}
