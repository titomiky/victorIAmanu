"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Checkbox, FormControlLabel } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";

const OnBoarding = () => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const [userRole, setUserRole] = React.useState<string>("candidate");
  const router = useRouter();

  const handleChangeBox = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserRole(event.target.name);
  };

  const nextStepRedirect = () => {
    router.push(`/onboarding/${userRole}`);
  };

  React.useEffect(() => {
    params.set("step", "1");
    router.push("?" + params.toString());
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Expected
  }, []);

  return (
    <Box sx={{ display: "grid", gap: "12px", justifyItems: "center" }}>
      <Typography variant="h4">Bienvenido a nuestro Onboarding</Typography>

      <Typography variant="h5">¿Que tipo de usuario quieres ser?</Typography>

      <Box sx={{ display: "flex", gap: "12px" }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={userRole === "company"}
              name={"company"}
              onChange={handleChangeBox}
            />
          }
          label={"Empresa"}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={userRole === "candidate"}
              name={"candidate"}
              onChange={handleChangeBox}
            />
          }
          label={"Candidato"}
        />
      </Box>
    </Box>
  );
};

export default OnBoarding;
