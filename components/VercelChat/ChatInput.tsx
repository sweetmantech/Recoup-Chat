"use client";

import cn from "classnames";
import { Input } from "./input";
import { ArrowUpIcon, StopIcon } from "./icons";
import { useArtistProvider } from "@/providers/ArtistProvider";
import { Button } from "../ui/button";
import { PaperclipIcon } from "lucide-react";
import { useRef } from "react";
import { PreviewAttachment } from "./preview-attachment";
import { useVercelChatContext } from "@/providers/VercelChatProvider";
import { Attachment } from "@ai-sdk/ui-utils";

interface ChatInputProps {
  onSendMessage: (event: React.FormEvent<HTMLFormElement>) => void;
  isGeneratingResponse: boolean;
  onStop: () => void;
  setInput: (input: string) => void;
  input: string;
}

export function ChatInput({
  onSendMessage,
  isGeneratingResponse,
  onStop,
  setInput,
  input,
}: ChatInputProps) {
  // Access the artist state to check if an artist is selected
  const { selectedArtist } = useArtistProvider();
  const { hasPendingUploads } = useVercelChatContext();
  const isDisabled = !selectedArtist;

  // Create a form ref to submit the form programmatically
  const formRef = useRef<HTMLFormElement>(null);

  const handleSend = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (input === "" || isDisabled || hasPendingUploads) return;

    if (isGeneratingResponse) {
      onStop();
    } else {
      onSendMessage(event);
    }
  };

  return (
    <div>
      <div className="w-full">
        <AttachmentsPreview />
      </div>
      <form
        ref={formRef}
        className="w-full relative p-3 dark:bg-zinc-800 rounded-2xl flex flex-col gap-1 bg-zinc-100"
        onSubmit={handleSend}
      >
        <div className="absolute bottom-2.5 left-2.5 z-10">
          <PureAttachmentsButton />
        </div>
        <Input
          input={input}
          setInput={setInput}
          isGeneratingResponse={isGeneratingResponse}
          onSend={() => formRef.current?.requestSubmit()}
          isDisabled={isDisabled || hasPendingUploads}
        />

        <div className="absolute bottom-2.5 right-2.5">
          <button
            type="submit"
            className={cn(
              "size-8 flex flex-row justify-center items-center dark:bg-zinc-100 bg-zinc-900 dark:text-zinc-900 text-zinc-100 p-1.5 rounded-full hover:bg-zinc-800 dark:hover:bg-zinc-300 hover:scale-105 active:scale-95 transition-all",
              {
                "dark:bg-zinc-200 dark:text-zinc-500 cursor-not-allowed opacity-50":
                  isGeneratingResponse || input === "" || isDisabled || hasPendingUploads,
              }
            )}
            disabled={isGeneratingResponse || input === "" || isDisabled || hasPendingUploads}
          >
            {isGeneratingResponse ? <StopIcon /> : <ArrowUpIcon />}
          </button>
        </div>
      </form>
    </div>
  );
}

function AttachmentsPreview() {
  const { attachments, pendingAttachments, removeAttachment } = useVercelChatContext();

  if (attachments.length === 0) return null;

  return (
    <div className="flex gap-2 mb-2 overflow-x-auto overflow-y-visible">
      {attachments.map((attachment, index) => (
        <div key={index} className="relative group">
          <PreviewAttachment
            attachment={attachment}
            isUploading={pendingAttachments.includes(attachment)}
          />
          <button
            onClick={() => removeAttachment(index)}
            className="absolute -top-2 -right-2 bg-zinc-800 text-white rounded-full p-1 size-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Remove attachment"
          >
            <span className="text-xs">×</span>
          </button>
        </div>
      ))}
    </div>
  );
}

function PureAttachmentsButton() {
  const { setAttachments } = useVercelChatContext();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadFile = async (file: File) => {
    // Only allow image files for now
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      console.error('File type not supported:', file.type);
      return;
    }

    // Create a pending attachment with temporary URL for immediate preview
    const tempUrl = URL.createObjectURL(file);
    const pendingAttachment: Attachment = {
      name: file.name,
      contentType: file.type,
      url: tempUrl, // Temporary URL for initial preview
    };

    // Add the pending attachment to the state
    setAttachments((prev: Attachment[]) => [...prev, pendingAttachment]);

    try {
      // Upload the file to Arweave
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/files/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload file');
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Upload failed');
      }

      // Update the attachment with the Arweave URL
      setAttachments((prev: Attachment[]) =>
        prev.map((attachment: Attachment) =>
          // Compare by URL since object references won't match
          attachment.url === tempUrl
            ? {
              name: data.fileName,
              contentType: data.mimetype,
              url: data.url,
              id: data.id, // Store the Arweave transaction ID
            }
            : attachment
        )
      );

      // Revoke the temporary object URL to avoid memory leaks
      URL.revokeObjectURL(tempUrl);
    } catch (error) {
      console.error('Error uploading file:', error);
      // Remove the failed attachment
      setAttachments((prev: Attachment[]) =>
        prev.filter((a: Attachment) => a.url !== tempUrl)
      );
      // Revoke the temporary object URL
      URL.revokeObjectURL(tempUrl);
    }
  };

  const handleFileChange = () => {
    const files = Array.from(fileInputRef.current?.files || []);
    files.forEach(uploadFile);
    // Reset the input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <>
      <input
        type="file"
        className="fixed -top-4 -left-4 size-0.5 opacity-0 pointer-events-none"
        ref={fileInputRef}
        multiple
        onChange={handleFileChange}
        tabIndex={-1}
      />
      <Button
        data-testid="attachments-button"
        className="rounded-md rounded-bl-lg p-[7px] h-fit dark:border-zinc-700 hover:dark:bg-zinc-900 hover:bg-zinc-200"
        onClick={(event) => {
          event.preventDefault();
          fileInputRef.current?.click();
        }}
        variant="ghost"
      >
        <PaperclipIcon size={14} />
      </Button>
    </>
  );
}

export default ChatInput;
