import { useUserProvider } from "@/providers/UserProvder";
import { ArtistRecord } from "@/types/Artist";
import { useCallback, useEffect, useState } from "react";
import useArtistSetting from "./useArtistSetting";
import { SETTING_MODE } from "@/types/Setting";
import useArtistMode from "./useArtistMode";
import saveArtist from "@/lib/saveArtist";
import useInitialArtists from "./useInitialArtists";

const useArtists = () => {
  const artistSetting = useArtistSetting();
  const { email } = useUserProvider();
  const [artists, setArtists] = useState<ArtistRecord[]>([]);
  const [selectedArtist, setSelectedArtist] = useState<ArtistRecord | null>(
    null,
  );
  const [updating, setUpdating] = useState(false);
  const loading = artistSetting.imageUploading || updating;
  const artistMode = useArtistMode(
    artistSetting.clearParams,
    artistSetting.setEditableArtist,
  );
  const { handleSelectArtist } = useInitialArtists(
    artists,
    selectedArtist,
    setSelectedArtist,
  );
  const [menuVisibleArtistId, setMenuVisibleArtistId] = useState<any>("");
  const activeArtistIndex = artists.findIndex(
    (artist: ArtistRecord) => artist.id === selectedArtist?.id,
  );

  const sorted = selectedArtist
    ? [
        selectedArtist,
        ...artists.slice(0, activeArtistIndex),
        ...artists.slice(activeArtistIndex + 1),
      ]
    : artists;

  const getArtists = useCallback(
    async (artistId?: string) => {
      if (!email) return;
      const response = await fetch(
        `/api/artists?email=${encodeURIComponent(email as string)}`,
      );
      const data = await response.json();
      setArtists(data.artists);
      if (artistId) {
        const newUpdatedInfo = data.artists.find(
          (artist: ArtistRecord) => artist.id === artistId,
        );
        if (newUpdatedInfo) setSelectedArtist(newUpdatedInfo);
      }
    },
    [email],
  );
  const saveSetting = async (
    name?: string,
    image?: string,
    socialUrls?: {
      tiktok_url?: string;
      twitter_url?: string;
      spotify_url?: string;
      instagram_url?: string;
    },
    mode?: string,
  ) => {
    setUpdating(true);
    const saveMode = mode || artistMode.settingMode;
    try {
      const data = await saveArtist({
        name: name || artistSetting.name,
        image: image || artistSetting.image,
        tiktok_url: socialUrls ? socialUrls?.tiktok_url : artistSetting.tiktok,
        youtube_url: artistSetting.youtube,
        apple_url: artistSetting.appleUrl,
        instagram_url: socialUrls
          ? socialUrls?.instagram_url
          : artistSetting.instagram,
        twitter_url: socialUrls
          ? socialUrls?.twitter_url
          : artistSetting.twitter,
        spotify_url: socialUrls
          ? socialUrls?.spotify_url
          : artistSetting.spotifyUrl,
        instruction: artistSetting.instruction,
        label: artistSetting.label,
        knowledges: artistSetting.bases,
        artistId:
          saveMode === SETTING_MODE.CREATE
            ? ""
            : artistSetting.editableArtist?.id,
        email,
      });
      await getArtists(data.artistInfo?.id);
      setUpdating(false);
      if (artistMode.settingMode === SETTING_MODE.CREATE)
        artistMode.setSettingMode(SETTING_MODE.UPDATE);
      return data.artistInfo;
    } catch (error) {
      console.error(error);
      setUpdating(false);
      return null;
    }
  };

  useEffect(() => {
    getArtists();
  }, [getArtists]);

  return {
    sorted,
    artists,
    setArtists,
    selectedArtist,
    setSelectedArtist: handleSelectArtist,
    getArtists,
    updating,
    loading,
    saveSetting,
    ...artistSetting,
    ...artistMode,
    setMenuVisibleArtistId,
    menuVisibleArtistId,
  };
};

export default useArtists;
