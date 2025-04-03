import React from "react";

interface MarkdownTableProps {
  children?: React.ReactNode;
}

const MarkdownTable: React.FC<MarkdownTableProps & React.TableHTMLAttributes<HTMLTableElement>> = ({ 
  children,
  ...props 
}) => {
  return (
    <div className="overflow-x-auto w-full max-w-full">
      <table className="w-full" {...props}>
        {children}
      </table>
    </div>
  );
};

export default MarkdownTable; 