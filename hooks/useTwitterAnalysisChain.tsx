import { useUserProvider } from "@/providers/UserProvder";
import { STEP_OF_ANALYSIS } from "@/types/TikTok";
import { useFunnelAnalysisProvider } from "@/providers/FunnelAnalysisProvider";
import getTwitterProfile from "@/lib/twitter/getTwitterProfile";
import getComments from "@/lib/twitter/getComments";
import getSegments from "@/lib/getSegments";
import { SETTING_MODE } from "@/types/Setting";
import useSaveFunnelArtist from "./useSaveFunnelArtist";
import { useArtistProvider } from "@/providers/ArtistProvider";

const useTwitterAnalysisChain = () => {
  const {
    setIsLoading,
    setThought,
    username,
    isLoading,
    setResult,
    artistHandle,
    setSegments,
  } = useFunnelAnalysisProvider();
  const { saveFunnelArtist } = useSaveFunnelArtist();
  const { saveSetting, setSettingMode } = useArtistProvider();
  const { isPrepared } = useUserProvider();

  const handleAnalyze = async () => {
    try {
      if (!isPrepared()) return;
      setIsLoading(true);
      if (!username || isLoading) return;
      await new Promise((resolve) => setTimeout(resolve, 1900));
      setThought(STEP_OF_ANALYSIS.PROFILE);
      const profile = await getTwitterProfile(artistHandle);
      if (profile?.error) {
        setThought(STEP_OF_ANALYSIS.UNKNOWN_PROFILE);
        return;
      }
      const comments = await getComments(artistHandle);
      const profileWithComments = {
        ...profile,
        comments,
        total_comments_count: comments?.length,
      };
      let fanSegmentsWithIcons = [];
      if (comments.length > 0) {
        setThought(STEP_OF_ANALYSIS.SEGMENTS);
        fanSegmentsWithIcons = await getSegments(profileWithComments);
        if (fanSegmentsWithIcons?.error) {
          setThought(STEP_OF_ANALYSIS.ERROR);
          return;
        }
        setSegments([...fanSegmentsWithIcons]);
      }
      setResult(profileWithComments);
      setSettingMode(SETTING_MODE.CREATE);
      setThought(STEP_OF_ANALYSIS.CREATING_ARTIST);
      await saveFunnelArtist(profileWithComments);
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
