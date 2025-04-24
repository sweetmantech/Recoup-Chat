interface TooltipPosition {
  position: string;
  arrowStyle: string;
}

export const getTooltipPositioning = (
  isExpanded: boolean,
  hasArtists: boolean,
): TooltipPosition => {
  // Arrow pointing to the right
  const arrowStyle = 'w-0 h-0 border-y-[16px] border-l-[16px] border-y-transparent border-l-white absolute -right-4 top-1/2 -translate-y-1/2';
  
  return {
    position: '',  // Position is now handled by the parent container
    arrowStyle,
  };
}; 