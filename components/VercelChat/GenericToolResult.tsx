import { CircleCheck } from "lucide-react";

interface ToolCallProps {
    toolName: string;
    toolCallId: string;
}

function getToolInfo(toolName: string): { message: string } {
    // Spotify related tools
    if (toolName.includes('spotify')) {
        return {
            message: "Music data retrieved"
        };
    }
    // Artist data tools
    else if (toolName === "get_artist_segments" ||
        toolName === "get_artist_socials" ||
        toolName === "create_new_artist" ||
        toolName === "delete_artist") {
        return {
            message: "Artist data processed"
        };
    }
    // Segment and fans tools
    else if (toolName === "get_segment_fans") {
        return {
            message: "Fan data analyzed"
        };
    }
    // Social media content tools
    else if (toolName === "get_social_posts" || toolName === "get_post_comments") {
        return {
            message: "Social content analyzed"
        };
    }
    // Contact team
    else if (toolName === "contact_team") {
        return {
            message: "Team contacted"
        };
    }
    // Perplexity
    else if (toolName === "perplexity_ask") {
        return {
            message: "Information retrieved"
        };
    }
    // Default for any other tool
    else {
        return {
            message: "Data processed"
        };
    }
}


export function GenericToolResult({ toolName, toolCallId }: ToolCallProps) {
    const { message } = getToolInfo(toolName);

    return (
        <div key={toolCallId} className="flex items-center gap-1 py-1 px-2 bg-primary/5 rounded-sm border w-fit text-xs">
            <CircleCheck className="h-3 w-3 text-primary" />
            <span>{message}</span>
        </div>
    );
}