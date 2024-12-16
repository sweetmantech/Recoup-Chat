import { useCallback, useEffect, useState } from "react";
import { createSession } from "@/lib/stripe/createSession";
import { useUserProvider } from "@/providers/UserProvder";
import { v4 as uuidV4 } from "uuid";
import getCredits from "@/lib/supabase/getCredits";
import { getActiveSubscription } from "@/lib/stripe/getActiveSubscription";

const usePayment = () => {
  const [isCreditChecking, setIsCreditChecking] = useState(true);
  const { userData } = useUserProvider();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successCallbackParams, setSuccessCallbackParams] = useState("");
  const [hasCredits, setHasCredits] = useState(false);
  const [subscriptionActive, setSubscriptionActive] = useState(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const createCheckoutSession = async (
    productName: string,
    isSubscription: boolean,
  ) => {
    const referenceId = uuidV4();
    const sessionResponse = await createSession(
      `${window.location.href}?referenceId=${referenceId}&${successCallbackParams || ""}`,
      productName,
      referenceId,
      isSubscription,
      {
        accountId: userData?.id,
      },
    );

    window.open(sessionResponse.url, "_self");
  };

  const checkCredits = useCallback(async () => {
    if (!userData) return;
    const subscriptions = await getActiveSubscription(userData?.id);
    if (subscriptions?.length) {
      setIsCreditChecking(false);
      setSubscriptionActive(true);
      return;
    }
    const credits = await getCredits(userData?.id);
    if (credits?.remaining_credits) setHasCredits(true);
    setIsCreditChecking(false);
  }, [userData]);

  useEffect(() => {
    checkCredits();
  }, [checkCredits]);

  return {
    setSuccessCallbackParams,
    isCreditChecking,
    createCheckoutSession,
    isModalOpen,
    setIsModalOpen,
    toggleModal,
    checkCredits,
    hasCredits,
    subscriptionActive,
  };
};

export default usePayment;
