"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Box, Link, Stack } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import { User, UserToken } from "@/types/user";
import { getUser } from "@/lib/auth/client";
import { paths } from "@/paths";

const Completed = () => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const router = useRouter();
  const user = getUser() as UserToken;

  React.useEffect(() => {
    const token = localStorage.getItem("stoical-auth-token") as string;
    const user = jwtDecode<User>(token);

    if (user.onBoarding) {
      return router.back();
    }

    params.set("step", "3");
    router.push("?" + params.toString());
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Expected
  }, []);

  return (
    <Stack
      spacing={5}
      sx={{
        textAlign: "center",
        alignItems: "center",
        margin: "auto",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: "12px",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Typography variant="h4">¡Onboarding completado con éxito!</Typography>

        <Image
          src={"/assets/success.svg"}
          height={50}
          width={50}
          alt="Success Image"
        />
      </Box>
      <Button
        type="submit"
        variant="contained"
        LinkComponent={Link}
        href={
          user?.role === "candidate"
            ? paths.candidate.home
            : paths.dashboard.overview
        }
        sx={{ placeSelf: "center", width: "200px" }}
      >
        Ir al dashboard
      </Button>
    </Stack>
  );
};

export default Completed;
