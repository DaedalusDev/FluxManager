<template>
    <div class="mappings-info right">
        <div v-for="mapping in mappings" :key="mapping" class="d-inline-block brown--text body-2">
            &lt;<span class="blue--text">{{ mapping }}</span>/&gt;
        </div>
    </div>
</template>

<script>
export default {
  props: {
    mappings: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
    .mappings-info div {
        transform: rotate(-30deg);
    }
</style>
