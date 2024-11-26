import SideModal from "../SideModal";
import { ArrowLeftFromLine, BookOpen, MicVocal } from "lucide-react";
import { useRouter } from "next/navigation";
import { useUserProvider } from "@/providers/UserProvder";
import RecentChats from "../Sidebar/RecentChats";
import Introducing from "../Sidebar/Introducing";
import { useState } from "react";
import UserInfo from "../Sidebar/UserInfo";
import Logo from "../Logo";
import Icon from "../Icon";

const SideMenu = ({
  isVisible,
  toggleModal,
}: {
  isVisible: boolean;
  toggleModal: () => void;
}) => {
  const { push } = useRouter();
  const { email, isPrepared } = useUserProvider();
  const [isIntroOpen, setIsIntroOpen] = useState(true);

  const goToItem = (link?: string) => {
    if (isPrepared()) {
      push(`/${link || ""}`);
      toggleModal();
    }
  };

  return (
    <SideModal isVisible={isVisible} toggleModal={toggleModal}>
      <div className="flex items-center gap-4 justify-between">
        <div className="flex gap-2 items-center">
          <Logo />
        </div>
        <button type="button" onClick={toggleModal}>
          <ArrowLeftFromLine />
        </button>
      </div>
      <button
        type="button"
        className="border-[#E6E6E6] border-[1px] rounded-md p-2 mt-4 md:mt-8 cursor-pointer shadow-[1px_1px_1px_1px_#E6E6E6]"
        onClick={() => goToItem("")}
      >
        New Chat
      </button>
      <button
        type="button"
        onClick={() => goToItem("history")}
        className="flex gap-2 items-center my-4"
      >
        <BookOpen />
        Library
      </button>
      <button
        type="button"
        onClick={() => goToItem("history")}
        className="flex gap-2 items-center my-4"
      >
        <MicVocal />
        Artists
      </button>
      <button
        type="button"
        onClick={() => goToItem("agents")}
        className="flex gap-2 items-center my-4"
      >
        <Icon name="robot" />
        Agents
      </button>
      <div className="h-[0.1px] bg-greyw-full my-4" />
      {email && <RecentChats toggleModal={toggleModal} />}
      <div className="grow flex flex-col gap-1 md:gap-3 justify-end">
        {isIntroOpen && (
          <Introducing toggleVisible={() => setIsIntroOpen(!isIntroOpen)} />
        )}
        {email && <UserInfo toggleMenuExpanded={toggleModal} />}
      </div>
    </SideModal>
  );
};

export default SideMenu;
