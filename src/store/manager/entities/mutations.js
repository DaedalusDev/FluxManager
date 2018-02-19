import * as types from './mutation-types'
import Vue from 'vue'
import {nextVal} from '../utils'

const mutations = {
  /**
   * Ajoute une entité
   * @param state
   */
  [types.ENTITIES_ADD_ENTITY]: function (state, entity) {
    entity.id = nextVal(state)
    Vue.set(state, entity.id, entity)
  },

  /**
   * Actualise toute une une entité
   * @param state
   */
  [types.ENTITIES_UPDATE_ENTITY]: function (state, entity) {
    if (!entity.id) throw new Error('Un identifiant est necessaire')
    return Vue.set(state, entity.id, entity)
  },

  /**
   * Supprime une entite
   * @param state
   */
  [types.ENTITIES_DELETE_ENTITY]: function (state, {id}) {
    Vue.delete(state, id)
    return state
  }
}

export default mutations
