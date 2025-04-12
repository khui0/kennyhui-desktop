export interface Vector {
  x: number;
  y: number;
}

export function add(a: Vector, b: Vector): Vector {
  return { x: a.x + b.x, y: a.y + b.y };
}

export function subtract(a: Vector, b: Vector): Vector {
  return { x: a.x - b.x, y: a.y - b.y };
}

export function lerp(a: number, b: number, alpha: number) {
  return a + alpha * (b - a);
}

export function clamp(n: number, min: number, max: number) {
  return Math.min(Math.max(n, min), max);
}
