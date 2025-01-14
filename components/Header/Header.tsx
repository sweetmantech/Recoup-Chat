"use client";

import { MenuIcon } from "lucide-react";
import { useState } from "react";
import SideMenu from "../SideMenu";
import { useArtistProvider } from "@/providers/ArtistProvider";
import ImageWithFallback from "../ImageWithFallback";
import useIsMobile from "@/hooks/useIsMobile";
import { ArtistRecord } from "@/types/Artist";
import useSelectClickoutside from "@/hooks/useSelectClickoutside";

const Header = () => {
  const [isOpenMobileMenu, setIsOpenMobileMenu] = useState(false);
  const { selectRef, setIsVisibleSelect, isVisibleSelect } =
    useSelectClickoutside();

  const { selectedArtist, artists, setSelectedArtist } = useArtistProvider();
  const isMobile = useIsMobile();

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
            onClick={() => setIsVisibleSelect(true)}
          >
            <ImageWithFallback src={selectedArtist?.image || ""} />
          </button>
          {isVisibleSelect && (
            <div
              ref={selectRef}
              className="absolute top-full right-0 bg-white rounded-md p-2 mt-1 border space-y-1 max-h-[200px] overflow-y-auto"
            >
              {artists.map((artist: ArtistRecord) => (
                <button
                  key={artist.id}
                  onClick={() => {
                    setIsVisibleSelect(false);
                    setSelectedArtist(artist);
                  }}
                  className="border-b w-full text-left"
                >
                  {artist.name}
                </button>
              ))}
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
