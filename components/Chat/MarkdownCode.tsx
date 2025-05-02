import React from "react";
import { type Components } from "react-markdown";
import MermaidDiagram from "./mermaid/MermaidDiagram";

interface CodeBlockProps extends React.HTMLAttributes<HTMLElement> {
  inline?: boolean;
}

const MarkdownCode: Components['code'] = (props: CodeBlockProps) => {
  const { inline, className, children } = props;

    if(className?.includes('mermaid')){
      return (
        <div style={{ backgroundColor: 'white', border: 'none' }}>
          <MermaidDiagram chart={children as string} />
        </div>
      );
    }

  if (!inline) {
    return (
      <pre className="max-w-full overflow-x-auto p-4 bg-gray-100 rounded-md my-2">
        <code className={className}>
          {children}
        </code>
      </pre>
    );
  }
  
  return (
    <code className="px-1 py-0.5 rounded-sm bg-gray-100">
      {children}
    </code>
  );
};

export default MarkdownCode; 