"use client";
import {
  Box,
  Button,
  Step,
  StepButton,
  Stepper,
  Typography,
} from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import * as React from "react";
import { StepsRouter } from "./steps";

interface LayoutProps {
  children: React.ReactNode;
}

const steps = ["Seleccionar Rol", "Crear usuario", "Final"];

export default function Layout({ children }: LayoutProps): React.JSX.Element {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentStep = Number(searchParams.get("step")) ?? 1;

  const handleNextStep = () => {
    router.push(StepsRouter.candidate[`${(currentStep + 1) as 1 | 2 | 3}`]);
  };

  const handlePrevStep = () => {
    router.push(StepsRouter.candidate[`${(currentStep - 1) as 1 | 2 | 3}`]);
  };

  return (
    <main>
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
            activeStep={currentStep - 1}
            sx={{ height: "fit-content" }}
          >
            {steps.map((label, index) => (
              <Step key={label} completed={index < currentStep - 1}>
                <StepButton color="inherit">{label}</StepButton>
              </Step>
            ))}
          </Stepper>
          <Typography sx={{ mt: 2, mb: 1, py: 1, paddingInline: "10px" }}>
            Paso {currentStep}
          </Typography>
        </Box>

        {children}

        <Button
          onClick={handleNextStep}
          sx={{
            mr: 1,
            width: "200px",
            margin: "auto",
            display: currentStep === 2 ? "none" : "flex",
          }}
          type="submit"
          variant="contained"
        >
          Continuar
        </Button>
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
            disabled={currentStep === 1}
            onClick={handlePrevStep}
            sx={{ mr: 1 }}
          >
            Volver al paso anterior
          </Button>
          <Box sx={{ flex: "1 1 auto" }} />
        </Box>
      </Box>
    </main>
  );
}
