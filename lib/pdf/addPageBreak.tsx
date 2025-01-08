const addPageBreak = (funnelReportContent: string) => {
  const lastIndexOfLessThan = funnelReportContent.lastIndexOf(
    "<",
    funnelReportContent.indexOf("Closing"),
  );
  const reportHtml =
    funnelReportContent.slice(0, lastIndexOfLessThan) +
    `<div class="html2pdf__page-break"></div>` +
    funnelReportContent.slice(lastIndexOfLessThan);

  return reportHtml;
};

export default addPageBreak;
