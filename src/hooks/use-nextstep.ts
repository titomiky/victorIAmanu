import { StepsRouter } from "@/app/onboarding/steps";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export function useNextStep() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentStep = Number(searchParams.get("step")) ?? 1;

  const handleNextStep = (isCompany?: boolean) => {
    if (isCompany) {
      router.push(StepsRouter.company[`${(currentStep + 1) as 1 | 2 | 3}`]);
      return;
    }

    router.push(StepsRouter.candidate[`${(currentStep + 1) as 1 | 2 | 3}`]);
  };

  return { handleNextStep };
}
