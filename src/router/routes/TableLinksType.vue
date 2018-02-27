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
import * as typesLinksType from '../../store/manager/linksType/mutation-types'

const storeManager = createNamespacedHelpers('manager')
const storeLinksType = createNamespacedHelpers('manager/linksType')

export default {
  data () {
    return {
      ediTables: {
        title: 'Liens',
        headersAttr: {
          id: {
            align: 'left'
          },
          nom: {
            align: 'left'
          }
        },
        entityType: 'linkType'
      }
    }
  },
  methods: {
    ...storeLinksType.mapActions({
      commit: typesLinksType.LINKSTYPE_UPDATE_LINKTYPE
    })
  },
  computed: {
    ...storeManager.mapState({
      linksType: 'linksType'
    }),
    items () {
      return Object.values(this.linksType).map((e) => _.cloneDeep(e))
    }
  }
}
</script>

<style scoped></style>
