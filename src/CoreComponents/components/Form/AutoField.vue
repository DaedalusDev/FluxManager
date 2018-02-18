<template>
  <div>
    <v-switch
        v-if="inputType === 'bool'"
        ref="input"
        label="Activer"
        v-model="value"
        style="padding: 18px 0 0;"
    />
    <v-text-field
        v-if="inputType === 'string'"
        ref="input"
        label="Modifier"
        v-model="value"
        single-line
        counter
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
  methods: {
    focus () {
      const input = this.$refs.input
      if (input && typeof input.focus === 'function') {
        input.focus()
      }
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