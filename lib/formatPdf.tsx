const formatPdf = (contentHTML: string) => {
  const dotHTML = `<div style="width: 5px; height:5px; border-radius:50%; background:black;"></div>`;

  const newHTML = contentHTML
    .replaceAll(/<li>(.*?)<\/li>/g, (_, content) => {
      return `<div style="display:flex; align-items:center; justify-content:center; gap: 4px;">${dotHTML}${content}</div>`;
    })
    .replaceAll("<ul", "<div")
    .replaceAll("</ul>", "</div>");

  return newHTML;
};

export default formatPdf;
