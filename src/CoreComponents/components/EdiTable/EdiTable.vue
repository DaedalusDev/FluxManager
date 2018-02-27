<template>
  <v-flex xs12>
    <v-card>
      <v-card-title primary-title>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex sm6>
              <h3 class="headline mb-0">{{ title }}</h3>
            </v-flex>
            <v-spacer/>
            <v-flex sm2>
              <v-dialog v-if="allowAdd" v-model="dialogOpen" max-width="500px">
                <v-btn color="primary" dark slot="activator" class="mb-2">
                  Ajouter
                  <v-icon right dark>add</v-icon>
                </v-btn>
                <v-card>
                  <v-card-title>
                    <span class="headline">Nouvel élément</span>
                  </v-card-title>
                  <v-card-text>
                      <auto-form
                          ref="form"
                          :model="formFields"
                          v-model="newItem"
                          @submit="insert"
                      />
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click.native="dialogOpen = false">Annuler</v-btn>
                    <v-btn color="blue darken-1" flat @click.native="insert">Valider</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-flex>
            <v-flex sm4>
              <v-text-field
                  append-icon="search"
                  label="Rechercher"
                  hide-details
                  v-model="search"
              />
            </v-flex>
          </v-layout>
        </v-container>
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
                        @input="commit(entities ? props.item : entity)"
                      />
                    </td>
                  </tr>
                </template>
                <template v-if="ediTables" slot="expand" slot-scope="props">
                  <v-container grid-list-md>
                    <v-layout row wrap>
                      <edi-table
                          v-for="(ediTable, k) in ediTables"
                          :entity="props.item"
                          v-bind="ediTable"
                          :key="k"
                          @commit="commit"
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
import {detectFormat} from './../../../utils'
import EdiTableCell from './EdiTableCell'
import AutoForm from '../Form/AutoForm'
import _ from 'lodash'

export default {
  name: 'edi-table',
  components: {
    EdiTableCell,
    AutoForm
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
    entityType: {
      type: String,
      default: 'entity'
    },
    headersAttr: {
      type: Object,
      required: true
    },
    ediTables: {
      type: Object
    },
    allowAdd: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      search: '',
      dialogOpen: false,
      newItem: {}
    }
  },
  methods: {
    commit (item) {
      this.$emit('commit', item)
    },
    insert: function () {
      if (this.$refs.form.validate()) {
        if (this.entity && this.attrKey) {
          this.entity[this.attrKey].push(_.cloneDeep(this.newItem))
          this.$emit('commit', this.entity)
        } else {
          this.$emit('commit', this.newItem)
        }
        this.dialogOpen = false
        this.$refs.form.reset()
      }
    }
  },
  computed: {
    format () {
      return this.attrKey ? this.CONST.dataStructure[this.entityType][this.attrKey]._format : this.CONST.dataStructure[this.entityType]
    },
    headers () {
      const headers = []
      const format = this.format
      for (let key in format) {
        let h = this.headersAttr[key]
        if (h) {
          const et = format[key]
          headers.push({
            text: et.label,
            value: key,
            key: key,
            editable: true,
            format: detectFormat(et.type),
            ...h,
            ...et
          })
        }
      }
      return headers
    },
    formFields () {
      return this.headers.filter((f) => f.required)
    }
  }
}
</script>

<style scoped></style>
