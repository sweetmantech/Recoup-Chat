'use client';

import React from 'react';
import MermaidErrorFallback from './MermaidErrorFallback'; // Import the fallback component
import { GenerateMermaidDiagramResult } from '@/lib/tools/generateMermaidDiagram';
import { useMermaid } from '@/hooks/useMermaid';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Download } from 'lucide-react';
import handleDownload from '@/lib/utils/download-mermaid-chart';

// Define a type for the global mermaid object, or use any if types aren't installed
declare global {
  interface Window {
    mermaid?: {
      run: (options: { nodes: HTMLElement[] }) => void;
      initialize: (config: Record<string, unknown>) => void;
      // Add other methods you might use
    };
  }
}

interface MermaidDiagramProps {
  /** The Mermaid diagram definition string. */
  chart: string;
  /** Optional unique ID for the diagram wrapper. */
  id?: string;
}

/**
 * Renders a Mermaid diagram from a definition string.
 * Dynamically imports the Mermaid library on mount.
 */
const MermaidDiagramInternal: React.FC<MermaidDiagramProps> = ({ chart, id }) => {
  const { isLibraryLoaded, hasError, containerRef, uniqueId } = useMermaid({
    id,
    chart
  });

  // Conditional rendering: Show fallback on error, otherwise the diagram container
  if (hasError) {
    return <MermaidErrorFallback />;
  }

  // Render the container pre element (initially hidden, made visible on success)
  return (
    <div className="relative group">
      <pre
        ref={containerRef}
        id={uniqueId}
        className="mermaid"
        // Hide until library loaded and rendered successfully
        style={{ visibility: (isLibraryLoaded && !hasError) ? 'visible' : 'hidden', backgroundColor: 'white', border: 'none', padding: '0' }}
      >
        {chart}
      </pre>
      {isLibraryLoaded && !hasError && (
        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 z-20 md:rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-gray-200/50"
                onClick={() => handleDownload({ containerRef })}
                aria-label="Download image"
              >
                <Download className="h-4 w-4 text-gray-700" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Download</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
      <div className="absolute z-10 transition-opacity duration-300 opacity-0 group-hover:opacity-100 group-focus:opacity-100 focus-within:opacity-100 end-0 top-0 w-full">
        <div className="bg-gradient-to-t from-transparent to-black/5 h-20 w-full md:rounded-t-2xl" />
      </div>
    </div>
  );
};

const MermaidDiagram = ({ result }: { result: GenerateMermaidDiagramResult }) => {
  const { content, isError } = result;

  if (isError) {
    return <MermaidErrorFallback />;
  }
  const chart = content[0].text;
  const mermaidDiagramWithoutCodeBlock = chart.replace(/```mermaid\n([\s\S]*?)```/g, '$1').trim();

  return <MermaidDiagramInternal chart={mermaidDiagramWithoutCodeBlock} />
}

export default MermaidDiagram; 