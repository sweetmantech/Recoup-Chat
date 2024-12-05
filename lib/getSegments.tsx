import getFanSegments from "./getFanSegments";
import getSegmentsIcons from "./getSegmentsIcons";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getSemgnets = async (profileWithComments: any) => {
  const fanSegments = await getFanSegments(profileWithComments);
  const fanSegmentsWithIcons = await getSegmentsIcons(fanSegments);

  return fanSegmentsWithIcons;
};

export default getSemgnets;
