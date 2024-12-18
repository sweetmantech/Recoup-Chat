import { useArtistProvider } from "@/providers/ArtistProvider";
import { useFunnelAnalysisProvider } from "@/providers/FunnelAnalysisProvider";
import { Funnel_Type } from "@/types/Funnel";
import { SETTING_MODE } from "@/types/Setting";

const useSaveFunnelArtist = () => {
  const { saveSetting, setSelectedArtist } = useArtistProvider();
  const { funnelType } = useFunnelAnalysisProvider();

  const saveFunnelArtist = async (profileWithComments: any) => {
    const socialUrls = {} as any;
    const url = `https://tiktok.com/@${profileWithComments.name}`;
    if (funnelType === Funnel_Type.TIKTOK) socialUrls.tiktok_url = url;
    if (funnelType === Funnel_Type.TWITTER) socialUrls.twitter_url = url;

    while (1) {
      const artistInfo = await saveSetting(
        profileWithComments.nickname,
        profileWithComments.avatar,
        socialUrls,
        SETTING_MODE.CREATE,
      );
      if (artistInfo) {
        setSelectedArtist({ ...artistInfo });
        return artistInfo?.id;
      }
    }
  };

  return {
    saveFunnelArtist,
  };
};

export default useSaveFunnelArtist;
