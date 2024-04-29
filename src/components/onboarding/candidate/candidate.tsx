"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CreateCandidate from "@/components/dashboard/candidates/add/create-candidate";
import { useRouter, useSearchParams } from "next/navigation";

const Candidate = () => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const router = useRouter();

  React.useEffect(() => {
    params.set("step", "2");
    router.push("?" + params.toString());
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Expected
  }, []);

  return (
    <Box sx={{ display: "grid", gap: "12px", justifyItems: "center" }}>
      <Typography variant="h4">Registro de candidato</Typography>

      <Box sx={{ display: "flex", gap: "12px" }}>
        <CreateCandidate withTitle={false} />
      </Box>
    </Box>
  );
};

export default Candidate;
