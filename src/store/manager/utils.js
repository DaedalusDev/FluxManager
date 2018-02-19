export const nextVal = (state) => {
  return +Object.keys(state).pop() + 1
}
