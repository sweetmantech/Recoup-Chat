/**
 * Formats text content by converting markdown syntax to HTML and formatting lists
 */
export const formatText = (text: string): string => {
  return (
    text
      // Convert headers (# Text) to styled headers
      .replace(/^(#{1,3})\s+(.+)$/gm, (_, level, content) => {
        const size = level.length === 1 ? 'text-xl' : level.length === 2 ? 'text-lg' : 'text-base';
        return `<h${level.length} class="${size} font-bold my-4">${content}</h${level.length}>`;
      })

      // Convert **text** to <strong>text</strong>
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      
      // Format unordered lists (bullet points)
      .replace(
        /(?:^|\n)[ ]*[-*][ ]+([^\n]+)/g,
        (match, content) => `<div class="flex gap-2 my-2 ml-4">
          <span class="min-w-[20px] text-gray-600">•</span>
          <span>${content.trim()}</span>
        </div>`
      )
      
      // Format numbered lists while preserving original numbers
      .replace(
        /(?:^|\n)[ ]*(\d+\.)[ ]+([^\n]+)(?:\n(?:(?!(?:\d+\.|[-*]\s|#)).*\n?)*)?/gm,
        (match, number, content, details) => `
          <div class="flex flex-col gap-1 my-3">
            <div class="flex gap-2">
              <span class="min-w-[25px] font-semibold">${number}</span>
              <div class="flex flex-col">
                <span class="font-semibold">${content.trim()}</span>
                ${details ? details.split('\n').filter((line: string) => line.trim()).map((line: string) => 
                  `<span class="text-gray-800 mt-1">${line.trim()}</span>`
                ).join('\n') : ''}
              </div>
            </div>
          </div>`
      )

      // Add spacing between sections that aren't lists or headers
      .replace(/(?:^|\n)((?![-*]|\d+\.|#)[^\n]+)\n\n/g, 
        (match, content) => `<p class="my-3">${content}</p>`
      )
  );
};
