<template>
    <v-container fluid>
        <v-layout wrap>
            <keep-alive>
                <mapping-network
                    v-model="selection"
                    :tool="currentTool.value"
                    :nodes="nodes"
                    :links="links"
                    :opt="opt"
                    ref="mappingNetwork"/>
            </keep-alive>
            <v-slide-x-reverse-transition mode="in-out">
                <v-container grid-list-md v-show="showSelection" class="selection">
                    <v-layout row wrap>
                        <transition-group name="slide-x-reverse-transition" style="width: 100%">
                            <v-flex xs12 v-for="node in selection.nodes" :key="node.id">
                                <mapping-node-info
                                    :node="node"
                                    :groupedLinks="groupedLinks[node.id]"
                                    :indexedNodes="entities"
                                    @lock="lock(node)"/>
                            </v-flex>
                        </transition-group>
                    </v-layout>
                </v-container>
            </v-slide-x-reverse-transition>
            <mapping-options v-model="opt"/>
            <mapping-tools v-model="currentTool"/>
        </v-layout>
    </v-container>
</template>

<script>
  import MappingTools from '../../components/Mapping/MappingTools'
  import MappingNetwork from '../../components/Mapping/MappingNetwork'
  import MappingOptions from '../../components/Mapping/MappingOptions'
  import MappingNodeInfo from '../../components/Mapping/MappingNodeInfo'
  import {createNamespacedHelpers} from 'vuex'

  const storeManager = createNamespacedHelpers('manager')

  export default {
    components: {
      MappingNetwork,
      MappingTools,
      MappingOptions,
      MappingNodeInfo
    },
    data () {
      return {
        currentTool: {},
        selection: {nodes: {}, links: {}},
        opt: {
          nodeLabels: true,
          linkLabels: true
        },
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
        this.selectionLength = Object.keys(s.nodes).length
        this.showSelection = !!this.selectionLength
      }
    },
    computed: {
      ...storeManager.mapState({
        entities: 'entities',
        entitiesLink: 'links'
      }),
      nodes () {
        return Object.values(this.entities).map(e => ({
          id: e.id,
          name: e.nom,
          _size: 25,
          pinned: false,
          fx: null,
          fy: null
        }))
      },
      links () {
        return Object.values(this.entitiesLink).map(l => ({
          id: l.id,
          name: l.linksType.length + ' lien' + (l.linksType.length > 1 ? 's' : ''),
          sid: l.source,
          tid: l.target
        }))
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
        overflow-y: auto;
        overflow-x: hidden;
    }
    .selection .headline {
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>