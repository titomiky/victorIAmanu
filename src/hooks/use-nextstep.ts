import { StepsRouter } from "@/app/onboarding/steps";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export function useNextStep() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentStep = useRef(Number(searchParams.get("step")));

  useEffect(() => {
    currentStep.current = Number(searchParams.get("step"));
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Expected
  }, [searchParams, router]);

  const handleNextStep = (isCompany?: boolean) => {
    if (isCompany) {
      router.push(
        StepsRouter.company[`${(currentStep.current + 1) as 1 | 2 | 3}`]
      );
      return;
    }

    router.push(
      StepsRouter.candidate[`${(currentStep.current + 1) as 1 | 2 | 3}`]
    );
  };

  return { handleNextStep };
}
