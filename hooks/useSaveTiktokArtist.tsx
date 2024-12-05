import { useArtistProvider } from "@/providers/ArtistProvider";
import { SETTING_MODE } from "@/types/Setting";

const useSaveTiktokArtist = () => {
  const { saveSetting, setSelectedArtist, setArtistActive } =
    useArtistProvider();

  const saveTiktokArtist = async (profileWithComments: any) => {
    let artistId = "";
    while (1) {
      const artistInfo = await saveSetting(
        profileWithComments.nickname,
        profileWithComments.avatar,
        SETTING_MODE.CREATE,
      );
      if (artistInfo) {
        setSelectedArtist({ ...artistInfo });
        artistId = artistInfo?.id;
        setArtistActive(true);
        break;
      }
    }
    return artistId;
  };

  return {
    saveTiktokArtist,
  };
};

export default useSaveTiktokArtist;
