interface TooltipPosition {
  position: string;
  arrowStyle: string;
}

export const getTooltipPositioning = (
  isExpanded: boolean,
  hasArtists: boolean,
): TooltipPosition => {
  // Arrow pointing to the right
  const arrowStyle = 'border-t-8 border-b-8 border-l-8 border-t-transparent border-b-transparent border-l-white -right-2 top-1/2 transform -translate-y-1/2';
  
  return {
    position: '',  // Position is now handled by the parent container
    arrowStyle,
  };
}; 