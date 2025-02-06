const getThoughtStatus = (progress: number) => {
  if (progress < 25) return `Looking at overlays and captions.`;
  if (progress < 40) return `Looking at overlays and captions.`;
  if (progress < 60) return `Calculating engagement rates for recent posts.`;
  if (progress < 80) return `Analyzing comments on videos.`;
  return `Finalizing artist analysis.`;
};

export default getThoughtStatus;
