"use client";
import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { config } from "@/config";
import {
  Avatar,
  Divider,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import RouterLink from "next/link";
import { paths } from "@/paths";

const NavBar = () => {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <Box component={"header"}>
      <AppBar
        sx={{
          "--SideNav-background": "var(--mui-palette-neutral-950)",
          "--SideNav-color": "var(--mui-palette-common-white)",
          "--NavItem-color": "var(--mui-palette-neutral-300)",
          "--NavItem-hover-background": "rgba(255, 255, 255, 0.04)",
          "--NavItem-active-background": "var(--mui-palette-primary-main)",
          "--NavItem-active-color": "var(--mui-palette-primary-contrastText)",
          "--NavItem-disabled-color": "var(--mui-palette-neutral-500)",
          "--NavItem-icon-color": "var(--mui-palette-neutral-400)",
          "--NavItem-icon-active-color":
            "var(--mui-palette-primary-contrastText)",
          "--NavItem-icon-disabled-color": "var(--mui-palette-neutral-600)",
          bgcolor: "var(--SideNav-background)",
          color: "var(--SideNav-color)",
        }}
      >
        <Toolbar>
          <Link
            href={paths.candidate.home}
            variant="h5"
            component={RouterLink}
            sx={{ flexGrow: 1, color: "var(--SideNav-color)" }}
            underline="none"
          >
            {config.site.name}
          </Link>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Ajustes">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar src="/assets/avatar.png" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem
                onClick={handleCloseUserMenu}
                component={RouterLink}
                href={paths.candidate.overview}
              >
                <Typography textAlign="center">Estadísticas</Typography>
              </MenuItem>

              <Divider />

              <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center">Cerrar sesión</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
