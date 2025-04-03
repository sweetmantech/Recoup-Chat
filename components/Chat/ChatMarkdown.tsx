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
            <pre className="max-w-full overflow-x-auto" {...props} />
          ),
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