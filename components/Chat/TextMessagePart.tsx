"use client";

import Markdown from "react-markdown";
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { TextPart } from "@/types/reasoning";
import styles from "./markdown.module.css";

interface TextMessagePartProps {
  part: TextPart;
}

// Converts indented lines to proper markdown bullet lists
const convertIndentToBullet = (text: string): string => {
  if (!text) return '';
  
  const lines = text.split('\n');
  
  return lines.map(line => {
    if (/^\s{2,}[A-Za-z]/.test(line) && !line.trim().startsWith('*') && !line.trim().startsWith('-')) {
      return line.replace(/^\s+/, '* ');
    }
    return line;
  }).join('\n');
};

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
