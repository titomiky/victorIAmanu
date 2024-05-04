import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Box, Chip, Stack } from "@mui/material";

const candidatures = [
  {
    title: "Desarrollador Frontend Jr",
    company: "Open IA",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    techStack: ["JavaScript", "SCRUM", "Figma"],
  },
  {
    title: "Desarrollador Backend Sr",
    company: "Globant",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    techStack: ["Django", "Python", "REST"],
  },
  {
    title: "Desarrollador Mobile Jr",
    company: "Samsung",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    techStack: ["Flutter", "React Native", "SCRUM"],
  },
];

const CandidateHome = () => {
  return (
    <Box sx={{ padding: "16px", display: "grid", gap: "14px" }}>
      <Typography sx={{ display: "inline" }} component="h1" variant="h4">
        Tus candidaturas:
      </Typography>

      <List
        sx={{ width: "100%", maxWidth: "1400px", bgcolor: "background.paper" }}
      >
        {candidatures.map((candidature: any) => (
          <>
            <ListItem
              sx={{ display: "grid", gap: "10px" }}
              alignItems="flex-start"
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>

                <Typography component="h4" variant="h5">
                  {candidature.title}
                </Typography>
              </Box>
              <ListItemText
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {candidature.company}
                    </Typography>
                    {" - "}
                    {candidature.description}
                  </React.Fragment>
                }
              />
              <Stack direction="row" spacing={1}>
                {candidature.techStack.map((item: string, index: number) => (
                  <Chip label={item} size="small" key={index + item} />
                ))}
              </Stack>
            </ListItem>
            <Divider variant="inset" component="li" />
          </>
        ))}
      </List>
    </Box>
  );
};

export default CandidateHome;
