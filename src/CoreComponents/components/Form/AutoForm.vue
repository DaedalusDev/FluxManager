<template>
  <v-form v-model="valid" ref="form" @submit="submit">
    <v-container grid-list-md>
      <v-layout wrap>
        <template v-for="field in model">
          <v-flex xs12 sm6>
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
      this.$refs.form.reset()
    },
    validate () {
      return this.$refs.form.validate()
    },
    handleChange () {
      this.$emit('input', this.values)
    },
    submit (e) {
      this.$emit('submit', e)
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