<template>
    <v-flex d-flex xs12>
        <v-card>
            <v-card-title primary-title><h3 class="headline mb-0">{{ title }}</h3>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-layout row wrap>
                        <v-flex xs12>
                            <v-data-table
                                    :headers="headers"
                                    :items="entity[attrKey]"
                                    hide-actions
                                    no-data-text="Le tableau est vide"
                                    no-results-text="Aucun résultats"
                            >
                                <template slot="items" slot-scope="props">
                                    <td v-for="v, k in headersAttr" :key="k" class="text-xs-left">
                                        <v-edit-dialog
                                                lazy
                                        >{{ v.format? v.format(props.item[k]): props.item[k] || 'Aucun'}}
                                            <v-text-field
                                                    slot="input"
                                                    label="Edit"
                                                    v-model="props.item[k]"
                                                    single-line
                                                    counter
                                            ></v-text-field>
                                        </v-edit-dialog>
                                    </td>
                                </template>
                            </v-data-table>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-card-text>
        </v-card>
    </v-flex>
</template>

<script>
  // import {formatOuiNon, formatCount} from '../../utils'

  export default {
    props: {
      title: {
        type: String
      },
      attrKey: {
        type: String
      },
      entity: {
        type: Object
      },
      headersAttr: {
        type: Object
      }
    },
    data () {
      return {}
    },
    computed: {
      headers () {
        const headers = []
        const format = this.CONST.dataStructure.entity[this.attrKey]._format
        for (let key in format) {
          if (this.headersAttr[key]) {
            let et = format[key]
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