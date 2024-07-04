export const isValidStreamerUrl = (url: string): boolean => {
  const patterns = [
    /youtube\.com\/channel\/([^/]+)/,
    /youtube\.com\/@([^/]+)/,
    /youtube\.com\/c\/([^/]+)/,
    /twitch\.tv\/([^/]+)/
  ];

  return patterns.some(pattern => url.match(pattern));
};

export const isValidStreamUrl = (url: string): boolean => {
  const patterns = [
    /youtube\.com\/watch\?v=([^&]+)/,
    /twitch\.tv\/videos\/(\d+)/
  ];

  return patterns.some(pattern => url.match(pattern));
};