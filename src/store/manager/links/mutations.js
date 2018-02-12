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
  },
  /**
   * Supprime tous les liens associés à une entitité
   * @param state
   */
  [types.LINK_DELETE_ENTITY_LINKS]: function (state, {id}) {
    const links = state.filter((l) => l.source === id || l.target === id)
    links.forEach((l) => state.splice(state.indexOf(l), 1))
    return state
  }
}

export default mutations
