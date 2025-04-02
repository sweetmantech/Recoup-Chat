"use client";

import Markdown from "react-markdown";
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { TextPart } from "@/types/reasoning";
import styles from "./markdown.module.css";
import { convertIndentToBullet } from "@/lib/utils/textFormatting";

interface TextMessagePartProps {
  part: TextPart;
}

export function TextMessagePart({ part }: TextMessagePartProps) {
  const processedText = convertIndentToBullet(part.text);
  
  return (
    <div className={styles.markdown}>
      <Markdown 
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
      >
        {processedText}
      </Markdown>
    </div>
  );
}
