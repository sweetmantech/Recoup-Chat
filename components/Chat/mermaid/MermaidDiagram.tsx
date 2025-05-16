'use client';

import React, { useCallback } from 'react';
import MermaidErrorFallback from './MermaidErrorFallback'; // Import the fallback component
import { GenerateMermaidDiagramResult } from '@/lib/tools/generateMermaidDiagram';
import { useMermaid } from '@/hooks/useMermaid';

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

  // Download handler
  const handleDownload = useCallback(() => {
    if (!containerRef.current) return;

    const svgElement = containerRef.current.querySelector('svg');
    if (!svgElement) {
      console.error('Could not find SVG element to download.');
      return;
    }

    // Serialize the SVG
    const serializer = new XMLSerializer();
    let svgString = serializer.serializeToString(svgElement);

    // Add XML declaration and potentially namespace if missing
    if (!svgString.startsWith('<?xml')) {
      svgString = '<?xml version="1.0" standalone="no"?>\n' + svgString;
    }
    if (!svgString.includes('xmlns="http://www.w3.org/2000/svg"')) {
      svgString = svgString.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
    }

    // Create a Blob
    const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });

    // Create an object URL
    const url = URL.createObjectURL(blob);

    // Create a temporary anchor element and trigger download
    const a = document.createElement('a');
    a.href = url;
    a.download = `${uniqueId}.svg`;
    document.body.appendChild(a);
    a.click();

    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [uniqueId]);

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
        <button
          onClick={handleDownload}
          className="absolute top-2 right-2 bg-gray-700 hover:bg-gray-600 text-white text-xs font-semibold py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          title="Download SVG"
          aria-label="Download diagram as SVG"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
        </button>
      )}
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