import type { Icon } from "@phosphor-icons/react/dist/lib/types";
import { ChartPie as ChartPieIcon } from "@phosphor-icons/react/dist/ssr/ChartPie";
import { GearSix as GearSixIcon } from "@phosphor-icons/react/dist/ssr/GearSix";
import { PlugsConnected as PlugsConnectedIcon } from "@phosphor-icons/react/dist/ssr/PlugsConnected";
import { UserCircle } from "@phosphor-icons/react";
import { UsersFour } from "@phosphor-icons/react";
import { XSquare } from "@phosphor-icons/react/dist/ssr/XSquare";
import { Briefcase } from "@phosphor-icons/react";

export const navIcons = {
  "chart-pie": ChartPieIcon,
  "gear-six": GearSixIcon,
  "plugs-connected": PlugsConnectedIcon,
  "x-square": XSquare,
  candidatures: Briefcase,
  user: UserCircle,
  users: UsersFour,
} as Record<string, Icon>;
