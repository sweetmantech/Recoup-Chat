import { ImageSkeleton } from "@/components/ui/ImageSkeleton";
import { ImageResult } from "@/components/ui/ImageResult";
import { ImageGenerationResult } from "@/lib/tools/generateImage";
import MermaidDiagram from "../Chat/mermaid/MermaidDiagram";
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
type ToolResult = ImageGenerationResult | Record<string, unknown>;

/**
 * Interface for tool result props
 */
interface ToolResultProps extends ToolCallProps {
  result: ToolResult;
}

/**
 * Helper function to get the appropriate UI component for a tool call
 */
export function getToolCallComponent({ toolName, toolCallId }: ToolCallProps) {
  // Handle generate_image tool call
  if (toolName === "generate_image") {
    return (
      <div key={toolCallId} className="skeleton">
        <ImageSkeleton />
      </div>
    );
  }

  // Default for other tools
  return (
    <div key={toolCallId}>
      <div className="text-sm text-gray-500">Using {toolName}...</div>
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
  // console.log('getToolResultComponent', {
  //   toolName,
  //   toolCallId,
  //   result
  // });
  // Handle generate_image tool result
  if (toolName === "generate_image") {
    return (
      <div key={toolCallId}>
        <ImageResult result={result as ImageGenerationResult} />
      </div>
    );
  } else if (toolName === "generate_mermaid_diagram") {
    console.log('generate_mermaid_diagram1 result', result);
    // @ts-expect-error For testing purposes
    if (!result.isError) {
      // @ts-expect-error For testing purposes
      const type = result.content[0].type;
      console.log('generate_mermaid_diagram1 type', type);
      if (type === 'text') {
        // @ts-expect-error For testing purposes
        const mermaidDiagram = result.content[0].text
        console.log('generate_mermaid_diagram1 mermaidDiagram', mermaidDiagram);
        const mermaidDiagramWithoutCodeBlock = mermaidDiagram.replace(/```mermaid\n([\s\S]*?)```/g, '$1').trim();
        return (
          <div key={toolCallId}>
            <MermaidDiagram chart={mermaidDiagramWithoutCodeBlock} />
          </div>
        );
      }
    } else {
      return null
    }
  }
}

/**
 * Main ToolComponents component - Export a single object with all tool-related UI components
 */
export const ToolComponents = {
  getToolCallComponent,
  getToolResultComponent,
};

export default ToolComponents;
