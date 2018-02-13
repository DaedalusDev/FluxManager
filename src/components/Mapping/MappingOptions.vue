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
                                    v-model="value.nodeLabels"
                            ></v-checkbox>
                            <v-checkbox
                                    label="Info des liens"
                                    v-model="value.linkLabels"
                            ></v-checkbox>
                            <v-slider v-model="value.forceFactor" thumb-label label="Force" ticks></v-slider>
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
    props: {
      value: {
        type: Object
      }
    },
    data () {
      return {
        showForm: false
      }
    },
    methods: {
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
        z-index:4;
    }
    .optWrapper .headline {
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>