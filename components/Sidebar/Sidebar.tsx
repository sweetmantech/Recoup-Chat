"use client";

import { useEffect, useState } from "react";
import SideMenu from "../SideMenu";
import MiniMenu from "./MiniMenu";

const Sidebar = () => {
  const [mounted, setMounted] = useState(false);
  const [isOpenSideMenu, setIsOpenSideMenu] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="border-r-[1px] border-r-gray-700 w-16 flex flex-col py-4 px-2 items-center gap-3 hidden md:block">
        <div className="mb-6 w-[90px] h-[90px]" />
      </div>
    );
  }

  return (
    <div className="w-20 bg-background">
      <MiniMenu toggleMenuExpanded={() => setIsOpenSideMenu(!isOpenSideMenu)} />
      <SideMenu
        isVisible={isOpenSideMenu}
        toggleModal={() => setIsOpenSideMenu(!isOpenSideMenu)}
      />
    </div>
  );
};

export default Sidebar;
