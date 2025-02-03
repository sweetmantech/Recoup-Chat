// eslint-disable-next-line
const getSegmentsTotalSize = (segments: any) => {
  return (
    // eslint-disable-next-line
    segments.reduce((sum: any, segment: any) => sum + segment.size, 0) || 1
  );
};

export default getSegmentsTotalSize;
