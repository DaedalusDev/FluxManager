import * as types from './mutation-types'
import _ from 'lodash'

const actions = {
  /**
   * Ajoute une entité
   * @param state
   */
  [types.ENTITIES_ADD_ENTITY]: function (context, entity) {
    context.commit(types.ENTITIES_ADD_ENTITY, _.cloneDeep(entity))
  },

  /**
   * Actualise une entité
   * @param state
   */
  [types.ENTITIES_UPDATE_ENTITY]: async function (context, entity) {
    const clone = _.cloneDeep(entity)
    return new Promise(resolve => {
      if (entity.id) {
        context.commit(types.ENTITIES_UPDATE_ENTITY, clone)
      } else {
        context.commit(types.ENTITIES_ADD_ENTITY, clone)
      }
      resolve(clone)
    })
  },
  /**
   * Supprime une entite et tous les liens associcié à cette entité
   * @param state
   */
  [types.ENTITIES_DELETE_ENTITY]: function (context, entity) {
    context.commit(types.ENTITIES_DELETE_ENTITY, _.cloneDeep(entity))
  }
}

export default actions
