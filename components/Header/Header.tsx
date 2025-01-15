"use client";

import { MenuIcon } from "lucide-react";
import { useState } from "react";
import SideMenu from "../SideMenu";
import { useArtistProvider } from "@/providers/ArtistProvider";
import ImageWithFallback from "../ImageWithFallback";
import useIsMobile from "@/hooks/useIsMobile";
import { ArtistRecord } from "@/types/Artist";

const Header = () => {
  const [isOpenMobileMenu, setIsOpenMobileMenu] = useState(false);
  const [isVisibleDropDown, setIsVisibleDropDown] = useState(false);

  const {
    selectedArtist,
    artists,
    setSelectedArtist,
    toggleSettingModal,
    toggleUpdate,
  } = useArtistProvider();
  const isMobile = useIsMobile();

  const handleClickPfp = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    toggleUpdate(selectedArtist as any);
    toggleSettingModal();
  };

  return (
    <div className="relative md:fixed md:right-0 md:top-0 w-screen md:w-fit flex p-4 md:pt-8 md:pr-8 items-center justify-between md:justify-end">
      <button
        type="button"
        className="md:hidden flex items-center gap-2"
        onClick={() => setIsOpenMobileMenu(!isOpenMobileMenu)}
      >
        <MenuIcon />
      </button>
      {selectedArtist && (
        <div className="relative">
          <button
            type="button"
            className="w-8 aspect-1/1 rounded-full overflow-hidden flex items-center justify-center"
            onClick={handleClickPfp}
            onMouseOver={() => setIsVisibleDropDown(true)}
            onMouseOut={() => setIsVisibleDropDown(false)}
          >
            <ImageWithFallback src={selectedArtist?.image || ""} />
          </button>
          {isVisibleDropDown && (
            <div
              className="absolute top-[calc(100%-5px)] right-0 space-y-1 max-h-[200px] overflow-y-auto"
              onMouseOver={() => setIsVisibleDropDown(true)}
              onMouseOut={() => setIsVisibleDropDown(false)}
            >
              <div className="border mt-2 bg-white p-2 rounded-md">
                {artists.map((artist: ArtistRecord) => (
                  <button
                    key={artist.id}
                    onClick={() => {
                      setIsVisibleDropDown(false);
                      setSelectedArtist(artist);
                    }}
                    className="border-b w-full text-left"
                  >
                    {artist.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      {isMobile && (
        <SideMenu
          isVisible={isOpenMobileMenu}
          toggleModal={() => setIsOpenMobileMenu(!isOpenMobileMenu)}
        />
      )}
    </div>
  );
};

export default Header;
