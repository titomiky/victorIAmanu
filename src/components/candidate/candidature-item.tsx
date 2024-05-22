"use client";
import { CandidateOffer } from "@/lib/candidates/client";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  Link,
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

const CandidatureItem = ({ candidature }: { candidature: CandidateOffer }) => {
  const [toggleInfo, setToggleInfo] = React.useState<boolean>(true);

  const handleToggleInfo = (): void => {
    setToggleInfo(!toggleInfo);
  };

  return (
    <article>
      <ListItem sx={{ display: "grid", gap: "26px" }} alignItems="flex-start">
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <ListItemAvatar sx={{ margin: "auto 0" }}>
            <Avatar
              alt={candidature.clientUserName}
              src="/static/images/avatar/1.jpg"
              sx={{ bgcolor: "var(--mui-palette-primary-main)" }}
            />
          </ListItemAvatar>

          <Typography component="h4" variant="h5">
            {candidature.clientUserName + " - " + candidature.name}
          </Typography>
        </Box>
        <Box sx={{ display: "grid" }}>
          <Typography component="p" lineHeight={1.8}>
            {candidature.description}
          </Typography>
        </Box>
        <Stack direction="row" spacing={1}>
          {candidature.competencesNames.length > 0 &&
            candidature.competencesNames.map((item: string, index: number) => (
              <Chip label={item} key={index + item} />
            ))}
        </Stack>

        {candidature.linkToSession ? (
          <Alert
            severity="info"
            sx={{ width: "fit-content" }}
            variant="outlined"
          >
            Link de la prueba :{" "}
            <Link component={"a"} href="#">
              http://localhost:3000/candidate/home
            </Link>{" "}
            ( Con este link podrás rendir la prueba que la empresa género para
            ti )
          </Alert>
        ) : (
          <Alert
            severity="info"
            sx={{ width: "fit-content" }}
            variant="outlined"
          >
            Todavía no cuentas con un link de prueba
          </Alert>
        )}

        <Button
          sx={{ width: "fit-content", margin: "auto" }}
          color="inherit"
          onClick={handleToggleInfo}
        ></Button>
      </ListItem>
      <Divider variant="inset" component="li" sx={{ margin: "0px" }} />
    </article>
  );
};

export default CandidatureItem;
