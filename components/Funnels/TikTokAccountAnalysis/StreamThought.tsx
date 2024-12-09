import { useEffect, useState } from "react";
import Typewriter from "typewriter-effect";

const StreamingThought = ({ text }: { text: string }) => {
  const [typingActive, setTypingActive] = useState(false);

  useEffect(() => {
    setTypingActive(true);
  }, [text]);

  return (
    <span className={`${typingActive && "no_typecursor"}`}>
      <Typewriter
        onInit={(tyepwriter) => {
          tyepwriter
            .typeString(`${text}`)
            .pauseFor(1)
            .start()
            .callFunction(() => {
              setTypingActive(true);
            });
        }}
        options={{
          autoStart: true,
          loop: false,
          delay: 0,
        }}
        key={text}
      />
    </span>
  );
};

export default StreamingThought;
