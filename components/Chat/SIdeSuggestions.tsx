import { useArtistProvider } from "@/providers/ArtistProvider";
import { useChatProvider } from "@/providers/ChatProvider";
import { ArrowUpRightIcon } from "lucide-react";
import { useState } from "react";
import { v4 as uuidV4 } from "uuid";
import Slider from "../Slider";

const SideSuggestions = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { append, suggestions } = useChatProvider();
  const { selectedArtist } = useArtistProvider();

  return (
    <div className="relative pb-2">
      {currentIndex !== 0 && (
        <div className="absolute left-0 top-0 size-full bg-gradient-to-r from-[#ffffffab] via-[#ffffff00] to-[#ffffff00] z-[2] pointer-events-none" />
      )}
      {currentIndex !== 3 && (
        <div className="absolute left-0 top-0 size-full bg-gradient-to-l from-[#ffffffab] via-[#ffffff00] to-[#ffffff00] z-[3] pointer-events-none" />
      )}
      <Slider
        className="!overflow-hidden"
        sliderProps={{
          initialSlide: 0,
          slidesPerView: 1.5,
          grabCursor: true,
          onSlideChange: (swiperCtrl) =>
            setCurrentIndex(swiperCtrl.activeIndex),
          breakpoints: {
            770: {
              slidesPerView: 3.5,
            },
            440: {
              initialSlide: 2.4,
            },
          },
        }}
      >
        {[...suggestions, ...suggestions, ...suggestions].map(
          (suggestion: string) => (
            <button
              key={suggestion}
              type="button"
              className="min-w-[200px] border border-grey py-2 px-4 rounded-xl flex gap-1 items-center justify-center text-xs transition-colors hover:bg-grey"
              onClick={() =>
                append({
                  id: uuidV4(),
                  role: "user",
                  content: suggestion,
                })
              }
            >
              <div
                className="text-center"
                dangerouslySetInnerHTML={{
                  __html: suggestion.replaceAll(
                    selectedArtist?.name || "",
                    `<span style="color:#aa7fdb;">${selectedArtist?.name || ""}</span>`,
                  ),
                }}
              />
              <ArrowUpRightIcon className="w-4 h-4 flex-shrink-0" />
            </button>
          ),
        )}
      </Slider>
    </div>
  );
};

export default SideSuggestions;
