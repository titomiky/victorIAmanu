import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { Metadata } from "next";
import { config } from "@/config";

export const metadata = {
  title: `About | ${config.site.name}`,
} satisfies Metadata;

const Page = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "grid",
        placeContent: "center",
      }}
    >
      <Typography
        component="h2"
        variant="h6"
        sx={{ position: "absolute", left: "16px", top: "16px" }}
      >
        Ir al inicio
      </Typography>
      <Card sx={{ minWidth: "300px" }}>
        <CardMedia
          sx={{ height: 300 }}
          image="/assets/developer-avatar.jpeg"
          title="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Manuel Andaluz
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Full Stack Developer
          </Typography>
        </CardContent>
        <CardActions></CardActions>
      </Card>
    </Box>
  );
};

export default Page;
