export const formatSse = (event: Record<string, string>) => {
  return (
    Object.entries(event)
      .map(([key, value]) => `${key}: ${value}`)
      .join("\n") + "\n\n"
  );
};
