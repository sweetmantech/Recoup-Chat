const formatPdf = (contentHTML: string) => {
  const dotHTML = `<div style="padding-top: 15px; height: 100%;"><div style="width: 5px; height:5px; border-radius:50%; background:black;"></div></div>`;

  const newHTML = contentHTML
    .replaceAll(/<li(.*?)>(.*?)<\/li>/g, (_1, _2, content) => {
      return `<div style="display:flex; gap: 4px;">${dotHTML}${content}</div>`;
    })
    .replaceAll("<ul", "<div")
    .replaceAll("</ul>", "</div>");

  return newHTML;
};

export default formatPdf;
