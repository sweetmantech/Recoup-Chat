import { useChatProvider } from "@/providers/ChatProvider";
import { useTikTokAnalysisProvider } from "@/providers/TIkTokAnalysisProvider";
import { v4 as uuidV4 } from "uuid";
import Icon from "@/components/Icon";
import LucideIcon from "@/components/LucideIcon";
import StripeModal from "@/components/StripeModal";
import { Elements } from "@stripe/react-stripe-js";
import { usePaymentProvider } from "@/providers/PaymentProvider";
import { useState } from "react";

const Segments = () => {
  const { segments, result } = useTikTokAnalysisProvider();
  const { append } = useChatProvider();
  const {
    stripePromise,
    stripeOption,
    stripeClientSecret,
    stripePaymentId,
    createStripePaymentIntent,
  } = usePaymentProvider();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [segmentName, setSegmentName] = useState("");

  const payNow = async (segmentName: string) => {
    await createStripePaymentIntent();
    setSegmentName(segmentName);
    setIsModalOpen(true);
  };

  const handleGenerateReport = () => {
    append(
      {
        id: uuidV4(),
        role: "user",
        content: `Please create a tiktok fan segment report for ${result.id} using this segment ${segmentName}.`,
      },
      true,
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 pt-4 gap-3">
      {segments.map((segment) => (
        <button
          className="w-full border-grey-light border-[1px] rounded-md px-3 py-2 flex gap-2 items-center shadow-grey"
          type="button"
          key={segment?.name}
          onClick={() => payNow(segment?.name)}
        >
          {segment?.icon ? (
            <LucideIcon name={segment.icon} />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <Icon name="logo-xs" />
          )}

          <p className="font-bold text-xs text-center">
            {segment?.name} {`(${segment?.count})`}
          </p>
        </button>
      ))}
      {stripeClientSecret && isModalOpen && stripePaymentId && (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        <Elements options={stripeOption as any} stripe={stripePromise}>
          <StripeModal
            toggleModal={() => setIsModalOpen(!isModalOpen)}
            handleGenerateReport={handleGenerateReport}
          />
        </Elements>
      )}
    </div>
  );
};

export default Segments;
