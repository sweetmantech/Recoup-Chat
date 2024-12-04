"use client";

import { MenuIcon } from "lucide-react";
import { useState } from "react";
import SideMenu from "../SideMenu";
import { useArtistProvider } from "@/providers/ArtistProvider";
import ImageWithFallback from "../ImageWithFallback";
import useIsMobile from "@/hooks/useIsMobile";

const Header = () => {
  const [isOpenMobileMenu, setIsOpenMobileMenu] = useState(false);
  const { selectedArtist } = useArtistProvider();
  const isMobile = useIsMobile();

  return (
    <div className="relative md:fixed md:right-0 md:top-0 w-screen md:w-fit flex p-4 md:pt-8 md:pr-8 items-center justify-between md:justify-end">
      {isMobile && (
        <button
          type="button"
          className="flex items-center gap-2"
          onClick={() => setIsOpenMobileMenu(!isOpenMobileMenu)}
        >
          <MenuIcon />
        </button>
      )}
      {selectedArtist && (
        <button
          type="button"
          className="w-8 aspect-1/1 rounded-full overflow-hidden flex items-center justify-center"
        >
          <ImageWithFallback src={selectedArtist?.image || ""} />
        </button>
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
