export const truncateText = (text: string, maxLength: number): string => {
  return text.length <= maxLength ? text : text.slice(0, maxLength) + '...';
};
