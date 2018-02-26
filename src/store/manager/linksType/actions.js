import * as types from './mutation-types'
import _ from 'lodash'

const actions = {
  /**
   * Ajoute un nouveau type de lien
   * @param state
   */
  [types.LINKSTYPE_ADD_LINKTYPE]: function (context, linkType) {
    context.commit(types.LINKSTYPE_ADD_LINKTYPE, _.cloneDeep(linkType))
  },

  /**
   * Actualise un type de lien
   * @param state
   */
  [types.LINKSTYPE_UPDATE_LINKTYPE]: async function (context, linkType) {
    const clone = _.cloneDeep(linkType)
    return new Promise(resolve => {
      if (linkType.id) {
        context.commit(types.LINKSTYPE_UPDATE_LINKTYPE, clone)
      } else {
        context.commit(types.LINKSTYPE_ADD_LINKTYPE, clone)
      }
      resolve(clone)
    })
  },
  /**
   * Supprime un type de lien
   * @param state
   */
  [types.LINKSTYPE_DELETE_LINKTYPE]: function (context, linkType) {
    context.commit(types.LINKSTYPE_DELETE_LINKTYPE, _.cloneDeep(linkType))
  }
}

export default actions
