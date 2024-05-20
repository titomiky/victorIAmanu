import * as React from "react";
import RouterLink from "next/link";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { SignOut as SignOutIcon } from "@phosphor-icons/react/dist/ssr/SignOut";
import { User as UserIcon } from "@phosphor-icons/react/dist/ssr/User";
import { paths } from "@/paths";
import { authClient, getUser } from "@/lib/auth/client";
import { useUser } from "@/hooks/use-user";
import { UserToken } from "@/types/user";

export interface UserPopoverProps {
  anchorEl: Element | null;
  onClose: () => void;
  open: boolean;
}

export function UserPopover({
  anchorEl,
  onClose,
  open,
}: UserPopoverProps): React.JSX.Element {
  const { checkSession } = useUser();
  const user = getUser() as UserToken;

  const router = useRouter();

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
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
      onClose={onClose}
      open={open}
      slotProps={{ paper: { sx: { width: "240px" } } }}
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
      <MenuList
        disablePadding
        sx={{ p: "8px", "& .MuiMenuItem-root": { borderRadius: 1 } }}
      >
        <MenuItem
          component={RouterLink}
          href={paths.dashboard.account}
          onClick={onClose}
        >
          <ListItemIcon>
            <UserIcon fontSize="var(--icon-fontSize-md)" />
          </ListItemIcon>
          Perfil
        </MenuItem>
        <MenuItem onClick={handleSignOut}>
          <ListItemIcon>
            <SignOutIcon fontSize="var(--icon-fontSize-md)" />
          </ListItemIcon>
          Cerrar sesión
        </MenuItem>
      </MenuList>
    </Popover>
  );
}
