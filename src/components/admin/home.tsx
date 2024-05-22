import React from "react";
import StackedBar from "./stacked-bar";
import { Box, Typography } from "@mui/material";

const Home = () => {
  return (
    <Box sx={{ display: "grid", gap: "40px", marginTop: "20px" }}>
      <Typography component="h1" variant="h4">
        Estadísticas del uso de la plataforma por los clientes en un año
      </Typography>
      <StackedBar />
    </Box>
  );
};

export default Home;
