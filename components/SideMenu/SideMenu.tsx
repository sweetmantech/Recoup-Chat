import SideModal from "../SideModal";
import { ArrowLeftFromLine, BookOpen } from "lucide-react";
import { useRouter } from "next/navigation";
import Artists from "../Sidebar/Artists";
import { useArtistProvider } from "@/providers/ArtistProvider";
import { useUserProvider } from "@/providers/UserProvder";
import RecentChats from "../Sidebar/RecentChats";
import Introducing from "../Sidebar/Introducing";
import { useState } from "react";
import UserInfo from "../Sidebar/UserInfo";
import Logo from "../Logo";

const SideMenu = ({
  isVisible,
  toggleModal,
}: {
  isVisible: boolean;
  toggleModal: () => void;
}) => {
  const { push } = useRouter();
  const { artists } = useArtistProvider();
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
      {artists.length > 0 && <Artists />}
      <button
        type="button"
        onClick={() => goToItem("agents")}
        className="flex gap-2 items-center my-4"
      >
        <svg
          width="21"
          height="19"
          viewBox="0 0 21 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.5 0C11.0063 0 11.4919 0.200178 11.8499 0.556497C12.208 0.912816 12.4091 1.39609 12.4091 1.9C12.4091 2.603 12.0273 3.2205 11.4545 3.5435V4.75H12.4091C14.1812 4.75 15.8808 5.45062 17.1339 6.69774C18.3869 7.94486 19.0909 9.63631 19.0909 11.4H20.0455C20.2986 11.4 20.5414 11.5001 20.7204 11.6782C20.8994 11.8564 21 12.098 21 12.35V15.2C21 15.452 20.8994 15.6936 20.7204 15.8718C20.5414 16.0499 20.2986 16.15 20.0455 16.15H19.0909V17.1C19.0909 17.6039 18.8898 18.0872 18.5317 18.4435C18.1737 18.7998 17.6881 19 17.1818 19H3.81818C3.31186 19 2.82627 18.7998 2.46825 18.4435C2.11023 18.0872 1.90909 17.6039 1.90909 17.1V16.15H0.954545C0.701384 16.15 0.458592 16.0499 0.27958 15.8718C0.100568 15.6936 0 15.452 0 15.2V12.35C0 12.098 0.100568 11.8564 0.27958 11.6782C0.458592 11.5001 0.701384 11.4 0.954545 11.4H1.90909C1.90909 9.63631 2.61307 7.94486 3.86615 6.69774C5.11923 5.45062 6.81878 4.75 8.59091 4.75H9.54545V3.5435C8.97273 3.2205 8.59091 2.603 8.59091 1.9C8.59091 1.39609 8.79204 0.912816 9.15007 0.556497C9.50809 0.200178 9.99368 0 10.5 0ZM6.20455 10.45C5.57164 10.45 4.96466 10.7002 4.51713 11.1456C4.0696 11.591 3.81818 12.1951 3.81818 12.825C3.81818 13.4549 4.0696 14.059 4.51713 14.5044C4.96466 14.9498 5.57164 15.2 6.20455 15.2C6.83745 15.2 7.44443 14.9498 7.89196 14.5044C8.33949 14.059 8.59091 13.4549 8.59091 12.825C8.59091 12.1951 8.33949 11.591 7.89196 11.1456C7.44443 10.7002 6.83745 10.45 6.20455 10.45ZM14.7955 10.45C14.1626 10.45 13.5556 10.7002 13.108 11.1456C12.6605 11.591 12.4091 12.1951 12.4091 12.825C12.4091 13.4549 12.6605 14.059 13.108 14.5044C13.5556 14.9498 14.1626 15.2 14.7955 15.2C15.4284 15.2 16.0353 14.9498 16.4829 14.5044C16.9304 14.059 17.1818 13.4549 17.1818 12.825C17.1818 12.1951 16.9304 11.591 16.4829 11.1456C16.0353 10.7002 15.4284 10.45 14.7955 10.45Z"
            fill="#18171C"
          />
        </svg>
        Agents
      </button>
      <div className="h-[0.1px] bg-gray-700 w-full my-4" />
      {email && <RecentChats toggleModal={toggleModal} />}
      <div className="grow flex flex-col gap-1 md:gap-3 justify-end">
        {isIntroOpen && (
          <Introducing toggleVisible={() => setIsIntroOpen(!isIntroOpen)} />
        )}
        {email && <UserInfo />}
      </div>
    </SideModal>
  );
};

export default SideMenu;
