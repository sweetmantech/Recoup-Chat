import { useState } from "react";
import { createSession } from "@/lib/stripe/createSession";
import { useParams } from "next/navigation";
import { useUserProvider } from "@/providers/UserProvder";

const usePayment = () => {
  const [loading, setLoading] = useState(false);
  const { chat_id: chatId } = useParams();
  const { userData } = useUserProvider();

  const createCheckoutSession = async (
    productName: string,
    subscriptionActive: boolean,
    referenceId: string,
    successUrl: string,
  ) => {
    const sessionResponse = await createSession(
      successUrl,
      productName,
      referenceId,
      subscriptionActive,
      {
        chatId: chatId as string,
        accountId: userData?.id,
      },
    );

    window.open(sessionResponse.url, "_self");
  };

  return {
    loading,
    setLoading,
    createCheckoutSession,
  };
};

export default usePayment;
