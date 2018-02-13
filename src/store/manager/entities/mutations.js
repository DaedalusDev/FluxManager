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
   * Actualise toute une une entité
   * @param state
   */
  [types.ENTITIES_UPDATE_ENTITY]: function (state, entity) {
    // state.entities = false
  },

  /**
   * Supprime une entite
   * @param state
   */
  [types.ENTITIES_DELETE_ENTITY]: function (state, {id}) {
    const e = state.find((e) => id === e.id)
    if (!e) throw new Error('Unaivalaible entity')
    state.splice(state.indexOf(e), 1)
    return state
  }
}

export default mutations
