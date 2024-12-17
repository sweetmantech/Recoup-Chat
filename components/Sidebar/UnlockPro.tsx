import { usePaymentProvider } from "@/providers/PaymentProvider";
import UnlimitedCredits from "./UnlimitedCredits";
import UnlockProCard from "./UnlockProCard";

const UnlockPro = () => {
  const { subscriptionActive } = usePaymentProvider();

  return (
    <div>{subscriptionActive ? <UnlimitedCredits /> : <UnlockProCard />}</div>
  );
};

export default UnlockPro;
