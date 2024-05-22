"use client";
import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import CreateCandidateForm from "@/components/forms/create-candidate";

const Candidate = () => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const router = useRouter();

  React.useEffect(() => {
    params.set("step", "2");
    router.push("?" + params.toString());
    console.log(searchParams.get("step"));
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Expected
  }, [searchParams, router]);

  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <CreateCandidateForm />
    </React.Suspense>
  );
};

export default Candidate;
