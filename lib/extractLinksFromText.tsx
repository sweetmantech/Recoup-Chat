function extractLinksFromText(text: string) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const links = text.match(urlRegex);
  return links || [];
}

export default extractLinksFromText;
