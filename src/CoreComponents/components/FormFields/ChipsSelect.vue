<template>
    <v-select
            :label="label"
            :items="formatedItems"
            :value="value"
            item-text="name"
            item-value="name"
            multiple
            chips
            autocomplete
            @input="handleChange"
            attach
    >
        <template slot="selection" slot-scope="data">
            <template v-if="value.length === items.length">
                <template v-if="data.index === 0">
                    Tous les éléments
                </template>
            </template>
            <template v-else>
                <v-chip
                        close
                        @input="data.parent.selectItem(data.item)"
                        :selected="data.selected"
                        class="chip--select-multi"
                        :key="JSON.stringify(data.item)"
                >
                    <v-avatar v-if="data.item.avatar">
                        <img :src="data.item.avatar">
                    </v-avatar>
                    {{ data.item.name }}
                </v-chip>
            </template>
        </template>
        <template slot="item" slot-scope="data">
            <v-list-tile-avatar v-if="data.item.avatar">
                <img :src="data.item.avatar">
            </v-list-tile-avatar>
            <v-list-tile-content>
                <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
                <v-list-tile-sub-title v-html="data.item.group"></v-list-tile-sub-title>
            </v-list-tile-content>
        </template>
    </v-select>
</template>
<script>
import _ from 'lodash'

export default {
  name: 'childs-select',
  props: {
    items: {
      type: Array,
      required: true
    },
    value: {
      type: Array
    },
    label: String
  },
  methods: {
    handleChange (v) {
      this.$emit('input', v)
    }
  },
  computed: {
    formatedItems () {
      return this.items.map((i) => {
        if (_.isString(i)) return { name: i, value: i }
        return i
      })
    }
  }
}
</script>
