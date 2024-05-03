"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useRouter, useSearchParams } from "next/navigation";
import CreateCandidateForm from "@/components/forms/create-candidate";

const Candidate = () => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const router = useRouter();

  React.useEffect(() => {
    params.set("step", "2");
    router.push("?" + params.toString());
    console.log(searchParams.get("step"));
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Expected
  }, [searchParams, router]);

  return (
    <Box sx={{ display: "grid", gap: "12px", justifyItems: "center" }}>
      <Typography variant="h4">Registro de candidato</Typography>

      <Box sx={{ display: "flex", gap: "12px" }}>
        <CreateCandidateForm />
      </Box>
    </Box>
  );
};

export default Candidate;
