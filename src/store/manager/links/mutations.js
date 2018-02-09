import * as types from './mutation-types'

const mutations = {
  /**
   * Ajoute une entité
   * @param state
   */
  [types.LINK_ADD_LINK]: function (state, link) {
    state.links.push(link)
  },

  /**
   * Actualise un lien
   * @param state
   */
  [types.LINK_UPDATE_LINK]: function (state, link) {
    // state.entities = false
  },
  /**
   * Supprime un lien
   * @param state
   */
  [types.LINK_DELETE_LINK]: function (state, link) {
    // state.isOpen = !state.isOpen
  }
}

export default mutations
