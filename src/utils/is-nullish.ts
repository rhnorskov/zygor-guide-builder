export function isNullish(value: unknown): boolean {
  return value === null || value === undefined;
}

export function isNonNullish(value: unknown): boolean {
  return value !== null && value !== undefined;
}
