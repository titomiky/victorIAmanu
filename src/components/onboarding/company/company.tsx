"use client";
import CreateCompanyForm from "@/components/forms/create-company";
import { Box, Button, Typography } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const Company = () => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const router = useRouter();

  React.useEffect(() => {
    params.set("step", "2");
    router.push("?" + params.toString());
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Expected
  }, []);

  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <CreateCompanyForm />
    </React.Suspense>
  );
};

export default Company;
