import React from "react";
import Markdown from "react-markdown";
import remarkGfm from 'remark-gfm';
import styles from "./markdown.module.css";
import MarkdownA from "./MarkdownA";
import MarkdownPre from "./MarkdownPre";
import MarkdownCode from "./MarkdownCode";
import MarkdownImg from "./MarkdownImg";
import MarkdownTable from "./MarkdownTable";

interface ChatMarkdownProps {
  children: string;
}

const ChatMarkdown: React.FC<ChatMarkdownProps> = ({ children }) => {
  return (
    <div className={`${styles.markdown} w-full max-w-full overflow-hidden`}>
      <Markdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ ...props }) => <MarkdownA {...props} />,
          pre: ({ ...props }) => <MarkdownPre {...props} />,
          // @ts-expect-error - Types between react-markdown and our component don't align perfectly
          code: ({ inline, className, children, ...props }) => (
            <MarkdownCode inline={inline} className={className} {...props}>
              {children}
            </MarkdownCode>
          ),
          img: ({ ...props }) => <MarkdownImg {...props} />,
          table: ({ ...props }) => <MarkdownTable {...props} />
        }}
      >
        {children}
      </Markdown>
    </div>
  );
};

export default ChatMarkdown; 