"use client";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  ListItem,
  ListItemAvatar,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";

const text_hidden_style = {
  display: "-webkit-box",
  WebkitLineClamp: 5,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis",
};

const CandidatureItem = ({ candidature }: { candidature: any }) => {
  const [toggleInfo, setToggleInfo] = React.useState<boolean>(false);

  const handleToggleInfo = (): void => {
    setToggleInfo(!toggleInfo);
  };
  return (
    <article>
      <ListItem sx={{ display: "grid", gap: "10px" }} alignItems="flex-start">
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <ListItemAvatar>
            <Avatar
              alt={candidature.company}
              src="/static/images/avatar/1.jpg"
            />
          </ListItemAvatar>

          <Typography component="h4" variant="h5">
            {candidature.title}
          </Typography>
        </Box>
        <Box sx={{ display: "grid" }}>
          <Typography
            component="p"
            variant="body2"
            sx={toggleInfo ? {} : text_hidden_style}
          >
            <Typography component="span" variant="body2" color="text.primary">
              {candidature.company} {" - "}
            </Typography>
            {candidature.description}
          </Typography>
        </Box>
        <Stack direction="row" spacing={1}>
          {candidature.techStack.map((item: string, index: number) => (
            <Chip label={item} size="small" key={index + item} />
          ))}
        </Stack>
        <Button
          sx={{ width: "fit-content", margin: "auto" }}
          color="inherit"
          onClick={handleToggleInfo}
        >
          {toggleInfo ? "Ver menos" : "Ver más"}
        </Button>
      </ListItem>
      <Divider variant="inset" component="li" sx={{ margin: "0px" }} />
    </article>
  );
};

export default CandidatureItem;
