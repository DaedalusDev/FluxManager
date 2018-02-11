<template>
    <v-container fluid>
        <v-layout wrap>
            <keep-alive>
                <mapping-network
                    v-model="selection"
                    :tool="currentTool.value"
                    :nodes="nodes"
                    :links="links"
                    ref="mappingNetwork"/>
            </keep-alive>
            <mapping-tools v-model="currentTool"/>
            <v-slide-x-reverse-transition mode="in-out">
                <v-container grid-list-md v-show="showSelection" class="selection card">
                    <v-layout row wrap>
                        <h3 class="headline mb-0">Sélection</h3>
                        <v-flex xs12 v-for="node in selection.nodes" :key="node.id">
                            <v-card>
                                <v-card-title primary-title>
                                    <h4 class="headline">{{node.name}}</h4>
                                    <div>
                                        <div v-for="link in groupedLinks[node.id]">
                                            <span>Lien(s) avec {{ indexedNodes[(link.source === node.id ? link.target : link.source)]['nom'] }}</span>
                                            <span v-for="linkType in link.linksType"><br />- {{linkType}}</span>
                                        </div>
                                    </div>
                                </v-card-title>
                                <v-card-actions>
                                    <v-btn icon @click="lock(node)">
                                        <v-icon>{{ node.pinned ? 'lock_open' : 'lock_outline' }}</v-icon>
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-slide-x-reverse-transition>
        </v-layout>
    </v-container>
</template>

<script>
  import MappingTools from '../../components/Mapping/MappingTools'
  import MappingNetwork from '../../components/Mapping/MappingNetwork'
  import {createNamespacedHelpers} from 'vuex'

  const storeManager = createNamespacedHelpers('manager')

  export default {
    components: {
      MappingNetwork,
      MappingTools
    },
    data () {
      return {
        currentTool: {},
        selection: {},
        selectionLength: 0,
        showSelection: false
      }
    },
    methods: {
      lock (node) {
        this.$refs.mappingNetwork.pinNode(node)
      }
    },
    watch: {
      selection (s) {
        this.selectionLength = Object.keys(s.nodes).length + Object.keys(s.links).length
        this.showSelection = !!this.selectionLength
      }
    },
    computed: {
      ...storeManager.mapState({
        entities: 'entities',
        entitiesLink: 'links'
      }),
      nodes () {
        return this.entities.map(e => ({
          id: e.id,
          name: e.nom,
          _size: 25,
          pinned: false,
          fx: null,
          fy: null
        }))
      },
      links () {
        return this.entitiesLink.map(l => ({
          id: l.id,
          name: l.linksType.length + ' lien(s)',
          sid: l.source,
          tid: l.target
        }))
      },
      indexedNodes () {
        const idx = {}
        this.entities.forEach(l => {
          idx[l.id] = l
        })
        return idx
      },
      groupedLinks () {
        const grp = {}
        this.entitiesLink.forEach(l => {
          addOrPush(grp, l.source, l)
          addOrPush(grp, l.target, l)
        })
        return grp
      }
    }
  }

  function addOrPush (o, k, v) {
    if (o[k]) {
      o[k].push(v)
    } else {
      o[k] = [v]
    }
  }
</script>

<style scoped>
    .selection {
        position: fixed;
        top: 75px;
        right: 0;
        width: 300px;
        padding: 24px 16px;
        max-height: 75vh;
        overflow: auto;
    }
    .selection .headline {
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>