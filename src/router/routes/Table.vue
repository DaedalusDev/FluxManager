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
              nomDuChamp: {
                align: 'left'
              },
              type: {},
              sousObjet: {},
              referentiel: {},
              indexSolr: {},
              rechercheSolr: {},
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
              nomDuChamp: {
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
      },
      items: []
    }
  },
  created () {
    this.generateItems()
  },
  methods: {
    generateItems () {
      const items = Object.values(this.entities).map((e) => _.cloneDeep(e))
      this.items = items
    },
    ...storeEntities.mapActions({
      commit: typesEntities.ENTITIES_UPDATE_ENTITY
    })
  },
  watch: {
    entities () {
      this.generateItems()
    }
  },
  computed: {
    ...storeManager.mapState({
      entities: 'entities',
      entitiesLink: 'links'
    }),
    headers () {
      const headers = []
      for (let key in this.CONST.dataStructure.entity) {
        if (this.headersAttr[key]) {
          let et = this.CONST.dataStructure.entity[key]
          headers.push({
            text: et.label,
            value: key
          })
        }
      }
      return headers
    }
  }
}
</script>

<style scoped></style>