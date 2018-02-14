export const dataValidator = (data, spec) => {
  return true
}

export const formatOuiNon = (v) => v ? 'Oui' : 'Non'
export const formatCount = (v) => Array.isArray(v) ? v.length : 0

export const detectFormat = (t) => {
  switch (t) {
    case Boolean:
      return formatOuiNon
    default:
      return null
  }
}
