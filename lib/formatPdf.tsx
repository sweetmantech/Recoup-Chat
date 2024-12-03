const formatPdf = (contentHTML: string) => {
  const dotHTML = `<div style="padding-top: 20px; height: 100%; border: 1px solid red;"><div style="width: 5px; height:5px; border-radius:50%; background:black;"></div></div>`;

  const newHTML = contentHTML
    .replaceAll(/<li(.*?)>(.*?)<\/li>/g, (_, content) => {
      return `<div style="display:flex; gap: 4px; border: 1px solid red;">${dotHTML}${content}</div>`;
    })
    .replaceAll("<ul", "<div")
    .replaceAll("</ul>", "</div>");

  return newHTML;
};

export default formatPdf;
