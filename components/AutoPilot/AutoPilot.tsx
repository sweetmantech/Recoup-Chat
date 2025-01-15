"use client";

import { Terminal } from "lucide-react";
import CurrentState from "./CurrentState";
import { useArtistProvider } from "@/providers/ArtistProvider";
import Artists from "./Artists";
import Events from "./Events";
import Approvals from "./Approvals";
import ArtistsSidebar from "./ArtistsSidebar";

const AutoPilot = () => {
  const { selectedArtist } = useArtistProvider();

  return (
    <div className="grow flex h-[calc(100vh-56px)] md:h-screen overflow-hidden md:bg-background md:p-4">
      <div className="size-full bg-white overflow-y-auto md:rounded-xl flex flex-col md:shadow-[0px_0px_7px_0px_#80808063]">
        <div className="grow font-mono p-3 md:p-4 rounded-lg flex flex-col">
          <div className="flex items-center gap-2 mb-2 md:mb-4 pb-2 md:pb-4">
            <Terminal className="h-5 w-5" />
            <h1 className="text-md md:text-lg font-plus_jakarta_sans_bold">
              {selectedArtist
                ? `${selectedArtist?.name}'s Agent`
                : "Peek Into Recoup's Brain"}
            </h1>
          </div>
          {selectedArtist ? (
            <div className="flex flex-col md:block md:grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 h-full grow">
              <div className="space-y-1 md:space-y-4">
                <CurrentState />
                <Events />
              </div>
              <Approvals />
            </div>
          ) : (
            <Artists />
          )}
        </div>
      </div>
      <ArtistsSidebar />
    </div>
  );
};

export default AutoPilot;
