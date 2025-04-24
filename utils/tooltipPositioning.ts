interface TooltipPosition {
  position: string;
  arrowStyle: string;
}

export const getTooltipPositioning = (
  isExpanded: boolean,
  hasArtists: boolean,
): TooltipPosition => {
  // Base positions for expanded and collapsed states
  const expandedPosition = hasArtists ? 'top-8 right-48' : 'bottom-4 right-48';
  const collapsedPosition = hasArtists ? 'top-8 right-20' : 'bottom-4 right-20';
  
  // Standard arrow style for rightward-pointing arrow
  const arrowStyle = 'border-t-8 border-b-8 border-l-8 border-t-transparent border-b-transparent border-l-white -right-2 top-1/2 transform -translate-y-1/2';
  
  return {
    position: isExpanded ? expandedPosition : collapsedPosition,
    arrowStyle,
  };
}; 