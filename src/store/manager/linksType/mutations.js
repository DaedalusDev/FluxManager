import * as types from './mutation-types'
import Vue from 'vue'
import {nextVal} from '../utils'

const mutations = {
  /**
   * Ajoute un type de lien
   * @param state
   */
  [types.LINKSTYPE_ADD_LINKTYPE]: function (state, entity) {
    entity.id = nextVal(state)
    Vue.set(state, entity.id, entity)
  },

  /**
   * Actualise un type de lien
   * @param state
   */
  [types.LINKSTYPE_UPDATE_LINKTYPE]: function (state, entity) {
    if (!entity.id) throw new Error('Un identifiant est necessaire')
    return Vue.set(state, entity.id, entity)
  },

  /**
   * Supprime un type de lien
   * @param state
   */
  [types.LINKSTYPE_DELETE_LINKTYPE]: function (state, {id}) {
    Vue.delete(state, id)
    return state
  }
}

export default mutations
