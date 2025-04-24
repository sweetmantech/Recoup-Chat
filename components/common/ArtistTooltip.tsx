"use client";

import { getTooltipPositioning } from "@/utils/tooltipPositioning";

interface ArtistTooltipProps {
  isExpanded: boolean;
  hasArtists: boolean;
  message: string;
}

export const ArtistTooltip = ({
  isExpanded,
  hasArtists,
  message,
}: ArtistTooltipProps) => {
  const { position, arrowStyle } = getTooltipPositioning(isExpanded, hasArtists);

  return (
    <div className={`fixed ${position} z-50 bg-white text-black px-4 py-2 rounded-lg shadow-lg transition-all duration-300 flex items-center`}>
      <span className="font-medium">{message}</span>
      <span className="ml-2 text-xl">👉</span>
      <div className={`absolute ${arrowStyle}`} />
    </div>
  );
}; 