<template>
    <v-slide-x-reverse-transition mode="in-out">
        <v-container grid-list-md v-show="showFilter" class="filterWrapper card">
            <v-layout row wrap>
                <v-flex>
                    <v-form ref="form">
                        Résultats : {{ (iTargetedElement + 1) }} / {{ nbResults }}
                        <childs-select
                            :items="availableOrigines"
                            v-model="value.selectedOrigines"
                            label="Fichier de mapping"
                            @input="handleChange"
                        />
                        <childs-select
                            :items="availableCibles"
                            v-model="value.selectedCibles"
                            label="Application cible"
                            @input="handleChange"
                        />
                        <v-text-field
                                label="Recherche"
                                v-model="value.term"
                                @keypress.enter="$event.shiftKey ? scrollTo(-1) : scrollTo(1)"
                                @input="handleChange"
                        />
                    </v-form>
                </v-flex>
            </v-layout>
        </v-container>
    </v-slide-x-reverse-transition>
</template>

<script>
export default {
  props: {
    showFilter: Boolean,
    iTargetedElement: Number,
    nbResults: Number,
    value: Object,
    availableOrigines: Array,
    availableCibles: Array,
    scrollTo: Function
  },
  methods: {
    handleChange () {
      this.$emit('input', this.value)
    }
  }
}
</script>

<style scoped>
    .filterWrapper {
        position: fixed;
        bottom: 90px;
        right: 100px;
        width: 500px;
        padding: 24px 16px;
        max-height: 75vh;
        overflow: auto;
        z-index: 4;
    }
</style>
