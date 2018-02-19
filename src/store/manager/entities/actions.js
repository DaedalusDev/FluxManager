import * as types from './mutation-types'

const actions = {
  /**
   * Ajoute une entité
   * @param state
   */
  [types.ENTITIES_ADD_ENTITY]: function (context, entity) {
    context.commit(types.ENTITIES_ADD_ENTITY, entity)
  },

  /**
   * Actualise une entité
   * @param state
   */
  [types.ENTITIES_UPDATE_ENTITY]: async function (context, entity) {
    return new Promise(resolve => {
      if (entity.id) {
        context.commit(types.ENTITIES_UPDATE_ENTITY, entity)
      } else {
        context.commit(types.ENTITIES_ADD_ENTITY, entity)
      }
      resolve(entity)
    })
  },
  /**
   * Supprime une entite et tous les liens associcié à cette entité
   * @param state
   */
  [types.ENTITIES_DELETE_ENTITY]: function (context, entity) {
    context.commit(types.ENTITIES_DELETE_ENTITY, entity)
  }
}

export default actions
