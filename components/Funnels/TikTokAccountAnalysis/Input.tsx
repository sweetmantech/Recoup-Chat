"use client";

import { useTikTokAnalysisProvider } from "@/providers/TIkTokAnalysisProvider";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["600"],
});

const TikTokAccountInput = () => {
  const { username, setUsername, handleAnalyze } = useTikTokAnalysisProvider();

  return (
    <main className="flex-1 flex items-center justify-center">
      <div className="w-full px-4 sm:px-6 text-center">
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
          Analyze Your TikTok Account in Seconds.
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
            See what works, why it works,
            <br />
            and how to make it better.
          </span>
          <span className="hidden sm:block">
            See what works, why it works, and how to make it better.
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
              placeholder="@username"
              value={username}
              onChange={(e) => setUsername(e.target.value.trim())}
              className="
                w-full
                h-full
                bg-transparent
                pl-6
                pr-[145px]
                text-[16px]
                rounded-full
                !outline-none 
                placeholder:text-white/40
                relative
                z-10
              "
            />
            <button
              onClick={handleAnalyze}
              disabled={!username}
              className="
                absolute
                right-2
                top-1/2
                -translate-y-1/2
                bg-white
                rounded-full
                pl-5
                pr-4
                h-9
                z-20
                flex
                items-center
                gap-2
                justify-center
                transition-all
                text-[15px]
                font-medium
                text-black
                hover:bg-white/90
                active:bg-white/80
                disabled:opacity-50
                disabled:cursor-not-allowed
              "
            >
              Try For Free
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                className="translate-y-[0.5px]"
              >
                <path
                  d="M7 17L17 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7 7H17V17"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default TikTokAccountInput;
