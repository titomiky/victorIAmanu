import * as React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { ArrowLeft as ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr/ArrowLeft";

import { config } from "@/config";
import { paths } from "@/paths";

export const metadata = {
  title: `Error | ${config.site.name}`,
} satisfies Metadata;

export default function NotFound(): React.JSX.Element {
  return (
    <Box
      component="main"
      sx={{
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
        minHeight: "100%",
      }}
    >
      <Stack spacing={3} sx={{ alignItems: "center", maxWidth: "md" }}>
        <Box>
          <Box
            component="img"
            alt="Under development"
            src="/assets/error-404.svg"
            sx={{
              display: "inline-block",
              height: "auto",
              maxWidth: "100%",
              width: "400px",
            }}
          />
        </Box>
        <Typography variant="h3" sx={{ textAlign: "center" }}>
          404: La página que estás buscando no está aquí
        </Typography>
        <Typography
          color="text.secondary"
          variant="body1"
          sx={{ textAlign: "center" }}
        >
          O ingresaste una ruta errónea o viniste aquí por error. Sea cual sea,
          intenta utilizar la navegación
        </Typography>
        <Button
          component={Link}
          href={paths.auth.signIn}
          startIcon={<ArrowLeftIcon fontSize="var(--icon-fontSize-md)" />}
          variant="contained"
        >
          Volver al inicio
        </Button>
      </Stack>
    </Box>
  );
}
