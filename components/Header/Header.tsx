"use client";

import { MenuIcon } from "lucide-react";
import { useState } from "react";
import SideMenu from "../SideMenu";
import { useArtistProvider } from "@/providers/ArtistProvider";
import ImageWithFallback from "../ImageWithFallback";
import useIsMobile from "@/hooks/useIsMobile";
import ArtistDropDown from "./ArtistDropDown";
import SideArtists from "../SideArtists";

const Header = () => {
  const [isOpenMobileMenu, setIsOpenMobileMenu] = useState(false);
  const [isOpenSideArtists, setIsOpenSideArtists] = useState(false);
  const [isVisibleDropDown, setIsVisibleDropDown] = useState(false);
  const { selectedArtist, toggleSettingModal, toggleUpdate } =
    useArtistProvider();
  const isMobile = useIsMobile();

  const handleClickPfp = () => {
    if (isMobile) {
      setIsOpenSideArtists(true);
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    toggleUpdate(selectedArtist as any);
    toggleSettingModal();
  };

  return (
    <>
      <div
        className="z-[10] relative md:fixed md:right-0 md:top-0 md:w-fit md:pt-8 md:pr-8 md:justify-end
    flex p-4 items-center justify-between w-auto"
      >
        <button
          type="button"
          className="md:hidden flex items-center gap-2"
          onClick={() => setIsOpenMobileMenu(!isOpenMobileMenu)}
        >
          <MenuIcon />
        </button>
        {selectedArtist && isMobile && (
          <div className="relative">
            <button
              type="button"
              className="w-8 aspect-1/1 rounded-full overflow-hidden flex items-center justify-center"
              onClick={handleClickPfp}
              onMouseOver={() => setIsVisibleDropDown(true && !isMobile)}
              onMouseOut={() => setIsVisibleDropDown(false && !isMobile)}
            >
              <ImageWithFallback src={selectedArtist?.image || ""} />
            </button>
            {isVisibleDropDown && (
              <ArtistDropDown setIsVisibleDropDown={setIsVisibleDropDown} />
            )}
          </div>
        )}
        {isMobile && (
          <>
            <SideMenu
              isVisible={isOpenMobileMenu}
              toggleModal={() => setIsOpenMobileMenu(!isOpenMobileMenu)}
            />
            <SideArtists
              isVisible={isOpenSideArtists}
              toggleModal={() => setIsOpenSideArtists(!isOpenSideArtists)}
            />
          </>
        )}
      </div>
    </>
  );
};

export default Header;
