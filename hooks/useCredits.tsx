import { checkSession } from "@/lib/stripe/checkSession";
import { getSession } from "@/lib/stripe/getSession";
import increaseCredits from "@/lib/supabase/increaseCredits";
import { useUserProvider } from "@/providers/UserProvder";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const useCredits = () => {
  const searchParams = useSearchParams();
  const referenceId = searchParams.get("referenceId");
  const { userData } = useUserProvider();
  const { push } = useRouter();

  useEffect(() => {
    const init = async () => {
      const session = await getSession(referenceId as string);
      const paymentStatus = session?.payment_status;
      if (paymentStatus === "paid") {
        if (!session?.metadata?.credit_updated) {
          await increaseCredits(userData?.id);
          await checkSession(session.id, session?.metadata?.chatId);
        }

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
