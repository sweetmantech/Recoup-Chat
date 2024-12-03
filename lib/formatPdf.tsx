const formatPdf = (contentHTML: string) => {
  const dotHTML = `<div style="width: 10px; height:10px; border-radius:50%; background:black;"></div>`;

  const newHTML = contentHTML.replaceAll(/<li>(.*?)<\/li>/g, (_, content) => {
    return `<div style="display:flex; align-items:center;">${dotHTML}${content}</div>`;
  });

  return newHTML;
};

export default formatPdf;
