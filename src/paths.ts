export const paths = {
  home: "/",
  not_found: "/not-found",
  auth: {
    signIn: "/auth/sign-in",
    signUp: "/auth/sign-up",
    resetPassword: "/auth/reset-password",
  },
  onboarding: {
    home: "/onboarding",
  },
  dashboard: {
    overview: "/dashboard",
    account: "/dashboard/account",
    candidatures: "/dashboard/candidatures",
    candidates: "/dashboard/candidates",
    integrations: "/dashboard/integrations",
    settings: "/dashboard/settings",
  },
  errors: { notFound: "/errors/not-found" },
  candidate: {
    home: "/candidate/home",
  },
} as const;
