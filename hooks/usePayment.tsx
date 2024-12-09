import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "react-toastify";
import { createPaymentIntent } from "@/lib/stripe/createPaymentIntent";

const usePayment = () => {
  const [stripeClientSecret, setStripeClientSecret] = useState(null);
  const [stripePaymentId, setStripePaymentId] = useState(null);
  const [stripePromise, setStripePromise] = useState(null);
  const [loading, setLoading] = useState(false);

  const createStripePaymentIntent = async () => {
    const response = await createPaymentIntent();

    if (response.error) {
      toast.error("create payment failed");
      return false;
    }
    setStripeClientSecret(response.client_secret);
    setStripePaymentId(response.id);
    return true;
  };

  useEffect(() => {
    const loadStripePromise = async () => {
      const promise = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PK as string,
      );
      setStripePromise(promise as any);
    };
    loadStripePromise();
  }, []);

  const stripeOption = {
    clientSecret: stripeClientSecret,
  };

  return {
    stripePromise,
    setStripeClientSecret,
    stripeClientSecret,
    stripeOption,
    createStripePaymentIntent,
    stripePaymentId,
    loading,
    setLoading,
  };
};

export default usePayment;
