export function range(a: number, b?: number): number[] {
  if (b == null) return range(0, a - 1)
  return [...Array(b - a + 1).keys()].map(i => a + i)
}

export function clamp(a: number, b: number, x: number): number {
  return Math.max(a, Math.min(x, b))
}

export function sum(array: number[]): number {
  let total = 0
  array.forEach(x => { total = total + x })
  return total
}