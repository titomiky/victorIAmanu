"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";
import Image from "next/image";

const steps = ["Select role", "Create user", "Finish"];
const current_step = 2 as number;

const Completed = () => {
  const [userRole, setUserRole] = React.useState<string>("candidate");
  const router = useRouter();

  const handleChangeBox = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserRole(event.target.name);
  };

  const nextStepRedirect = () => {
    router.push(`/onboarding/${userRole}`);
  };

  return (
    <Box
      sx={{
        width: "100%",
        padding: "16px",
        minHeight: "100vh",
        display: "grid",
      }}
    >
      <Box>
        <Stepper
          nonLinear
          activeStep={current_step}
          sx={{ height: "fit-content" }}
        >
          {steps.map((label, index) => (
            <Step key={label} completed={index < current_step}>
              <StepButton color="inherit">{label}</StepButton>
            </Step>
          ))}
        </Stepper>
        <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
          Step {current_step + 1}
        </Typography>
      </Box>

      <Box sx={{ display: "grid", gap: "12px", justifyItems: "center" }}>
        <Box
          sx={{
            display: "flex",
            gap: "12px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h4">
            Onboarding completado con exito !!
          </Typography>

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
          sx={{ height: "fit-content" }}
        >
          Continuar
        </Button>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          pt: 2,
          height: "fit-content",
          alignSelf: "self-end",
        }}
      >
        <Button
          color="inherit"
          disabled={current_step === 0}
          onClick={() => router.back()}
          sx={{ mr: 1 }}
        >
          Back
        </Button>
        <Box sx={{ flex: "1 1 auto" }} />
        <Button onClick={nextStepRedirect} sx={{ mr: 1 }}>
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default Completed;
