import { ArtistRecord } from "@/types/Artist";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";

const useInitialArtists = (
  artists: ArtistRecord[],
  selectedArtist: ArtistRecord | null,
  setSelectedArtist: Dispatch<SetStateAction<ArtistRecord | null>>,
) => {
  const [artistCookie, setArtistCookie] = useLocalStorage("RECOUP_ARTIST", {});

  useEffect(() => {
    if (selectedArtist) {
      setArtistCookie(selectedArtist);
    }
  }, [selectedArtist]);

  useEffect(() => {
    if (Object.keys(artistCookie).length > 0) {
      setSelectedArtist(artistCookie as any);
    }
  }, []);

  useEffect(() => {
    if (selectedArtist && artists.length > 0) {
      const currentArtist = artists.find(
        (artist: ArtistRecord) =>
          artist.account_id === selectedArtist.account_id,
      );
      if (currentArtist && !selectedArtist?.isWrapped)
        setSelectedArtist(currentArtist);
    }
  }, [artists, selectedArtist]);

  const handleSelectArtist = (artist: ArtistRecord | null) => {
    setSelectedArtist(artist);
    if (artist) setArtistCookie(artist);
  };

  return {
    handleSelectArtist,
  };
};

export default useInitialArtists;
