<template>
    <v-container fluid>
        <v-slide-x-transition>
            <v-layout column align-center>
                <keep-alive>
                <d3-network
                        :net-nodes="nodes"
                        :net-links="links"
                        :options="options"
                        :selection="{nodes: selected, links: linksSelected}"
                        @node-click="nodeClick"
                        @link-click="linkClick"/>
                </keep-alive>
            </v-layout>
        </v-slide-x-transition>
    </v-container>
</template>

<script>
  import D3Network from 'vue-d3-network'
  import {createNamespacedHelpers} from 'vuex'
  import Vue from 'vue'

  const storeManager = createNamespacedHelpers('manager')

  export default {
    components: {
      D3Network
    },
    data () {
      const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
      const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - 40
      return {
        options: {
          size: {
            w,
            h
          },
          force: 10000,
          nodeSize: 25,
          linkWidth: 5,
          nodeLabels: true,
          linkLabels: true,
          strLinks: true
        },
        selected: {},
        linksSelected: {}
      }
    },
    methods: {
      selection () {
        return {
          nodes: this.selected,
          links: this.linksSelected
        }
      },
      buttonClass (tool) {
        if (tool === this.tool) return 'selected'
      },
      setTool (tool) {
        this.tool = tool
        let cursorClass = (tool === 'pointer') ? '' : 'cross-cursor'
        this.$el.className = cursorClass
      },
      updateSelection () {
        this.showSelection = (Object.keys(this.selected).length | Object.keys(this.linksSelected).length)
      },
      changeOptions (options) {
        this.options = Object.assign({}, options)
      },
      removeLink (link) {
        this.unSelectLink(link.id)
        this.links.splice(link.index, 1)
      },
      pinNode (node) {
        if (!node.pinned) {
          node.pinned = true
          node.fx = node.x
          node.fy = node.y
        } else {
          node.pinned = false
          node.fx = null
          node.fy = null
        }
        this.nodes[node.index] = node
      },
      // -- Selection
      selectNode (node) {
        this.selected[node.id] = node
      },
      selectNodesLinks () {
        for (let link of this.links) {
          // node is selected
          if (this.selected[link.sid] || this.selected[link.tid]) {
            this.selectLink(link)
            // node is not selected
          } else {
            this.unSelectLink(link.id)
          }
        }
      },
      nodeClick (event, node) {
        switch (this.tool) {
          case 'killer':
            this.removeNode(node.id)
            break
          case 'pin':
            this.pinNode(node)
            break
          default: // selection tool
            // is selected
            if (this.selected[node.id]) {
              this.unSelectNode(node.id)
              // is not selected
            } else {
              this.selectNode(node)
            }
            this.selectNodesLinks()
            break
        }
        this.updateSelection()
      },
      linkClick (event, link) {
        if (this.tool === 'killer') {
          this.removeLink(link)
        } else {
          if (this.linksSelected[link.id]) {
            this.unSelectLink(link.id)
          } else {
            this.selectLink(link)
          }
        }
        this.updateSelection()
      },
      selectLink (link) {
        this.$set(this.linksSelected, link.id, link)
      },
      clearSelection () {
        this.selected = {}
        this.linksSelected = {}
      },
      unSelectNode (nodeId) {
        if (this.selected[nodeId]) {
          Vue.delete(this.selected, nodeId)
        }
        this.selectNodesLinks()
      },
      unSelectLink (linkId) {
        if (this.linksSelected[linkId]) {
          Vue.delete(this.linksSelected, linkId)
        }
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
          _size: 25
        }))
      },
      links () {
        return this.entitiesLink.map(l => ({
          id: l.id,
          name: l.linksType.length + ' lien(s)',
          sid: l.source,
          tid: l.target
        }))
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h1, h2 {
        font-weight: normal;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>


