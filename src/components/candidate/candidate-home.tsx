"use client";
import * as React from "react";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import CandidatureItem from "./candidature-item";
import { CandidateOffer, candidateClient } from "@/lib/candidates/client";

const CandidateHome = () => {
  const [data, setData] = React.useState<CandidateOffer[]>([]);

  React.useEffect(() => {
    const getData = async () => {
      const res = await candidateClient.getCandidateOffers();

      if (Array.isArray(res)) {
        setData(res);
        return;
      }
    };

    getData();
  }, []);

  return (
    <Box sx={{ padding: "16px", display: "grid", gap: "30px" }}>
      <Typography sx={{ display: "inline" }} component="h1" variant="h4">
        Tus candidaturas:
      </Typography>

      <List
        sx={{
          width: "100%",
          bgcolor: "background.paper",
        }}
      >
        {data.length > 0 &&
          data.map((candidature: CandidateOffer, index: number) => (
            <CandidatureItem candidature={candidature} key={index} />
          ))}
      </List>
    </Box>
  );
};

export default CandidateHome;
