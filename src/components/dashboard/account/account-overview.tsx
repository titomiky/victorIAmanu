"use client";
import * as React from "react";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Unstable_Grid2";
import AccountInfo from "./account-info";
import { AccountDetailsForm } from "./account-details-form";
import { authClient, getUser } from "@/lib/auth/client";
import { Company, UserToken } from "@/types/user";
import Loading from "@/components/core/loading";
import { Box } from "@mui/material";

const AccountOverview = () => {
  const user = getUser() as UserToken;
  const [data, setData] = React.useState<Company>();
  const [isDataPending, setIsDataPending] = React.useState<boolean>(true);

  React.useEffect(() => {
    const getData = async () => {
      const res = (await authClient.getClientDetails(user.userId)) as Company;
      setData(res);
      setIsDataPending(false);
    };

    getData();

    // eslint-disable-next-line react-hooks/exhaustive-deps -- Expected
  }, []);

  return (
    <Stack spacing={5}>
      <Grid container spacing={3}>
        <Grid sx={{ width: "100%" }}>
          <AccountInfo />
        </Grid>
        <Grid sx={{ width: "100%" }}>
          {isDataPending ? (
            <Box sx={{ display: "flex", margin: "auto" }}>
              <Loading variable={isDataPending} />
            </Box>
          ) : (
            data && <AccountDetailsForm client={data} />
          )}
        </Grid>
      </Grid>
    </Stack>
  );
};

export default AccountOverview;
