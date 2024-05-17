import React from "react";
import RouterLink from "next/link";
import Box from "@mui/material/Box";
import { paths } from "@/paths";
import { DynamicLogo } from "@/components/core/logo";
import { Card } from "@mui/material";

export interface LayoutProps {
  children: React.ReactNode;
}

const CardLayout = ({ children }: LayoutProps) => {
  return (
    <Box
      sx={{
        display: { xs: "flex" },
        flexDirection: "column",
        minHeight: "100%",
      }}
    >
      <Box sx={{ display: "flex", flex: "1 1 auto", flexDirection: "column" }}>
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
          }}
        >
          <Card sx={{ maxWidth: "700px", width: "100%", p: 5 }}>
            {children}
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default CardLayout;
