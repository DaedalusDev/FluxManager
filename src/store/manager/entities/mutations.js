import * as types from './mutation-types'

const mutations = {
  /**
   * Ajoute une entité
   * @param state
   */
  [types.ENTITIES_ADD_ENTITY]: function (state, entity) {
    state.entities.push(entity)
  },

  /**
   * Actualise une entité
   * @param state
   */
  [types.ENTITIES_UPDATE_ENTITY]: function (state, entity) {
    // state.entities = false
  },
  /**
   * Supprime une entite
   * @param state
   */
  [types.ENTITIES_DELETE_ENTITY]: function (state) {
    // state.isOpen = !state.isOpen
  }
}

export default mutations
