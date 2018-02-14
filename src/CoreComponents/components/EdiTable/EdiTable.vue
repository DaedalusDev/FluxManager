<template>
  <v-flex xs12>
    <v-card>
      <v-card-title primary-title>
        <h3 class="headline mb-0">{{ title }}</h3>
        <v-spacer/>
        <v-text-field
            append-icon="search"
            label="Rechercher"
            single-line
            hide-details
            v-model="search"
        />
      </v-card-title>
      <v-card-text>
        <v-container fluid>
          <v-layout row wrap>
            <v-flex xs12>
              <v-data-table
                  :headers="headers"
                  :items="entities || entity[attrKey]"
                  hide-actions
                  no-data-text="Le tableau est vide"
                  no-results-text="Aucun résultats"
                  :search="search"
              >
                <template slot="items" slot-scope="props">
                  <tr @click="ediTables ? props.expanded = !props.expanded : null" :key="props.item.id">
                    <td v-for="h in headers" class="text-xs-left">
                      <edi-table-cell
                        :h="h"
                        v-model="props.item[h.key]"
                        @input="commit(props.item)"
                      />
                    </td>
                  </tr>
                </template>
                <template v-if="ediTables" slot="expand" slot-scope="props">
                  <v-container grid-list-md text-xs-center>
                    <v-layout row wrap>
                      <edi-table
                          v-for="(ediTable, k) in ediTables"
                          :entity="props.item"
                          v-bind="ediTable"
                          :key="k"
                      />
                    </v-layout>
                  </v-container>
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
import EdiTableCell from './EdiTableCell'

export default {
  name: 'edi-table',
  components: {
    EdiTableCell
  },
  props: {
    title: {
      type: String
    },
    attrKey: {
      type: String
    },
    entities: {
      type: Array
    },
    entity: {
      type: Object
    },
    headersAttr: {
      type: Object,
      required: true
    },
    ediTables: {
      type: Object
    }
  },
  data () {
    return {
      search: ''
    }
  },
  methods: {
    commit (item) {
      console.log('commit', item)
    }
  },
  computed: {
    headers () {
      const headers = []
      const format = this.attrKey ? this.CONST.dataStructure.entity[this.attrKey]._format : this.CONST.dataStructure.entity
      for (let key in format) {
        let h = this.headersAttr[key]
        if (h) {
          let et = format[key]
          headers.push({
            text: et.label,
            type: et.type,
            key: key,
            value: key,
            editable: true,
            ...h
          })
        }
      }
      return headers
    }
  }
}
</script>

<style scoped></style>