"use client";

import { useTikTokAnalysisProvider } from "@/providers/TIkTokAnalysisProvider";
import { Plus_Jakarta_Sans } from "next/font/google";
import AnalysisButton from "./AnalysisButton";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["600"],
});

const TikTokAccountInput = () => {
  const { username, setUsername } = useTikTokAnalysisProvider();

  return (
    <main className="flex-1 md:p-4 bg-background">
      <div className="h-[calc(100vh-64px)] md:h-full flex flex-col items-center justify-center px-4 sm:px-6 text-center bg-white rounded-xl">
        <h1
          className={`
            ${plusJakartaSans.className}
            text-[32px]
            sm:text-3xl 
            lg:text-[32px] 
            leading-[1.2]
            tracking-[-0.5px] 
            mb-4
            sm:mb-5
            font-semibold
            max-w-[700px]
            mx-auto
            px-2
          `}
        >
          Analyze Your TikTok Followers in Seconds
        </h1>
        <p
          className="
            text-gray-400 
            text-lg 
            sm:text-xl 
            mb-8 
            sm:mb-10 
            max-w-[600px] 
            mx-auto 
            px-6
            sm:px-2
            leading-relaxed
            sm:leading-normal
          "
        >
          <span className="sm:hidden">
            Discover who your real fans are
            <br />
            and what they care about.
          </span>
          <span className="hidden sm:block">
            Discover who your real fans are and what they care about.
          </span>
        </p>
        <div className="flex flex-col items-center justify-center gap-4 px-4">
          <div
            className="
              relative 
              w-[340px] 
              sm:w-full 
              max-w-[400px] 
              h-12 
              rounded-full 
              bg-gradient-to-r 
              from-white/[0.06] 
              to-white/[0.01]
              group
              focus-within:from-white/[0.09]
              focus-within:to-white/[0.03]
              transition-all
              duration-200
            "
          >
            <input
              type="text"
              placeholder="@tiktokusername"
              value={username}
              onChange={(e) => setUsername(e.target.value.trim())}
              className="
                w-full
                h-full
                bg-transparent
                md:pl-6
                md:pr-[145px]
                px-4
                text-[16px]
                rounded-[10px]
                !outline-none 
                placeholder:text-grey
                relative
                z-10
                border
                max-w-[239px]
                md:max-w-full
              "
            />
            <AnalysisButton className="absolute right-2 top-1/2 -translate-y-1/2 md:block hidden" />
          </div>
          <AnalysisButton className="md:hidden block" />
        </div>
      </div>
    </main>
  );
};

export default TikTokAccountInput;
