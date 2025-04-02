import type { Message } from "@ai-sdk/react";

interface UserMessageProps {
  message: Message;
}

const UserMessage = ({ message }: UserMessageProps) => {
  return (
    <div
      className="text-sm font-sans text-pretty break-words"
      dangerouslySetInnerHTML={{
        __html: decodeURIComponent(
          message.content.replaceAll("%", "&#37;") || ""
        ),
      }}
    />
  );
};

export default UserMessage;
