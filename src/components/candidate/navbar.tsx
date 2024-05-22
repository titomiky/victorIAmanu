"use client";
import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
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
import { authClient, getUser } from "@/lib/auth/client";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/use-user";
import { UserToken } from "@/types/user";

const NavBar = () => {
  const user = getUser() as UserToken;
  const { checkSession } = useUser();
  const router = useRouter();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSignOut = React.useCallback(async (): Promise<void> => {
    try {
      const { error } = await authClient.signOut();

      if (error) {
        console.log("Sign out error", error);
        return;
      }

      await checkSession?.();

      router.replace(paths.auth.signIn);
    } catch (err) {
      console.log("Sign out error", err);
    }
  }, [checkSession, router]);

  return (
    <Box component={"header"}>
      <AppBar
        sx={{
          position: "relative",
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

          <MenuItem
            onClick={handleCloseUserMenu}
            component={RouterLink}
            href={paths.candidate.home}
          >
            <Typography textAlign="center">Inicio</Typography>
          </MenuItem>

          <Box sx={{ flexGrow: 0, marginLeft: "10px" }}>
            <Tooltip title="Ajustes">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar />
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
              <Box sx={{ p: "16px 20px " }}>
                <Typography variant="subtitle1">
                  {user?.name && user?.name + " " + user?.surname}
                </Typography>
                <Typography color="text.secondary" variant="body2">
                  {user?.email && user?.email}
                </Typography>
              </Box>
              <Divider />

              <MenuItem
                onClick={handleCloseUserMenu}
                component={RouterLink}
                href={paths.candidate.overview}
              >
                <Typography textAlign="center">Estadísticas</Typography>
              </MenuItem>

              <Divider />

              <MenuItem onClick={handleSignOut}>
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
