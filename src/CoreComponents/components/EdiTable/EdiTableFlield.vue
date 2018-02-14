<template>
  <v-text-field
      label="Modifier"
      :value="value"
      single-line
      counter
  ></v-text-field>
</template>

<script>

export default {
  props: ['value']
}
</script>