import { getDisplayToolName } from "@/lib/tools/get-tools-name";
import { Database, Search, Users, FileText } from "lucide-react";

interface ToolCallProps {
    toolName: string;
    toolCallId: string;
}

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


export function GenericToolResult({ toolName, toolCallId }: ToolCallProps) {
    const { icon, message } = getToolInfo(toolName);

    return (
        <div key={toolCallId} className="flex items-center gap-1 p-2 border rounded-md w-fit bg-primary/5">
            {icon}
            <div className="flex flex-col">
                <div className="text-xs font-medium">{getDisplayToolName(toolName)}</div>
                <div className="text-[10px] text-gray-500">{message}</div>
            </div>
        </div>
    );
}