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
    key: "candidatures",
    title: "Candidaturas",
    href: paths.dashboard.candidatures,
    icon: "candidatures",
  },
  {
    key: "customers",
    title: "Candidatos",
    href: paths.dashboard.candidates,
    icon: "users",
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
