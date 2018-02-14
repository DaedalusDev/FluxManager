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
    >
        <a slot="activator">{{ (h.format? h.format(value): value) || 'Aucun'}}</a>
        <div @keydown="handleKeydown">
            <v-text-field
                    ref="input"
                    label="Edit"
                    v-model="tmpValue"
                    single-line
                    counter
            ></v-text-field>
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
        returnedValue: null,
        isActive: false
      }
    },
    methods: {
      handleKeydown (e) {
        const input = this.$refs.input
        e.keyCode === 27 && this.cancel()
        e.keyCode === 13 && input && this.save(input.value)
      },
      close () {
        this.isActive = false
      },
      cancel () {
        this.returnedValue = null
        this.tmpValue = this.value
        this.close()
      },
      save () {
        this.returnedValue = this.tmpValue
        this.close()
      }
    },
    watch: {
      isActive (v) {
        setTimeout(() => {
          const input = this.$refs.input
          if (input && v) {
            input.focus()
          }
        }, 50)
        if (this.returnedValue) {
          this.$emit('input', this.returnedValue)
        }
      }
    }
  }
</script>