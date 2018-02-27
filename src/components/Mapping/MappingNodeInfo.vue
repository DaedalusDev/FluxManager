<template>
    <v-card>
        <v-card-title primary-title>
            <h4 class="headline mb-0">{{node.name}}</h4>
            <span class="grey--text" v-if="groupedLinks">{{ groupedLinks.length }} lien{{groupedLinks.length > 1 ? 's':'' }}</span>
        </v-card-title>
        <v-card-actions>
            <v-btn icon @click="$emit('lock')">
                <v-icon>{{ node.pinned ? 'lock_open' : 'lock_outline' }}</v-icon>
            </v-btn>
            <v-btn icon>
                <v-icon color="green">edit</v-icon>
            </v-btn>
            <v-btn icon @click="askDelete = true">
                <v-icon color="red">delete</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn icon @click.native="show = !show">
                <v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
            </v-btn>
        </v-card-actions>
        <v-slide-y-transition>
            <v-card-text v-show="show">
                <div v-for="link in mappedGroupedLinks">
                    <span>Lien{{ link.linksType.length > 1 ? 's' : '' }} avec {{ indexedNodes[(link.source === node.id ? link.target : link.source)]['nom'] }}</span>
                    <span v-for="linkType in link.linksType"><br/>- {{linkType}}</span>
                </div>
            </v-card-text>
        </v-slide-y-transition>

        <v-dialog v-model="askDelete" persistent max-width="290">
            <v-card>
                <v-card-title class="headline">Etes vous sur de vouloir supprimer cette entitée ?</v-card-title>
                <v-card-text>Le noeud sera supprimé du mapping et l'ensemble des liens associés sera perdu.
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" flat @click.native="askDelete = false">Annuler</v-btn>
                    <v-btn color="green darken-1" flat @click.native="remove(node)">Confirmer</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-card>
</template>

<script>
import * as manTypes from './../../store/manager/mutation-types'
import * as entTypes from './../../store/manager/entities/mutation-types'
import _ from 'lodash'
import {createNamespacedHelpers} from 'vuex'

const manHelper = createNamespacedHelpers('manager')
const entHelper = createNamespacedHelpers('manager/entities')

export default {
  props: {
    node: {
      type: Object
    },
    groupedLinks: {
      type: Array
    },
    indexedNodes: {
      type: Object
    }
  },
  methods: {
    ...entHelper.mapActions({
      edit: entTypes.ENTITIES_UPDATE_ENTITY
    }),
    ...manHelper.mapActions({
      remove: manTypes.ENTITIES_DELETE_ENTITY
    })
  },
  data () {
    return {
      show: false,
      askDelete: false
    }
  },
  computed: {
    mappedGroupedLinks () {
      return this.groupedLinks.map((v) => {
        return {
          ...v,
          linksType: v.linksType.map((l) => _.get(this.$store.state, 'manager.linksType.' + l + '.nom', '???'))
        }
      })
    }
  }
}
</script>

<style scoped>
    h4.headline {
        overflow: hidden;
        text-overflow: ellipsis;
        display: block;
        width: 100%;
    }
</style>
