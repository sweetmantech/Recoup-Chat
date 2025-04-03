import React from "react";

interface MarkdownCodeProps {
  children?: React.ReactNode;
  inline?: boolean;
  className?: string;
}

const MarkdownCode: React.FC<MarkdownCodeProps & React.HTMLAttributes<HTMLElement>> = ({ 
  children,
  inline,
  className,
  ...props 
}) => {
  if (!inline) {
    return (
      <pre className="max-w-full overflow-x-auto p-4 bg-gray-100 rounded-md my-2">
        <code className={className} {...props}>
          {children}
        </code>
      </pre>
    );
  }
  
  return (
    <code className="px-1 py-0.5 rounded-sm bg-gray-100" {...props}>
      {children}
    </code>
  );
};

export default MarkdownCode; 