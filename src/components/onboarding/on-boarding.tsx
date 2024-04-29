"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Checkbox, FormControlLabel } from "@mui/material";
import { useRouter } from "next/navigation";

const steps = ["Select role", "Create user", "Finish"];

const OnBoarding = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState<{
    [k: number]: boolean;
  }>({});
  const [userRole, setUserRole] = React.useState<string>("candidate");
  const router = useRouter();

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

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
          activeStep={activeStep}
          sx={{ height: "fit-content" }}
        >
          {steps.map((label, index) => (
            <Step key={label} completed={completed[index]}>
              <StepButton color="inherit" onClick={handleStep(index)}>
                {label}
              </StepButton>
            </Step>
          ))}
        </Stepper>
        <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
          Step {activeStep + 1}
        </Typography>
      </Box>

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
          disabled={activeStep === 0}
          onClick={handleBack}
          sx={{ mr: 1 }}
        >
          Back
        </Button>
        <Box sx={{ flex: "1 1 auto" }} />
        <Button onClick={nextStepRedirect} sx={{ mr: 1 }}>
          Next
        </Button>
        {activeStep !== steps.length &&
          (completed[activeStep] ? (
            <Typography variant="caption" sx={{ display: "inline-block" }}>
              Step {activeStep + 1} already completed
            </Typography>
          ) : (
            <Button onClick={handleComplete}>
              {completedSteps() === totalSteps() - 1
                ? "Finish"
                : "Complete Step"}
            </Button>
          ))}
      </Box>
    </Box>
  );
};

export default OnBoarding;
