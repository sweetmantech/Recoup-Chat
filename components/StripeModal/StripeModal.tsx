import { useState } from "react";
import Modal from "../Modal";
import {
  useElements,
  useStripe,
  PaymentElement,
  Elements,
} from "@stripe/react-stripe-js";
import handleError from "@/lib/handleError";
import { useParams } from "next/navigation";
import { usePaymentProvider } from "@/providers/PaymentProvider";

const StripeModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const { chat_id: chatId } = useParams();
  const { stripePromise, stripeOption } = usePaymentProvider()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const paymentIntent = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/funnels/tiktok-account-analysis/${chatId}`,
      },
      redirect: "if_required",
    });

    if (paymentIntent?.error) {
      handleError(paymentIntent.error);
      return;
    }
  };

  return (
    <Modal onClose={() => setIsModalOpen(!isModalOpen)}>
      <Elements options={stripeOption} stripe={stripePromise}>
        <form id="payment-form" onSubmit={handleSubmit}>
          <PaymentElement id="payment-element" />
          <button type="button">Pay</button>
        </form>
      </Elements>
    </Modal>
  );
};

export default StripeModal;
