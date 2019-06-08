export const isBrowser = () => typeof window !== "undefined"
export function browserOnly<T>(cb: () => T): T | null {
  if (isBrowser()) return cb()
  else return null
}
