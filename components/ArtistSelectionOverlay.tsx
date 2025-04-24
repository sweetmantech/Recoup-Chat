"use client";

import { useArtistProvider } from "@/providers/ArtistProvider";
import { useEffect, useState } from "react";
import { useSidebarExpansion } from "@/providers/SidebarExpansionContext";
import { usePrivy } from "@privy-io/react-auth";
import useIsMobile from "@/hooks/useIsMobile";
import { ArtistTooltip } from "./common/ArtistTooltip";
import { isArtistSelected } from "@/utils/artistHelpers";

/**
 * Overlay component that dims the UI when no artist is selected
 * Excludes only the artist elements in the sidebar (right side), not the sidebar
 * Works properly with the hover effect of the sidebar
 */
export function ArtistSelectionOverlay() {
  const { selectedArtist, sorted, isOpenSettingModal } = useArtistProvider();
  const { isExpanded } = useSidebarExpansion();
  const { authenticated, ready } = usePrivy();
  const isMobile = useIsMobile();
  const hasArtists = sorted.length > 0;
  const [showTooltip, setShowTooltip] = useState(false);
  
  // Show tooltip after a short delay for better UX
  useEffect(() => {
    // Only show tooltip if no artist is selected AND modal is not open
    // AND user is authenticated AND not on mobile (we have a button for mobile)
    if (!isArtistSelected(selectedArtist) && !isOpenSettingModal && authenticated && ready && !isMobile) {
      const timer = setTimeout(() => {
        setShowTooltip(true);
      }, 800);
      return () => clearTimeout(timer);
    } 
    
    // Hide tooltip in all other cases
    setShowTooltip(false);
  }, [selectedArtist, isOpenSettingModal, authenticated, ready, isMobile]);

  // Early return if artist is selected
  if (isArtistSelected(selectedArtist)) {
    return null;
  }

  return (
    <>
      {/* Non-interactive overlay */}
      <div className="fixed inset-0 z-30 bg-black/80 backdrop-blur-[1px] transition-opacity duration-300 pointer-events-none shadow-inner" />
      
      {/* Tooltip */}
      {showTooltip && !isOpenSettingModal && authenticated && ready && !isMobile && (
        <ArtistTooltip
          isExpanded={isExpanded}
          hasArtists={hasArtists}
          message={hasArtists ? "Select Your Artist" : "Add Your Artist"}
        />
      )}
    </>
  );
}

export default ArtistSelectionOverlay; 