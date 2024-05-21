"use client";
import * as React from "react";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Unstable_Grid2";
import AccountInfo from "./account-info";
import { AccountDetailsForm } from "./account-details-form";
import { authClient, getUser } from "@/lib/auth/client";
import { Company, UserToken } from "@/types/user";

const AccountOverview = () => {
  const user = getUser() as UserToken;
  const [data, setData] = React.useState<Company>();
  const [isDataPending, setIsDataPending] = React.useState<boolean>(true);

  React.useEffect(() => {
    const getData = async () => {
      const res = (await authClient.getClientDetails(user.userId)) as Company;
      console.log(res);
      setData(res);
      setIsDataPending(false);
    };

    getData();
  }, []);

  return (
    <Stack spacing={5}>
      <Grid container spacing={3}>
        <Grid sx={{ width: "100%" }}>
          <AccountInfo />
        </Grid>
        <Grid sx={{ width: "100%" }}>
          {data && <AccountDetailsForm client={data} />}
        </Grid>
      </Grid>
    </Stack>
  );
};

export default AccountOverview;
