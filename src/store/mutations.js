import * as types from './mutation-types'

const mutations = {
  [types.APP_CONNECT]: function (state, user) {
    this.state.user = user
  }
}

export default mutations
