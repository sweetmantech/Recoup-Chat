import { ArtistRecord } from "@/types/Artist";
import { SETTING_MODE } from "@/types/Setting";
import { Dispatch, SetStateAction, useState } from "react";
import useArtistSetting from "./useArtistSetting";

const useArtistMode = (
  artistSetting: ReturnType<typeof useArtistSetting>,
  setSelectedArtist: Dispatch<SetStateAction<ArtistRecord | null>>,
) => {
  const [settingMode, setSettingMode] = useState(SETTING_MODE.UPDATE);
  const [isOpenSettingModal, setIsOpenSettingModal] = useState(false);

  const toggleCreation = () => {
    artistSetting.clearParams();
    setSettingMode(SETTING_MODE.CREATE);
    toggleSettingModal();
  };

  const toggleUpdate = (artist: ArtistRecord) => {
    setSettingMode(SETTING_MODE.UPDATE);
    setSelectedArtist(artist);
  };

  const toggleSettingModal = () => {
    setIsOpenSettingModal(!isOpenSettingModal);
  };

  return {
    toggleUpdate,
    toggleSettingModal,
    toggleCreation,
    settingMode,
    setSettingMode,
    isOpenSettingModal,
    setIsOpenSettingModal,
  };
};

export default useArtistMode;
