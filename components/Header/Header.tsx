"use client";

import { MenuIcon, Plus } from "lucide-react";
import { useState } from "react";
import SideMenu from "../SideMenu";
import { useArtistProvider } from "@/providers/ArtistProvider";
import ImageWithFallback from "../ImageWithFallback";
import useIsMobile from "@/hooks/useIsMobile";
import { ArtistRecord } from "@/types/Artist";
import Artist from "./Artist";
import { usePathname } from "next/navigation";

const Header = () => {
  const [isOpenMobileMenu, setIsOpenMobileMenu] = useState(false);
  const [isVisibleDropDown, setIsVisibleDropDown] = useState(false);

  const {
    selectedArtist,
    artists,
    toggleSettingModal,
    toggleUpdate,
    toggleCreation,
  } = useArtistProvider();
  const isMobile = useIsMobile();

  const handleClickPfp = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    toggleUpdate(selectedArtist as any);
    toggleSettingModal();
  };

  const pathname = usePathname();

  return (
    <div className="z-[10] relative md:fixed md:right-0 md:top-0 w-screen md:w-fit flex p-4 md:pt-8 md:pr-8 items-center justify-between md:justify-end">
      <button
        type="button"
        className="md:hidden flex items-center gap-2"
        onClick={() => setIsOpenMobileMenu(!isOpenMobileMenu)}
      >
        <MenuIcon />
      </button>
      {selectedArtist && (
        <div className="relative">
          {pathname.includes("/autopilot") && (
            <button
              type="button"
              className="w-8 aspect-1/1 rounded-full overflow-hidden flex items-center justify-center"
              onClick={handleClickPfp}
              onMouseOver={() => setIsVisibleDropDown(true)}
              onMouseOut={() => setIsVisibleDropDown(false)}
            >
              <ImageWithFallback src={selectedArtist?.image || ""} />
            </button>
          )}
          {isVisibleDropDown && (
            <>
              <div
                className="absolute top-[calc(100%-5px)] right-0 z-[3]"
                onMouseOver={() => setIsVisibleDropDown(true)}
                onMouseOut={() => setIsVisibleDropDown(false)}
              >
                <div className="border mt-2 bg-white p-2 rounded-md space-y-1 shadow-[0px_0px_7px_0px_#80808063] max-h-[200px] overflow-y-auto">
                  {artists.map((artist: ArtistRecord) => (
                    <Artist
                      artist={artist}
                      toggleDropDown={() => setIsVisibleDropDown(false)}
                      key={artist.id}
                    />
                  ))}
                  <button
                    className="flex px-2 py-1 gap-2 text-sm items-center text-grey-light-1 hover:text-grey-dark-1"
                    onClick={() => {
                      toggleCreation();
                      toggleSettingModal();
                    }}
                  >
                    <div className="w-8 flex justify-center">
                      <Plus className="size-5 text-grey-dark-1" />
                    </div>
                    New Artist
                  </button>
                </div>
              </div>
              <div
                className="absolute top-[calc(100%-20px)] right-full space-y-1 h-[40px] w-[80px] z-[2]"
                onMouseOver={() => setIsVisibleDropDown(true)}
                onMouseOut={() => setIsVisibleDropDown(false)}
              />
            </>
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
