import dataStructure from './dataStructure/index'
export const CONST = {
  dataStructure
}

const ApplicationConst = {
  install (Vue) {
    Vue.prototype.CONST = CONST
  }
}

export default ApplicationConst
