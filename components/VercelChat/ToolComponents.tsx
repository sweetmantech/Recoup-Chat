import { ImageSkeleton } from "@/components/ui/ImageSkeleton";
import { ImageResult } from "@/components/ui/ImageResult";
import { ImageGenerationResult } from "@/lib/tools/generateImage";
import MermaidDiagram from "../Chat/mermaid/MermaidDiagram";
import { GenerateMermaidDiagramResult } from "@/lib/tools/generateMermaidDiagram";
import { MermaidDiagramSkeleton } from "../ui/MermaidDiagramSkeleton";
import CreateArtistToolCall from "./tools/CreateArtistToolCall";
import CreateArtistToolResult from "./tools/CreateArtistToolResult";
import { CreateArtistResult } from "@/lib/tools/createArtist";
import DeleteArtistToolCall from "./tools/DeleteArtistToolCall";
import DeleteArtistToolResult from "./tools/DeleteArtistToolResult";
import { DeleteArtistResult } from "@/lib/tools/deleteArtist";
import GetSpotifySearchToolResult from "./tools/GetSpotifySearchToolResult";
import { SpotifySearchResponse } from "@/types/spotify";
import { ToolInvocation } from "ai";
import { Loader, Database, Search, Users, Calendar, FileText } from "lucide-react";
import { getDisplayToolName } from "@/lib/tools/get-tools-name";

/**
 * Interface for tool call props
 */
interface ToolCallProps {
  toolName: string;
  toolCallId: string;
}

/**
 * Union type for all possible tool results
 */
type ToolResult =
  | ImageGenerationResult
  | GenerateMermaidDiagramResult
  | CreateArtistResult
  | DeleteArtistResult
  | Record<string, unknown>;

/**
 * Interface for tool result props
 */
interface ToolResultProps extends ToolCallProps {
  result: ToolResult;
}

/**
 * Get appropriate icon and message for a tool type
 */
function getToolInfo(toolName: string): { icon: React.ReactNode; message: string } {
  // Spotify related tools
  if (toolName.includes('spotify')) {
    return { 
      icon: <Search className="h-4 w-4 text-green-500" />,
      message: "Music data retrieved" 
    };
  }
  // Artist data tools
  else if (toolName === "get_artist_segments" || 
      toolName === "get_artist_socials" || 
      toolName === "create_new_artist" || 
      toolName === "delete_artist") {
    return { 
      icon: <Users className="h-4 w-4 text-purple-500" />,
      message: "Artist data processed" 
    };
  }
  // Segment and fans tools
  else if (toolName === "get_segment_fans") {
    return { 
      icon: <Users className="h-4 w-4 text-blue-500" />,
      message: "Fan data analyzed" 
    };
  }
  // Social media content tools
  else if (toolName === "get_social_posts" || toolName === "get_post_comments") {
    return { 
      icon: <FileText className="h-4 w-4 text-orange-500" />,
      message: "Social content analyzed" 
    };
  }
  // Image generation
  else if (toolName === "generate_image") {
    return { 
      icon: <Calendar className="h-4 w-4 text-green-500" />,
      message: "Image generated" 
    };
  }
  // Diagram generation
  else if (toolName === "generate_mermaid_diagram") {
    return { 
      icon: <Calendar className="h-4 w-4 text-green-500" />,
      message: "Diagram generated" 
    };
  }
  // Contact team
  else if (toolName === "contact_team") {
    return { 
      icon: <Users className="h-4 w-4 text-blue-500" />,
      message: "Team contacted" 
    };
  }
  // Perplexity
  else if (toolName === "perplexity_ask") {
    return { 
      icon: <Search className="h-4 w-4 text-blue-500" />,
      message: "Information retrieved" 
    };
  }
  // Default for any other tool
  else {
    return { 
      icon: <Database className="h-4 w-4 text-green-500" />,
      message: "Data processed" 
    };
  }
}

/**
 * Helper function to get the appropriate UI component for a tool call
 */

export function getToolCallComponent({ toolName, toolCallId }: ToolInvocation) {
  // Handle generate_image tool call
  if (toolName === "generate_image") {
    return (
      <div key={toolCallId} className="skeleton">
        <ImageSkeleton />
      </div>
    );
  } else if (toolName === "generate_mermaid_diagram") {
    return (
      <div key={toolCallId}>
        <MermaidDiagramSkeleton />
      </div>
    );
  } else if (toolName === "create_new_artist") {
    return (
      <div key={toolCallId}>
        <CreateArtistToolCall />
      </div>
    );
  } else if (toolName === "delete_artist") {
    return (
      <div key={toolCallId}>
        <DeleteArtistToolCall />
      </div>
    );
  }

  // Default for other tools
  return (
    <div key={toolCallId} className="flex items-center gap-2 p-3 bg-background">
      <Loader className="h-4 w-4 animate-spin text-primary" />
      <div className="text-sm font-medium">
        Using {getDisplayToolName(toolName)}...
      </div>
    </div>
  );
}

/**
 * Generic tool result component
 */
export function GenericToolResult({ toolName, toolCallId }: ToolCallProps) {
  const { icon, message } = getToolInfo(toolName);
  
  return (
    <div key={toolCallId} className="flex items-center gap-2 p-3 bg-background border border-gray-100 dark:border-gray-800 rounded-md">
      {icon}
      <div className="flex flex-col">
        <div className="text-sm font-medium">{getDisplayToolName(toolName)}</div>
        <div className="text-xs text-gray-500">{message}</div>
      </div>
    </div>
  );
}

/**
 * Helper function to get the appropriate UI component for a tool result
 */
export function getToolResultComponent({
  toolName,
  toolCallId,
  result,
}: ToolResultProps) {
  if (toolName === "generate_image") {
    return (
      <div key={toolCallId}>
        <ImageResult result={result as ImageGenerationResult} />
      </div>
    );
  } else if (toolName === "generate_mermaid_diagram") {
    return (
      <div key={toolCallId}>
        <MermaidDiagram result={result as GenerateMermaidDiagramResult} />
      </div>
    );
  } else if (toolName === "create_new_artist") {
    return (
      <div key={toolCallId}>
        <CreateArtistToolResult result={result as CreateArtistResult} />
      </div>
    );
  } else if (toolName === "delete_artist") {
    return (
      <div key={toolCallId}>
        <DeleteArtistToolResult result={result as DeleteArtistResult} />
      </div>
    );
  } else if (toolName === "get_spotify_search") {
    return (
      <div key={toolCallId}>
        <GetSpotifySearchToolResult result={result as SpotifySearchResponse} />
      </div>
    );
  }
  
  // Default generic result for other tools
  return <GenericToolResult toolName={toolName} toolCallId={toolCallId} />;
}

/**
 * Main ToolComponents component - Export a single object with all tool-related UI components
 */
export const ToolComponents = {
  getToolCallComponent,
  getToolResultComponent,
  GenericToolResult,
};

export default ToolComponents;
