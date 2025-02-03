import useRunAgent from "@/hooks/useRunAgent";
import { useFunnelAnalysisProvider } from "@/providers/FunnelAnalysisProvider";

const HandleInput = () => {
  const { username, setUsername, funnelType } = useFunnelAnalysisProvider();
  const { handleAnalyze } = useRunAgent();

  // eslint-disable-next-line
  const handleKeyDown = (e: any) => {
    if (!username) return;
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleAnalyze();
    }
  };

  return (
    <input
      type="text"
      placeholder={`@${funnelType}username`}
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      className="
                w-full
                h-full
                bg-transparent
                md:pl-6
                md:pr-[145px]
                px-4
                text-[16px]
                rounded-[10px]
                !outline-none 
                placeholder:text-grey
                relative
                z-10
                border
                max-w-[239px]
                md:max-w-full
              "
      onKeyDown={handleKeyDown}
    />
  );
};

export default HandleInput;
