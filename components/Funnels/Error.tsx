import { useArtistProvider } from "@/providers/ArtistProvider";
import { STEP_OF_AGENT } from "@/types/Funnel";

const Error = ({ status }: { status: number }) => {
  const { selectedArtist } = useArtistProvider();

  return (
    <>
      {status === STEP_OF_AGENT.MISSING_POSTS &&
        `The account @${selectedArtist?.name} does not have any engagement. Please try again with a handle with at least one comment on its videos. `}
      {(status === STEP_OF_AGENT.UNKNOWN_PROFILE ||
        status === STEP_OF_AGENT.ERROR) &&
        `There's too many agent runnings right now. Please, try it later.`}
    </>
  );
};

export default Error;
