"use client";
import {
  Alert,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { z as zod } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { candidatureClient } from "@/lib/canidature/client";

const skills = [
  "TypeScript",
  "Python",
  "Next.js",
  "Django",
  "Docker",
  "React",
  "Node.js",
  "SCRUM",
  "Git",
];

const CreateCandidature = () => {
  const [selectedSkills, setSelectedSkills] = React.useState<string[]>([]);
  const [skills, setSkills] = React.useState<[]>();

  React.useEffect(() => {
    const getSkills = async () => {
      try {
        const res = await candidatureClient.getCompetenciesList();
        console.log(res);
        setSkills(res);
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };

    getSkills();
  }, []);

  const schema = zod.object({
    title: zod.string().min(1, { message: "El título es requerido" }),
    description: zod
      .string()
      .min(1, { message: "La descripción es requerida" }),
    skills: zod.custom<string[]>(
      () => selectedSkills.length >= 3,
      "Debes seleccionar al menos tres competencias"
    ),
  });

  type Values = zod.infer<typeof schema>;

  const defaultValues = {
    title: "",
    description: "",
    skills: selectedSkills,
  } satisfies Values;

  const [isPending, setIsPending] = React.useState<boolean>(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });

  const onSubmit = () => {}; // api request to create a new candidature

  const handleSkillChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedSkills((prevSkills) => {
      if (event.target.checked) {
        return [...prevSkills, event.target.name];
      } else {
        return prevSkills.filter((skill) => skill !== event.target.name);
      }
    });
  };

  return (
    <Stack spacing={3}>
      <Stack spacing={1}>
        <Typography variant="h4">Crear candidatura</Typography>
      </Stack>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack
          spacing={2}
          sx={{
            display: { xs: "flex" },
          }}
        >
          <Controller
            control={control}
            name="title"
            render={({ field }) => (
              <FormControl error={Boolean(errors.title)}>
                <InputLabel>Título</InputLabel>
                <OutlinedInput {...field} label="Título" />
                {errors.title ? (
                  <FormHelperText>{errors.title.message}</FormHelperText>
                ) : null}
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="description"
            render={({ field }) => (
              <FormControl error={Boolean(errors.description)}>
                <InputLabel>Descripción</InputLabel>
                <OutlinedInput
                  multiline
                  minRows={2}
                  {...field}
                  label="Descripción"
                />
                {errors.description ? (
                  <FormHelperText>{errors.description.message}</FormHelperText>
                ) : null}
              </FormControl>
            )}
          />

          <FormLabel component="legend">Selecionar Competencias</FormLabel>

          <FormControl error={Boolean(errors.skills)}>
            <FormGroup
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
              }}
            >
              {skills?.length ? (
                skills.map((skill: string) => (
                  <FormControlLabel
                    key={skill}
                    control={
                      <Checkbox name={skill} onChange={handleSkillChange} />
                    }
                    label={skill}
                  />
                ))
              ) : (
                <span style={{ opacity: "0.7" }}>
                  No hay competencias disponibles por el momento ...
                </span>
              )}
            </FormGroup>
            {errors.skills ? (
              <FormHelperText>{errors.skills.message}</FormHelperText>
            ) : null}
          </FormControl>

          {/*  <Controller
            control={control}
            name="skills"
            render={({ field }) => (
              <FormControl error={Boolean(errors.skills)}>
                {skills.map((skill: string) => (
                  <FormControlLabel
                    key={skill}
                    control={
                      <Checkbox name={skill} onChange={handleSkillChange} />
                    }
                    label={skill}
                  />
                ))}
                {errors.skills ? (
                  <FormHelperText>{errors.skills.message}</FormHelperText>
                ) : null}
              </FormControl>
            )}
          /> */}

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

export default CreateCandidature;
