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
    <div 
      className={`${position} bg-white text-black px-4 py-2 rounded-lg shadow-lg transition-all duration-300 flex items-center animate-bounce-gentle`}
      style={{ 
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        border: '1px solid rgba(0, 0, 0, 0.1)'
      }}
    >
      <span className="font-medium whitespace-nowrap">{message}</span>
      <span className="ml-2 text-xl">👉</span>
      <div className={`absolute ${arrowStyle}`} />
    </div>
  );
}; 