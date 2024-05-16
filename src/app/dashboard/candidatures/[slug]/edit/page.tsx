"use client";
import EditCandidature from "@/components/dashboard/candidatures/edit/edit-candidature";
import { Candidature, candidatureClient } from "@/lib/canidature/client";
import * as React from "react";

const Page = ({ params }: { params: { slug: string } }) => {
  const [candidature, setCandidature] = React.useState<Candidature>();
  React.useEffect(() => {
    const getDefaultValues = async () => {
      try {
        const res = await candidatureClient.getCandidature(params.slug);
        setCandidature(res);
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };

    getDefaultValues();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Expected
  }, []);

  if (candidature) {
    return (
      <EditCandidature candidatureId={params.slug} candidature={candidature} />
    );
  } else {
    return <>Cargando ...</>;
  }
};

export default Page;
