"use client";
import * as React from "react";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import CandidatureItem from "./candidature-item";
import { CandidateOffer, candidateClient } from "@/lib/candidates/client";
import Image from "next/image";

const CandidateHome = () => {
  const [data, setData] = React.useState<CandidateOffer[]>([]);

  React.useEffect(() => {
    const getData = async () => {
      const res = await candidateClient.getCandidateOffers();
      console.log(res);

      if (Array.isArray(res)) {
        setData(res);
        return;
      }
    };

    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Expected
  }, []);

  return (
    <Box sx={{ padding: "16px", display: "grid", gap: "30px" }}>
      {data.length > 0 ? (
        <>
          <Typography sx={{ display: "inline" }} component="h1" variant="h4">
            Tus candidaturas:
          </Typography>

          <List
            sx={{
              width: "100%",
              bgcolor: "background.paper",
            }}
          >
            {data.map((candidature: CandidateOffer, index: number) => (
              <CandidatureItem candidature={candidature} key={index} />
            ))}
          </List>
        </>
      ) : (
        <Box
          sx={{
            display: "grid",
            placeContent: "center",
            minHeight: "calc(80vh - 70px)",
            textAlign: "center",
            gap: "16px",
          }}
        >
          <Typography sx={{ display: "inline" }} component="h1" variant="h4">
            Por el momento no perteneces a ninguna candidatura ...{" "}
          </Typography>

          <Image
            src={"/assets/undraw_empty.svg"}
            alt="Image"
            width={500}
            height={500}
            style={{ maxWidth: "100%", margin: "auto" }}
          />
        </Box>
      )}
    </Box>
  );
};

export default CandidateHome;
