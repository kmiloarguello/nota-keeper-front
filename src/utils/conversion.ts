export const fromBytesToMB = (bytes: number, rounded: number = 2): number => {
  return Number((bytes / 1024 / 1024).toFixed(rounded));
};
