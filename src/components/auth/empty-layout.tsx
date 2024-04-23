import * as React from "react";
import RouterLink from "next/link";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { paths } from "@/paths";
import { DynamicLogo } from "@/components/core/logo";

export interface LayoutProps {
  children: React.ReactNode;
}

function EmptyLayout({ children }: LayoutProps): React.JSX.Element {
  return (
    <Box
      sx={{
        display: { xs: "flex" },
        flexDirection: "column",
        gridTemplateColumns: "1fr 1fr",
        minHeight: "100%",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Box sx={{ p: 3 }}>
          <Box
            component={RouterLink}
            href={paths.home}
            sx={{ display: "inline-block", fontSize: 0 }}
          >
            <DynamicLogo
              colorDark="light"
              colorLight="dark"
              height={32}
              width={122}
            />
          </Box>
        </Box>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flex: "1 1 auto",
            justifyContent: "center",
            p: 3,
          }}
        >
          <Box sx={{ maxWidth: "1200px", width: "100%" }}>{children}</Box>
        </Box>
      </Box>
    </Box>
  );
}

export default EmptyLayout;
