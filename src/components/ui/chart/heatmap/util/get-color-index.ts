export function getColorIndex(value: number, min: number, max: number): number {
  const t = (value - min) / (max - min);
  return Math.min(6, Math.floor(t * 7));
}
