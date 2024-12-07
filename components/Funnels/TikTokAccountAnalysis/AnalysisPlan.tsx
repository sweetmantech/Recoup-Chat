import Typewriter from "typewriter-effect";

const AnalysisPlan = () => {
  return (
    <Typewriter
      onInit={(tyepwriter) => {
        tyepwriter
          .typeString(
            `<div style="font-weight: bold; font-size: 14px;">
                  <p style="padding-bottom: 8px;">Here's the plan -</p>
                  <ul className="list-style-position: inside; padding-left: 16px;">
                    <li style="list-style-type: disc;">Artist Analysis</li>
                    <li style="list-style-type: disc;">Fan Segmentation</li>
                    <li style="list-style-type: disc;">Report Generation</li>
                  </ul>
                  <p style="font-weight: normal; padding-top: 24px;">Let's get started!</p>
                </div>
              `,
          )
          .pauseFor(1)
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

export default AnalysisPlan;
