import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useArtistProvider } from "@/providers/ArtistProvider";
import { useAgentsProvider } from "@/providers/AgentsProvider";
import { useFunnelAnalysisProvider } from "@/providers/FunnelAnalysisProvider";

const TAGS = [
  "Recommended",
  "Brand",
  "Growth",
  "Revenue",
  "Strategy",
  "Social",
  "Spotify",
  "Sentiment",
  "Creative",
];

// Define Agent type inline for type safety
interface Agent {
  title: string;
  description: string;
  prompt: string;
  tags?: string[];
  status?: string;
  isActive: boolean;
}

const Agents = () => {
  const { push } = useRouter();
  const [agents, setAgents] = useState<Agent[]>([]);
  const [selectedTag, setSelectedTag] = useState("Recommended");
  const [loading, setLoading] = useState(true);
  const { selectedArtist } = useArtistProvider();
  const { lookupProfiles } = useAgentsProvider();
  const { setIsLoading } = useFunnelAnalysisProvider();

  useEffect(() => {
    fetch("/agents.json")
      .then((res) => res.json())
      .then((data) => {
        setAgents(data);
        setLoading(false);
      });
  }, []);

  // Find the Fan Segmentation Analysis (360 Wrapped) agent
  const funnelAgent = agents.find(
    (agent) => agent.title === "Fan Segmentation Analysis" && agent.isActive
  );
  // Filter out Fan Segmentation Analysis from the main grid
  const filteredAgents = agents.filter(
    (agent) =>
      agent.isActive &&
      agent.title !== "Fan Segmentation Analysis" &&
      (selectedTag === "Recommended" ? true : agent.tags?.includes(selectedTag))
  );
  // Prepare grid agents: Fan Segmentation Analysis first if active, then the rest
  const gridAgents = [
    ...(funnelAgent ? [funnelAgent] : []),
    ...filteredAgents
  ];

  const handleAgentClick = (agent: Agent) => {
    push(
      `/chat?source=agent&agentName=${encodeURIComponent(
        agent.title
      )}&starterPrompt=${encodeURIComponent(agent.prompt)}`
    );
  };

  const handleClick = (funnelName: string) => {
    if (selectedArtist) {
      setIsLoading(true);
      lookupProfiles(funnelName);
      return;
    }
    push(`/funnels/${funnelName}`);
  };

  return (
    <div className="max-w-full md:max-w-[calc(100vw-200px)] grow py-6 px-2 md:px-10">
      <p className="text-center md:text-left font-plus_jakarta_sans_bold text-3xl">
        Agents
      </p>
      <p className="text-base md:text-lg text-gray-400 text-center md:text-left mb-6 font-normal">
        Unlock the potential of your roster with intelligent, task-focused agents.
      </p>
      <div className="flex flex-wrap gap-2 mb-8">
        {TAGS.map((tag) => (
          <button
            key={tag}
            type="button"
            className={`px-3 py-1 rounded-full border text-sm transition-colors ${
              selectedTag === tag
                ? "bg-black text-white border-black"
                : "bg-white text-black border-gray-200 hover:bg-gray-100"
            }`}
            onClick={() => setSelectedTag(tag)}
          >
            {tag}
          </button>
        ))}
      </div>
      <div className="border-b border-gray-100 mb-8" />
      <div className="mt-16" />
      {/* Remove special 360 Wrapped card rendering */}
      {loading ? (
        <div className="text-center text-gray-400">Loading agents...</div>
      ) : gridAgents.length === 0 ? (
        <div className="text-center text-gray-400">No agents found for this tag.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-10 px-2 md:px-10 md:max-w-[calc(100vw-200px)]">
          {gridAgents.map((agent) => (
            <button
              key={agent.title}
              type="button"
              className="w-full text-left bg-white border border-gray-200 rounded-lg p-4 shadow-none hover:shadow-md hover:-translate-y-1 hover:bg-gray-50 transition-all"
              onClick={() =>
                agent.title === "Fan Segmentation Analysis"
                  ? handleClick("wrapped")
                  : handleAgentClick(agent)
              }
            >
              <div className="text-lg mb-1 font-medium">
                {agent.title}
              </div>
              <div className="text-gray-400 text-sm">{agent.description}</div>
            </button>
          ))}
        </div>
      )}
      <div className="mb-16" />
    </div>
  );
};

export default Agents;
