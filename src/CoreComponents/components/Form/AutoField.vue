<template>
  <div class="flex">
    <v-switch
        v-if="inputType === 'bool'"
        ref="input"
        :label="fieldDef.label"
        v-model="tmpValue"
        style="padding: 18px 0 0;"
        @change="handleChange"
    />
    <v-text-field
        v-else-if="inputType === 'string'"
        ref="input"
        :label="fieldDef.label"
        v-model="tmpValue"
        counter
        @input="handleChange"
        :rules="fieldDef.rules"
    />
    <v-select
        v-else-if="inputType === 'array'"
        :label="fieldDef.label"
        :items="fieldDef.items || []"
        v-model="tmpValue"
        item-text="name"
        item-value="name"
        multiple
        chips
        max-height="auto"
        autocomplete
    >
      <template slot="selection" slot-scope="data">
        <v-chip
            close
            @input="data.parent.selectItem(data.item)"
            :selected="data.selected"
            class="chip--select-multi"
            :key="JSON.stringify(data.item)"
        >
          <v-avatar>
            <img :src="data.item.avatar">
          </v-avatar>
          {{ data.item.name }}
        </v-chip>
      </template>
      <template slot="item" slot-scope="data">
        <template v-if="typeof data.item !== 'object'">
          <v-list-tile-content v-text="data.item"></v-list-tile-content>
        </template>
        <template v-else>
          <v-list-tile-avatar>
            <img :src="data.item.avatar">
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
            <v-list-tile-sub-title v-html="data.item.group"></v-list-tile-sub-title>
          </v-list-tile-content>
        </template>
      </template>
    </v-select>
  </div>
</template>

<script>
export default {
  props: {
    fieldDef: {
      type: Object,
      required: true
    },
    value: {}
  },
  data () {
    return {
      tmpValue: this.value
    }
  },
  watch: {
    value (v) {
      this.tmpValue = v
    }
  },
  methods: {
    focus () {
      const input = this.$refs.input
      if (input && typeof input.focus === 'function') {
        input.focus()
      }
    },
    handleChange (v) {
      this.$emit('input', v)
    },
    validate () {
      return this.$refs.input.validate()
    }
  },
  computed: {
    inputType () {
      switch (this.fieldDef.type) {
        case Boolean:
          return 'bool'
        case Array:
          return 'array'
        default:
          return 'string'
      }
    }
  }
}
</script>