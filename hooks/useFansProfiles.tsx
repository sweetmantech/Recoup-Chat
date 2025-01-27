import { useArtistProvider } from "@/providers/ArtistProvider";
import { useCallback, useEffect, useState } from "react";

const useFansProfiles = () => {
  const [fansProfiles, setFansProfiles] = useState<any>([]);
  const { selectedArtist } = useArtistProvider();

  const getFansProfiles = useCallback(async () => {
    if (!selectedArtist?.id) return;
    const response = await fetch(
      `/api/get_fans_profiles?artistId=${selectedArtist?.id}`,
    );
    const data = await response.json();
    setFansProfiles(data.data || []);
  }, [selectedArtist]);

  useEffect(() => {
    const timer = setInterval(getFansProfiles, 5000);
    return () => clearInterval(timer);
  }, [getFansProfiles]);

  return {
    fansProfiles,
  };
};

export default useFansProfiles;
