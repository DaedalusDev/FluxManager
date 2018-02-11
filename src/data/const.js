export const CONST = {
  name: 'lol'
}

const ApplicationConst = {
  install (Vue) {
    Vue.prototype.CONST = CONST
  }
}

export default ApplicationConst
