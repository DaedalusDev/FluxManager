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
        :value="tmpValue"
        counter
        @input="handleChange"
    />
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