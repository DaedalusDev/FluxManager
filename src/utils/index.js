export const dataValidator = (data, spec) => {
  return true
}

export const recurseSetter = (o, set) => {
  if (typeof o === 'object') {
    if (Array.isArray(o)) {
      o = o.map((v) => recurseSetter(v, set))
    } else {
      for (let k in o) {
        let v = o[k]
        if (typeof o[k] === 'object') {
          recurseSetter(o[k], set)
        } else {
          Object.defineProperty(o, k, {
            set: function (val) { v = val; set() },
            get: function () { return v }
          })
        }
      }
    }
  }
  return o
}

export const formatOuiNon = (v) => v ? 'Oui' : 'Non'

export const formatCount = (v) => Array.isArray(v) ? v.length : 0
