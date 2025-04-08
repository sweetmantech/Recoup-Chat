import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500"],
});

type ChatPromptProps = {
  artistName: string;
  currentWord: string;
  isVisible: boolean;
};

/**
 * Displays the prompt area with artist name or typing animation
 */
export function ChatPrompt({ 
  artistName, 
  currentWord, 
  isVisible 
}: ChatPromptProps) {
  // Styles
  const textStyle = `
    ${plusJakartaSans.className} 
    text-[19px]
    sm:text-[22px]
    lg:text-[28px] 
    leading-[1.3]
    sm:leading-[1.2]
    lg:leading-[1.3] 
    tracking-[-0.25px]
    lg:tracking-[-0.3px] 
    font-medium 
  `;
  
  const fadeBase = "transition-opacity duration-700 ease-out";
  const fadeStart = "opacity-0";
  const fadeEnd = "opacity-100";
  
  return (
    <div 
      className={`
        ${textStyle} mb-0 sm:mb-1 block text-[#A0A0A8] ${fadeBase}
        ${isVisible ? fadeEnd : fadeStart}
        transition-delay-[100ms]
      `}
    >
      <span>
        Ask me <span className="hidden sm:inline">anything</span> about {artistName || "your "}
        {!artistName && (
          <span className="inline-block min-w-[1ch] text-center transition-all duration-100">
            {currentWord}
            <span className="animate-pulse">|</span>
          </span>
        )}
      </span>
    </div>
  );
}

export default ChatPrompt; 