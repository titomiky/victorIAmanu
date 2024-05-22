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
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { z as zod } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CompetenciesType, candidatureClient } from "@/lib/canidature/client";
import SelectCandidate from "./select-candidates";
import { useRouter } from "next/navigation";
import { paths } from "@/paths";

const CreateCandidature = () => {
  const [selectedSkills, setSelectedSkills] = React.useState<string[]>([]);
  const [skills, setSkills] = React.useState<CompetenciesType[]>();
  const [selectCandidates, setSelected] = React.useState<string[]>([]);
  const router = useRouter();

  React.useEffect(() => {
    const getSkills = async () => {
      try {
        const res = await candidatureClient.getCompetenciesList();
        setSkills(res);
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };

    getSkills();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Expected
  }, []);

  const schema = zod.object({
    name: zod
      .string()
      .min(1, { message: "El título es requerido" })
      .max(120, { message: "Excediste el máximo de caracteres permitidos" }),
    description: zod
      .string()
      .min(1, { message: "La descripción es requerida" })
      .max(3000, { message: "Excediste el máximo de caracteres permitidos" }),
    competenceIds: zod.custom<string[]>(
      () => selectedSkills.length >= 3,
      "Debes seleccionar al menos tres competencias"
    ),
    candidateIds: zod.custom<string[]>(),
  });

  type Values = zod.infer<typeof schema>;

  const defaultValues = {
    name: "",
    description: "",
    competenceIds: [],
    candidateIds: [],
  } satisfies Values;

  const [isPending, setIsPending] = React.useState<boolean>(false);

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });

  const onSubmit = async (values: Values) => {
    setIsPending(true);

    values.competenceIds = selectedSkills as string[];
    values.candidateIds = selectCandidates;
    console.log(values);
    console.log("asd");
    const { error } = await candidatureClient.createCandidature(values);

    if (error) {
      setError("root", { type: "server", message: error });
      setIsPending(false);
      return;
    }

    router.replace(paths.dashboard.candidatures);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Expected
  };

  const handleSkillChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedSkills((prevSkills: any) => {
      if (event.target.checked) {
        return [...prevSkills, event.target.value];
      } else {
        return prevSkills.filter((skill: any) => skill !== event.target.value);
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
          spacing={4}
          sx={{
            display: { xs: "flex" },
          }}
        >
          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <FormControl error={Boolean(errors.name)}>
                <InputLabel>Título</InputLabel>
                <OutlinedInput {...field} label="Título" />
                {errors.name ? (
                  <FormHelperText>{errors.name.message}</FormHelperText>
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
                  minRows={3}
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

          <FormControl error={Boolean(errors.competenceIds)}>
            <FormGroup
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
              }}
            >
              {skills?.length ? (
                skills.map((skill: CompetenciesType) => (
                  <Tooltip title={skill.description} key={skill._id}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name={skill.name}
                          onChange={handleSkillChange}
                          value={skill._id}
                        />
                      }
                      label={skill.name}
                    />
                  </Tooltip>
                ))
              ) : (
                <span style={{ opacity: "0.7" }}>
                  No hay competencias disponibles por el momento ...
                </span>
              )}
            </FormGroup>
            {errors.competenceIds ? (
              <FormHelperText>{errors.competenceIds.message}</FormHelperText>
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

          <SelectCandidate setSelected={setSelected} />

          {errors.root ? (
            <Alert color="error" severity="error">
              {errors.root.message}
            </Alert>
          ) : null}
          <Button
            disabled={isPending}
            type="submit"
            variant="contained"
            sx={{
              placeSelf: "center",
              gridColumn: "1/3",
              width: "200px",
              marginTop: "14px",
            }}
          >
            Continuar
          </Button>
        </Stack>
      </form>
    </Stack>
  );
};
export default CreateCandidature;
