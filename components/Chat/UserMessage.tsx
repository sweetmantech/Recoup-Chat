import type { Message } from "@ai-sdk/react";
import Markdown from "react-markdown";
import remarkGfm from 'remark-gfm';
import styles from "./markdown.module.css";

interface UserMessageProps {
  message: Message;
}

const UserMessage = ({ message }: UserMessageProps) => {
  return (
    <div className={styles.markdown}>
      <Markdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ ...props }) => (
            <a 
              {...props} 
              target="_blank" 
              rel="noopener noreferrer"
            />
          )
        }}
      >
        {decodeURIComponent(message.content.replaceAll("%", "&#37;") || "")}
      </Markdown>
    </div>
  );
};

export default UserMessage;
