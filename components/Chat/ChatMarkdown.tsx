import React from "react";
import Markdown from "react-markdown";
import remarkGfm from 'remark-gfm';
import styles from "./markdown.module.css";

interface ChatMarkdownProps {
  children: string;
}

const ChatMarkdown: React.FC<ChatMarkdownProps> = ({ children }) => {
  return (
    <div className={`${styles.markdown} w-full max-w-full overflow-hidden`}>
      <Markdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ ...props }) => (
            <a 
              {...props} 
              target="_blank" 
              rel="noopener noreferrer"
            />
          ),
          pre: ({ ...props }) => (
            <pre className="max-w-full overflow-x-auto p-4 bg-gray-100 rounded-md my-2" {...props} />
          ),
          // @ts-expect-error - We need to handle code blocks with better styling
          code: ({ inline, className, children, ...props }) => {
            return !inline ? (
              <pre className="max-w-full overflow-x-auto p-4 bg-gray-100 rounded-md my-2">
                <code className={className} {...props}>
                  {children}
                </code>
              </pre>
            ) : (
              <code className="px-1 py-0.5 rounded-sm bg-gray-100" {...props}>
                {children}
              </code>
            );
          },
          img: ({ ...props }) => (
            <img className="max-w-full h-auto" {...props} alt={props.alt || ''} />
          )
        }}
      >
        {children}
      </Markdown>
    </div>
  );
};

export default ChatMarkdown; 