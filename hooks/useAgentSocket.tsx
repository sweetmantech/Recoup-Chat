import getExistingHandles from "@/lib/getExistingHandles";
import getHandles from "@/lib/getHandles";
import { useArtistProvider } from "@/providers/ArtistProvider";
import { useFunnelAnalysisProvider } from "@/providers/FunnelAnalysisProvider";
import { useUserProvider } from "@/providers/UserProvder";
import { STEP_OF_ANALYSIS } from "@/types/TikTok";
import { useRouter } from "next/navigation";
import { v4 as uuidV4 } from "uuid";
import useSockets from "./useSockets";

const useAgentSocket = () => {
  const { artistHandle, setThoughts, setUsername } =
    useFunnelAnalysisProvider();
  const { push } = useRouter();
  const { userData, address, isPrepared } = useUserProvider();
  const { setSelectedArtist, selectedArtist } = useArtistProvider();
  const { socketIo, socketId } = useSockets();

  const openAgentSocket = async (funnelType: string) => {
    if (!isPrepared()) return;
    const newChatId = uuidV4();
    push(`/funnels/${funnelType}/${newChatId}`);
    const existingHandles = getExistingHandles(selectedArtist);
    const handle = selectedArtist?.name || artistHandle;
    const handles = await getHandles(selectedArtist?.name || artistHandle);
    const isWrapped = funnelType === "wrapped";
    if (isWrapped) {
      setThoughts({
        twitter: { status: STEP_OF_ANALYSIS.INITITAL },
        spotify: { status: STEP_OF_ANALYSIS.INITITAL },
        tiktok: { status: STEP_OF_ANALYSIS.INITITAL },
        instagram: { status: STEP_OF_ANALYSIS.INITITAL },
        wrapped: { status: STEP_OF_ANALYSIS.INITITAL },
      });
      const funnels = ["twitter", "spotify", "tiktok", "instagram"];
      funnels.map((funnel) => {
        socketIo.emit(`${funnel.toUpperCase()}_ANALYSIS`, socketId, {
          handle:
            existingHandles[`${funnel}`] ||
            handles[`${funnel}`].replaceAll("@", "") ||
            handle,
          chat_id: newChatId,
          account_id: userData?.id,
          address,
          isWrapped,
          existingArtistId: selectedArtist?.id,
        });
      });
    } else {
      setThoughts({
        [`${funnelType}`]: {
          status: STEP_OF_ANALYSIS.INITITAL,
        },
      });
      const agentHandle =
        existingHandles[`${funnelType}`] ||
        handles[`${funnelType}`].replaceAll("@", "") ||
        handle ||
        "";
      setUsername(agentHandle);
      setSelectedArtist({
        ...selectedArtist,
        name: agentHandle,
      } as any);
      socketIo.emit(`${funnelType.toUpperCase()}_ANALYSIS`, socketId, {
        handle: agentHandle,
        chat_id: newChatId,
        account_id: userData?.id,
        address,
        isWrapped,
        existingArtistId: selectedArtist?.id,
      });
    }
  };

  return {
    socketId,
    openAgentSocket,
  };
};

export default useAgentSocket;
