import * as types from './mutation-types'
import * as entitiesTypes from './entities/mutation-types'
import * as linksTypes from './links/mutation-types'

const actions = {
  /**
   * Supprime une entite et tous les liens associés à cette entité
   * @param state
   */
  [types.ENTITIES_DELETE_ENTITY]: function (context, entity) {
    context.commit('links/' + linksTypes.LINK_DELETE_ENTITY_LINKS, entity)
    context.commit('entities/' + entitiesTypes.ENTITIES_DELETE_ENTITY, entity)
  }
}

export default actions
