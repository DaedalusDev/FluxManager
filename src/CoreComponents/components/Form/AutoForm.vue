<template>
  <v-form v-model="valid" ref="form">
    <v-container grid-list-md>
      <v-layout wrap>
        <template v-for="field in model">
          <v-flex xs12 sm6>
            {{ field }}
            <auto-field
                :field-def="field"
                v-model="values[field.key]"
                @input="handleChange"
            />
          </v-flex>
        </template>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
import AutoField from './AutoField'
export default {
  components: {
    AutoField
  },
  props: {
    model: {
      type: Array,
      required: true
    },
    value: {
      type: Object
    }
  },
  methods: {
    reset () {
      const values = {}
      this.model.forEach(function (f) {
        values[f.key] = undefined
      })
      this.values = values
    },
    handleChange () {
      this.$emit('input', this.values)
    }
  },
  data () {
    return {
      valid: false,
      values: {}
    }
  }
}
</script>