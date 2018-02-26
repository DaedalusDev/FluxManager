<template>
  <v-container fluid>
    <v-layout>
      <edi-table
          :entities="items"
          v-bind="ediTables"
          @commit="commit"
      />
    </v-layout>
  </v-container>
</template>

<script>
import _ from 'lodash'
import {createNamespacedHelpers} from 'vuex'
import {formatCount} from '../../utils'
import * as typesEntities from '../../store/manager/entities/mutation-types'

const storeManager = createNamespacedHelpers('manager')
const storeEntities = createNamespacedHelpers('manager/entities')

export default {
  data () {
    return {
      ediTables: {
        title: 'Entitiés',
        headersAttr: {
          nom: {
            align: 'left'
          },
          solrSearch: {},
          instances: {
            sortable: false,
            format: formatCount,
            editable: false
          },
          attributs: {
            sortable: false,
            format: formatCount,
            editable: false
          }
        },
        ediTables: {
          instances: {
            title: 'Instances',
            attrKey: 'instances',
            headersAttr: {
              nom: {},
              description: {},
              affichageFonctionnel: {},
              form: {}
            }
          },
          attrTech: {
            title: 'Attributs technique',
            attrKey: 'attributs',
            headersAttr: {
              nom: {
                align: 'left'
              },
              type: {},
              sousObjet: {},
              referentiel: {},
              indexSolr: {},
              solrSearch: {},
              cleFonc: {},
              entitesAssociees: {},
              evolution: {},
              commentaire: {}
            }
          },
          attrIhm: {
            title: 'Attributs IHM',
            attrKey: 'attributs',
            allowAdd: false,
            headersAttr: {
              nom: {
                align: 'left'
              },
              typeIHM: {},
              libelle: {},
              libelleLong: {},
              taille: {},
              hauteur: {},
              offsetG: {},
              position: {},
              aLaLigne: {},
              required: {}
            }
          }
        }
      }
    }
  },
  methods: {
    ...storeEntities.mapActions({
      commit: typesEntities.ENTITIES_UPDATE_ENTITY
    })
  },
  computed: {
    ...storeManager.mapState({
      entities: 'entities'
    }),
    items () {
      return Object.values(this.entities).map((e) => _.cloneDeep(e))
    }
  }
}
</script>

<style scoped></style>
