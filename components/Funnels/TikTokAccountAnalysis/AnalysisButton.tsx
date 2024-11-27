import { useTikTokAnalysisProvider } from "@/providers/TIkTokAnalysisProvider";

const AnalysisButton = ({ className }: { className?: string }) => {
  const { username, handleAnalyze } = useTikTokAnalysisProvider();

  return (
    <button
      onClick={handleAnalyze}
      disabled={!username}
      className={`bg-black rounded-[10px] pl-5 pr-4 h-9 z-20 flex items-center gap-2 justify-center
      transition-all text-[15px] font-medium text-white hover:bg-black active:bg-white/80
      disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      Try For Free
    </button>
  );
};

export default AnalysisButton;
