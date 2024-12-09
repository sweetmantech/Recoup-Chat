const getKnowledgeIcon = (type: string) => {
  if (type.includes("office")) return "word";
  if (type.includes("pdf")) return "pdf";
  return "image";
};

export default getKnowledgeIcon;
