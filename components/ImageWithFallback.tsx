import { useEffect, useState } from "react";

const ImageWithFallback = ({
  src,
  className = "",
}: {
  src: string;
  className?: string;
}) => {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [keyValue, setKeyValue] = useState(0);

  const handleError = () => {
    setCurrentSrc("https://i.imgur.com/QCdc8Ai.jpg");
  };

  useEffect(() => {
    setKeyValue(keyValue + 1);
    setCurrentSrc(src);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);

  return (
    <div className="flex items-center justify-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        key={keyValue}
        src={currentSrc}
        onError={handleError}
        className={`${className} object-cover w-full aspect-[1/1]`}
        alt="not found pic"
      />
    </div>
  );
};

export default ImageWithFallback;
