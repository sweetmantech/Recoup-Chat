import Modal from "../Modal";
import {
  useElements,
  useStripe,
  PaymentElement,
} from "@stripe/react-stripe-js";
import handleError from "@/lib/handleError";
import { useParams } from "next/navigation";

const StripeModal = ({
  toggleModal,
  handleGenerateReport,
}: {
  toggleModal: () => void;
  handleGenerateReport: () => void;
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const { chat_id: chatId } = useParams();

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

    handleGenerateReport();
    toggleModal();
  };

  return (
    <Modal onClose={toggleModal}>
      <form id="payment-form" onSubmit={handleSubmit}>
        <PaymentElement id="payment-element" />
        <div className="flex justify-center mt-4">
          <button
            type="submit"
            className="w-full border border-grey px-4 py-2 rounded-md"
          >
            Pay Now
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default StripeModal;
