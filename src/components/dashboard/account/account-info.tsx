"use client";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { UserToken } from "@/types/user";
import { getUser } from "@/lib/auth/client";

const AccountInfo = () => {
  const user = getUser() as UserToken;

  return (
    <Card>
      <CardContent>
        <Stack spacing={2} sx={{ alignItems: "center" }}>
          <div>
            <Avatar sx={{ height: "80px", width: "80px" }} />
          </div>
          <Stack spacing={1} sx={{ textAlign: "center" }}>
            <Typography component="h2" variant="h5">
              {user.name + " " + user.surname}
            </Typography>

            <Typography component="p">{user.email}</Typography>
          </Stack>
        </Stack>
      </CardContent>
      <Divider />
      <CardActions>
        <Button sx={{ width: "fit-content", margin: "auto" }} variant="text">
          Editar avatar
        </Button>
      </CardActions>
    </Card>
  );
};

export default AccountInfo;
