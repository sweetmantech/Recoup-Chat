import { useFunnelReportProvider } from "@/providers/FunnelReportProvider";
import Icon from "../Icon";
import Typewriter from "typewriter-effect";

const ReportAnswer = () => {
  const {
    bannerImage,
    bannerArtistName,
    funnelRawReportContent,
    isReportStreamed,
  } = useFunnelReportProvider();

  return (
    <>
      {isReportStreamed ? (
        <Typewriter
          onInit={(tyepwriter) => {
            tyepwriter
              .typeString(
                `<div class="segment-report" style="width: 100%;">
            <div style="width: 100%; aspect-ratio: 757/146; border-radius: 0.5rem; display: flex; align-items: center; justify-content: center; overflow: hidden; position: relative; margin-bottom: 8px;">
              <img src=${bannerImage || ""} alt="not found pic" style="width:100%;" />
              <div style="position: absolute; left: 0; top: 0; width: 100%; height: 100%; display: flex; align-items: center; justify-content: flex-end; padding-right: 0.75rem; gap: 0.5rem;">
                <p style="color: white; font-weight: bold; font-size: 40px;">${bannerArtistName}</p>
                <img src="https://i.imgur.com/dNzHwTO.png" style="width: 24px; height:27px;"/>
                <p style="color: white; font-weight: bold; font-size: 40px;">Recoup</p>
              </div>
            </div>
            <div
              dangerouslySetInnerHTML={{
                __html: ${funnelRawReportContent},
              }}
            />
          </div>
              `,
              )
              .pauseFor(0)
              .start()
              .callFunction(() => {});
          }}
          options={{
            autoStart: true,
            loop: false,
            delay: 0,
          }}
        />
      ) : (
        <div className="w-full segment-report">
          <div className="w-full aspect-[757/146] rounded-lg flex items-center justify-center overflow-hidden relative mb-2">
            {/* eslint-disable-next-line  @next/next/no-img-element */}
            <img
              src={bannerImage || ""}
              alt="not found pic"
              className="w-full"
            />
            <div className="absolute left-0 top-0 size-full flex items-center justify-end pr-3 gap-2">
              <p className="text-white font-bold text-[40px]">
                {bannerArtistName}
              </p>
              <Icon name="logo-xl" />
              <p className="text-white font-bold text-[40px]">Recoup</p>
            </div>
          </div>
          <div
            dangerouslySetInnerHTML={{
              __html: funnelRawReportContent,
            }}
          />
        </div>
      )}
    </>
  );
};

export default ReportAnswer;
