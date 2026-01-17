export function clamp(a: number, b: number, x: number): number {
  return Math.max(a, Math.min(x, b))
}