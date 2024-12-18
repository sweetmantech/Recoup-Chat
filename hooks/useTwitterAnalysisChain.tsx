import { useUserProvider } from "@/providers/UserProvder";
import { STEP_OF_ANALYSIS } from "@/types/TikTok";
import { useFunnelAnalysisProvider } from "@/providers/FunnelAnalysisProvider";
import getTwitterProfile from "@/lib/twitter/getTwitterProfile";
import { useRouter } from "next/navigation";
import { v4 as uuidV4 } from "uuid";

const useTwitterAnalysisChain = () => {
  const {
    setIsLoading,
    setThought,
    username,
    isLoading,
    setResult,
    funnelType,
  } = useFunnelAnalysisProvider();
  const { isPrepared } = useUserProvider();
  const { push } = useRouter();

  const handleAnalyze = async () => {
    try {
      if (!isPrepared()) return;
      setIsLoading(true);
      if (!username || isLoading) return;
      const newId = uuidV4();
      push(`/funnels/${funnelType}/${newId}`);
      await new Promise((resolve) => setTimeout(resolve, 1900));
      setThought(STEP_OF_ANALYSIS.PROFILE);
      const profile = await getTwitterProfile(username.replaceAll("@", ""));
      if (profile?.error) {
        setThought(STEP_OF_ANALYSIS.UNKNOWN_PROFILE);
        return;
      }
      setResult({
        ...profile,
        videos: [
          {
            comments: [
              {
                comment: "“Keep goin ladies”🤣",
                username: "dio.band0",
                created_at: 1722444727,
              },
            ],
            videoWebUrl:
              "https://www.tiktok.com/@officialluhtyler/video/7396112820015828267",
          },
        ],
      });
      setThought(STEP_OF_ANALYSIS.FINISHED);
    } catch (error) {
      setThought(STEP_OF_ANALYSIS.ERROR);
    }
  };

  return {
    handleAnalyze,
  };
};

export default useTwitterAnalysisChain;
