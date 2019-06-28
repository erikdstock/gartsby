export const isBrowser = () => typeof window !== "undefined"

export const getQueryVariable: (key: string) => string | undefined = (
  key: string
) => {
  if (isBrowser()) {
    const query = window.location.search
      .substring(1)
      .split("&")
      .map(pair => pair.split("="))
    const tokenPair = query.find(kv => kv[0] === key)
    if (tokenPair) {
      return tokenPair[1]
    }
  }
}
