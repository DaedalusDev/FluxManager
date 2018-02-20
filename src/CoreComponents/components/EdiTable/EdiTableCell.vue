<template>
    <v-menu
            class="small-dialog"
            contentClass="small-dialog__content"
            origin="top right"
            right
            closeOnClick
            :closeOnContentClick="false"
            lazy
            transition="slide-x-reverse-transition"
            @click.native="$event.stopPropagation()"
            v-model="isActive"
            :disabled="!h.editable"
    >
        <a slot="activator">{{ (h.format? h.format(value): value) || 'Aucun'}}</a>
        <div @keydown.esc="cancel" @keydown.enter="save">
            <auto-field
                v-model="tmpValue"
                :fieldDef="h"
                ref="input"
                class="mt-3"
            />
        </div>
        <div class="small-dialog__actions">
            <v-btn flat
                   color="primary"
                   light
                   @click="cancel"
            >
                Annuler
            </v-btn>
            <v-btn flat
                   color="primary"
                   light
                   @click="save"
            >
                Valider
            </v-btn>
        </div>
    </v-menu>
</template>

<script>
import AutoField from '../Form/AutoField'
export default {
  components: {
    AutoField
  },
  props: {
    value: {},
    h: {
      type: Object
    }
  },
  data () {
    return {
      tmpValue: this.value,
      returnedValue: undefined,
      isActive: false
    }
  },
  methods: {
    close () {
      this.isActive = false
    },
    cancel () {
      this.returnedValue = undefined
      this.tmpValue = this.value
      this.close()
    },
    save () {
      if (this.$refs.input.validate()) {
        this.returnedValue = this.tmpValue
        this.close()
      }
    }
  },
  watch: {
    value (v) {
      this.tmpValue = v
    },
    isActive (v) {
      setTimeout(() => {
        const input = this.$refs.input
        if (v && input && typeof input.focus === 'function') {
          input.focus()
        }
      }, 50)
      if (this.returnedValue !== undefined) {
        this.$emit('input', this.returnedValue)
        this.returnedValue = undefined
      }
    }
  }
}
</script>