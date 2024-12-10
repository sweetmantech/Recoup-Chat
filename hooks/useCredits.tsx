import { checkSession } from "@/lib/stripe/checkSession";
import { getSession } from "@/lib/stripe/getSession";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const useCredits = () => {
  const searchParams = useSearchParams();
  const referenceId = searchParams.get("referenceId");
  const { push } = useRouter();

  useEffect(() => {
    const init = async () => {
      const session = await getSession(referenceId as string);
      const paymentStatus = session?.payment_status;
      if (paymentStatus === "paid") {
        if (!session?.metadata?.credit_updated)
          await checkSession(referenceId as string, session?.metadata?.chatId);
        push(`/funnels/tiktok-account-analysis/${session?.metadata?.chatId}`);
        return;
      }

      push("/funnels/tiktok-account-analysis/");
    };
    if (!referenceId) {
      push("/funnels/tiktok-account-analysis/");
      return;
    }
    init();
  }, [referenceId]);
};

export default useCredits;
