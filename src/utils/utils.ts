export const formatString = (input: string) => {
  return input.length > 20 ? input.slice(0, 20) + "..." : input
}
