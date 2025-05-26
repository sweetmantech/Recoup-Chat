import { useEffect, useState } from "react";

// Define Agent type for agent metadata loaded from agents.json
export interface Agent {
  title: string;
  description: string;
  prompt: string;
  tags?: string[];
}

const CORE_TAGS = [
  "Recommended",
  "Brand",
  "Growth",
  "Revenue",
  "Strategy",
  "Social",
  "Spotify",
  "Sentiment",
  "Creative"
];

export function useAgentData() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [selectedTag, setSelectedTag] = useState("Recommended");
  const [loading, setLoading] = useState(true);
  const [tags, setTags] = useState<string[]>(["Recommended"]);
  const [showAllTags, setShowAllTags] = useState(false);

  useEffect(() => {
    fetch("/agents.json")
      .then((res) => res.json())
      .then((data: Agent[]) => {
        setAgents(data);
        // Build a unique tag list from all agents, always including 'Recommended' first
        const uniqueTags = Array.from(
          new Set(
            data
              .flatMap((agent: Agent) => agent.tags || [])
              .filter((tag: string) => !!tag)
          )
        );
        const allTags = ["Recommended", ...uniqueTags];
        setTags(Array.from(new Set(allTags)));
        setLoading(false);
      });
  }, []);

  const coreTags = tags.filter(tag => CORE_TAGS.includes(tag));
  const extraTags = tags.filter(tag => !CORE_TAGS.includes(tag));

  // Find the special "Fan Segmentation Analysis" agent (always shown first if present)
  const funnelAgent = agents.find(
    (agent) => agent.title === "Fan Segmentation Analysis"
  );
  // Get all agents except the special card, filtered by the selected tag
  const filteredAgents = agents.filter(
    (agent) =>
      agent.title !== "Fan Segmentation Analysis" &&
      (selectedTag === "Recommended" ? true : agent.tags?.includes(selectedTag))
  );
  // Combine the special card (if present) with the filtered agents for display
  const gridAgents = [
    ...(funnelAgent ? [funnelAgent] : []),
    ...filteredAgents
  ];

  return {
    agents,
    tags,
    selectedTag,
    setSelectedTag,
    loading,
    showAllTags,
    setShowAllTags,
    coreTags,
    extraTags,
    gridAgents,
    filteredAgents,
  };
} 