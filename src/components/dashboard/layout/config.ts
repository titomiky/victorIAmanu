import type { NavItemConfig } from "@/types/nav";
import { paths } from "@/paths";

export const navItems = [
  {
    key: "overview",
    title: "General",
    href: paths.dashboard.overview,
    icon: "chart-pie",
  },
  {
    key: "customers",
    title: "Candidatos",
    href: paths.dashboard.customers,
    icon: "users",
  },
  {
    key: "settings",
    title: "Ajustes",
    href: paths.dashboard.settings,
    icon: "gear-six",
  },
  {
    key: "account",
    title: "Cuenta",
    href: paths.dashboard.account,
    icon: "user",
  },
  {
    key: "error",
    title: "Error",
    href: paths.errors.notFound,
    icon: "x-square",
  },
] satisfies NavItemConfig[];
