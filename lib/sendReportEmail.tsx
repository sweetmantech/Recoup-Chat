const sendReportEmail = (
  rawContent: string,
  artistImage: string,
  email: string,
  subject: string,
) => {
  const reportContent = `
        <div style="width: 757px; height:146px; border-radius: 10px; background-image: url('${artistImage}'); background-position: center; background-size: cover; margin-bottom: 10px;"></div/>
        <div style="width: 100%; height: 16px;"></div>${rawContent}
      `;
  const template = `<!DOCTYPE html>
      <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta content="width=device-width, initial-scale=1" name="viewport">
            <meta name="x-apple-disable-message-reformatting">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta content="telephone=no" name="format-detection">
            <title>Empty template</title>
            <style type="text/css">
                * {
                    box-sizing: border-box !important;
                    margin: 0px !important;
                }
            </style>
        </head>
        <body class="body" style="width:100%;padding:0;margin:0;">
          <div style="color: black; width: 100%; background-color: white; padding: 0.3in; font-size: 11pt; line-height: normal;">
            ${reportContent}
          </div>
          <div style="display:flex; text-align: center;">
            <img src='https://i.imgur.com/hwJIKMx.png' style='width:24px; height:27px;'/>
          </div>
        </body>
      </html>`;

  return fetch("/api/report/email", {
    method: "POST",
    body: JSON.stringify({
      email,
      subject,
      template,
    }),
  });
};

export default sendReportEmail;
