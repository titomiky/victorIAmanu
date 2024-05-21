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
import { Eye as EyeIcon } from "@phosphor-icons/react/dist/ssr/Eye";
import { EyeSlash as EyeSlashIcon } from "@phosphor-icons/react/dist/ssr/EyeSlash";
import Image from "next/image";
import RouterLink from "next/link";
import { paths } from "@/paths";

const schema = zod.object({
  password: zod
    .string()
    .min(6, { message: "La contraseña debe contener al menos 6 caracteres" }),
  confirmPassword: zod
    .string()
    .min(6, { message: "La contraseña debe contener al menos 6 caracteres" }),
});

type Values = zod.infer<typeof schema>;

const defaultValues = { password: "", confirmPassword: "" } satisfies Values;

export function ResetPasswordForm({
  userId,
}: {
  userId: string;
}): React.JSX.Element {
  const [isPending, setIsPending] = React.useState<boolean>(false);
  const [showPassword, setShowPassword] = React.useState<boolean>();
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

      if (values.password !== values.confirmPassword) {
        setError("root", {
          type: "client",
          message: "Las contraseñas deben ser iguales",
        });
      }

      const { error } = await authClient.resetPassword(values.password, userId);

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
            src="/assets/done.svg"
            alt="Success Image"
            width={250}
            height={400}
            style={{ margin: "auto", height: "auto", maxWidth: "100%" }}
          />

          <Alert severity="success" sx={{ placeContent: "center" }}>
            Cambiaste tu contraseña con éxito
          </Alert>
          <Button LinkComponent={RouterLink} href={paths.auth.signIn}>
            Ir al inicio
          </Button>
        </>
      ) : (
        <>
          <Typography variant="h5">Nueva contraseña</Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
              <Controller
                control={control}
                name="password"
                render={({ field }) => (
                  <FormControl error={Boolean(errors.password)}>
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
                name="confirmPassword"
                render={({ field }) => (
                  <FormControl error={Boolean(errors.confirmPassword)}>
                    <InputLabel>Repetir la Contraseña</InputLabel>
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
                      label="Repetir la Contraseña"
                      type={showPassword ? "text" : "password"}
                    />
                    {errors.confirmPassword ? (
                      <FormHelperText>
                        {errors.confirmPassword.message}
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
              <Button disabled={isPending} type="submit" variant="contained">
                Continuar
              </Button>
            </Stack>
          </form>
        </>
      )}
    </Stack>
  );
}
