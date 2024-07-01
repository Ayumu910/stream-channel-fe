export const isValidStreamerUrl = (url: string): boolean => {
  const patterns = [
    /youtube\.com\/channel\/([^/]+)/,
    /youtube\.com\/@([^/]+)/,
    /youtube\.com\/c\/([^/]+)/,
    /twitch\.tv\/([^/]+)/
  ];

  return patterns.some(pattern => url.match(pattern));
};