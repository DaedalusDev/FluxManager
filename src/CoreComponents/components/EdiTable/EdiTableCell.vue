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
            <v-switch
                v-if="inputType === 'bool'"
                ref="input"
                label="Activer"
                v-model="tmpValue"
                style="padding: 18px 0 0;"
            />
            <v-text-field
                v-if="inputType === 'string'"
                ref="input"
                label="Modifier"
                v-model="tmpValue"
                single-line
                counter
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
  export default {
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
        this.returnedValue = this.tmpValue
        this.close()
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
    },
    computed: {
      inputType () {
        switch (this.h.type) {
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