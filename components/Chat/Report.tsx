import { useFunnelReportProvider } from "@/providers/FunnelReportProvider";
import Typewriter from "typewriter-effect";

const ReportAnswer = () => {
  const { bannerImage, bannerArtistName, funnelRawReportContent } =
    useFunnelReportProvider();

  return (
    <Typewriter
      onInit={(tyepwriter) => {
        tyepwriter
          .typeString(
            `<div class="segment-report" style="width: 100%;">
            <div style="width: 100%; aspect-ratio: 757/146; border-radius: 0.5rem; display: flex; align-items: center; justify-content: center; overflow: hidden; position: relative;">
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
  );
};

export default ReportAnswer;
