import { useState } from "react";
import { toast } from "react-toastify";
import { createPrice } from "@/lib/stripe/createPrice";
import { createSession } from "@/lib/stripe/createSession";

const usePayment = () => {
  const [loading, setLoading] = useState(false);

  const createCheckoutSession = async (
    productName: string,
    successUrl: string,
  ) => {
    const priceResponse = await createPrice(productName);

    if (priceResponse.error) {
      toast.error("price creation is failed.");
      return false;
    }

    const sessionResponse = await createSession(successUrl, priceResponse.id);
    window.open(sessionResponse.url, "_self");
  };

  return {
    loading,
    setLoading,
    createCheckoutSession,
  };
};

export default usePayment;
