"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Box } from "@mui/material";

const Completed = () => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const router = useRouter();

  React.useEffect(() => {
    params.set("step", "3");
    router.push("?" + params.toString());
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Expected
  }, []);

  return (
    <Box sx={{ display: "grid", gap: "12px", justifyItems: "center" }}>
      <Box
        sx={{
          display: "flex",
          gap: "12px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h4">Onboarding completado con exito !!</Typography>

        <Image
          src={"/assets/success.svg"}
          height={50}
          width={50}
          alt="Success Image"
        />
      </Box>
      <Button type="submit" variant="contained" sx={{ height: "fit-content" }}>
        Continuar
      </Button>
    </Box>
  );
};

export default Completed;
