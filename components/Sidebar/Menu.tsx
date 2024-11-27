import { useRouter } from "next/navigation";
import Artists from "../Sidebar/Artists";
import { useArtistProvider } from "@/providers/ArtistProvider";
import { useUserProvider } from "@/providers/UserProvder";
import RecentChats from "../Sidebar/RecentChats";
import Introducing from "../Sidebar/Introducing";
import { useState } from "react";
import UserInfo from "../Sidebar/UserInfo";
import Logo from "../Logo";
import Icon from "../Icon";

const Menu = ({ toggleMenuExpanded }: { toggleMenuExpanded: () => void }) => {
  const { push } = useRouter();
  const { artists } = useArtistProvider();
  const { email, isPrepared } = useUserProvider();
  const [isIntroOpen, setIsIntroOpen] = useState(true);

  const goToItem = (link?: string) => {
    if (isPrepared()) {
      push(`/${link || ""}`);
    }
  };

  return (
    <div className="w-full h-screen pt-10 pb-4 pl-6 pr-2 gap-1 hidden md:flex flex-col">
      <div className="flex items-center gap-4 justify-between">
        <div className="flex gap-2 items-center">
          <Logo />
        </div>
      </div>
      <button
        type="button"
        className="border-[#E6E6E6] border-[1px] rounded-md p-2 mt-4 md:mt-8 cursor-pointer shadow-[1px_1px_1px_1px_#E6E6E6] bg-white"
        onClick={() => goToItem("")}
      >
        New Chat
      </button>
      <button
        type="button"
        onClick={() => goToItem("dashboard")}
        className="flex gap-2 items-center my-4"
      >
        <Icon name="dashboard" />
        Dashboard
      </button>
      {artists.length > 0 && <Artists />}
      <button
        type="button"
        onClick={() => goToItem("agents")}
        className="flex gap-2 items-center my-4"
      >
        <Icon name="robot" />
        Agents
      </button>
      <div className="h-[0.1px] bg-greyw-full my-4" />
      {email && <RecentChats toggleModal={toggleMenuExpanded} />}
      <div className="grow flex flex-col gap-1 md:gap-3 justify-end">
        {isIntroOpen && (
          <Introducing toggleVisible={() => setIsIntroOpen(!isIntroOpen)} />
        )}
        <UserInfo toggleMenuExpanded={toggleMenuExpanded} />
      </div>
    </div>
  );
};

export default Menu;
