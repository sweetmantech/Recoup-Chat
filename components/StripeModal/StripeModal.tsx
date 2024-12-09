import Modal from "../Modal";
import {
  useElements,
  useStripe,
  PaymentElement,
} from "@stripe/react-stripe-js";
import handleError from "@/lib/handleError";
import { useParams } from "next/navigation";
import increaseCredits from "@/lib/supabase/increaseCredits";
import { useUserProvider } from "@/providers/UserProvder";
import { usePaymentProvider } from "@/providers/PaymentProvider";
import { toast } from "react-toastify";

const StripeModal = ({ toggleModal }: { toggleModal: () => void }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { chat_id: chatId } = useParams();
  const { userData } = useUserProvider();
  const { setLoading, loading } = usePaymentProvider();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

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

    await increaseCredits(userData?.id);
    toggleModal();
    toast.success("1 Credit purchased!");
    setLoading(false);
  };

  return (
    <Modal onClose={toggleModal}>
      <form id="payment-form" onSubmit={handleSubmit}>
        <PaymentElement id="payment-element" />
        <div className="flex justify-center mt-4">
          <button
            type="submit"
            className="w-full border border-grey px-4 py-2 rounded-md"
            disabled={loading}
          >
            {loading ? "Loading..." : "Pay for more credits"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default StripeModal;
