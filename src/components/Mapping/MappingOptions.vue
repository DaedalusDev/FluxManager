<template>
    <div>
        <v-slide-x-transition mode="in-out">
            <v-container grid-list-md v-show="showForm" class="optWrapper card">
                <v-layout row wrap>
                    <v-flex>
                        <h3 class="headline mb-0">Options</h3>
                        <v-form ref="form" @click="$event.stopPropagation()">
                            <v-checkbox
                                    label="Nom des entités"
                                    v-model="opt.nodeLabels"
                                    @change="handleChange"
                            ></v-checkbox>
                            <v-checkbox
                                    label="Nom des liens"
                                    v-model="opt.linkLabels"
                                    @change="handleChange"
                            ></v-checkbox>
                        </v-form>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-slide-x-transition>
        <v-btn
                color="blue darken-2"
                dark
                fab
                fixed
                left
                bottom
                @click.native="toggleMenu"
                v-model="showForm"
        >
            <v-icon>settings</v-icon>
            <v-icon>close</v-icon>
        </v-btn>
    </div>
</template>

<script>
  export default {
    data () {
      return {
        showForm: false,
        opt: {
          nodeLabels: true,
          linkLabels: true
        }
      }
    },
    methods: {
      handleChange () {
        this.$emit('input', this.opt)
      },
      toggleMenu () {
        this.showForm = !this.showForm
      }
    }
  }
</script>

<style scoped>
    .optWrapper {
        position: fixed;
        bottom: 90px;
        left: 0;
        width: 300px;
        padding: 24px 16px;
        max-height: 75vh;
        overflow: auto;
    }
    .optWrapper .headline {
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>