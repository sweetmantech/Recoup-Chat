/**
 * Converts indented lines to proper markdown bullet lists
 */
export const convertIndentToBullet = (text: string): string => {
  if (!text) return '';
  
  const lines = text.split('\n');
  
  return lines.map(line => {
    if (/^\s{2,}[A-Za-z]/.test(line) && !line.trim().startsWith('*') && !line.trim().startsWith('-')) {
      return line.replace(/^\s+/, '* ');
    }
    return line;
  }).join('\n');
}; 