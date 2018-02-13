<template>
    <v-container fluid>
        <v-layout wrap>
            <v-flex>
                <v-card>
                    <v-card-title>
                        <h3 class="headline mb-0">Entitiés</h3>
                        <v-spacer></v-spacer>
                        <v-text-field
                                append-icon="search"
                                label="Rechercher"
                                single-line
                                hide-details
                                v-model="search"
                        ></v-text-field>
                    </v-card-title>
                    <v-data-table
                            :headers="headers"
                            :items="items"
                            hide-actions
                            no-data-text="Le tableau est vide"
                            no-results-text="Aucun résultats"
                            :search="search"
                    >
                        <template slot="items" slot-scope="props">
                            <tr @click="props.expanded = !props.expanded">
                                <td v-for="v, k in headersAttr" :key="k">{{ v.format? v.format(props.item[k]):
                                    props.item[k] }}
                                </td>
                            </tr>
                        </template>
                        <template slot="expand" slot-scope="props">
                            <v-container grid-list-md text-xs-center>
                                <v-layout row wrap>
                                    <edi-table
                                            v-for="ediTable in ediTables"
                                            :entity="props.item"
                                            v-bind="ediTable"
                                    />
                                </v-layout>
                            </v-container>
                        </template>
                    </v-data-table>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
  import EdiTable from '../../components/Table/EdiTable'
  import {createNamespacedHelpers} from 'vuex'
  import {formatOuiNon, formatCount} from '../../utils'

  const storeManager = createNamespacedHelpers('manager')

  export default {
    components: {
      EdiTable
    },
    data () {
      return {
        headersAttr: {
          nom: {
            align: 'left'
          },
          solrSearch: {
            format: formatOuiNon
          },
          instances: {
            sortable: false,
            format: formatCount
          },
          attributs: {
            sortable: false,
            format: formatCount
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
              libelle: {},
              libelleLong: {},
              sousObjet: {},
              referentiel: {},
              type: {},
              typeIHM: {},
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
            headersAttr: {
              nomDuChamp: {
                align: 'left'
              },
              taille: {},
              hauteur: {},
              offsetG: {},
              position: {},
              aLaLigne: {},
              required: {}
            }
          }
        },
        search: ''
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
      },
      items () {
        return this.entities.map((e) => {
          return {
            value: false,
            ...e
          }
        })
      }
    }
  }
</script>

<style scoped></style>