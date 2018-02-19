<template>
  <keep-alive>
    <d3-network
        :net-nodes="nodes"
        :net-links="links"
        :options="options"
        :selection="value"
        @node-click="nodeClick"
        @link-click="linkClick"
        style="user-select: none"/>
  </keep-alive>
</template>

<script>
import D3Network from 'vue-d3-network'

export default {
  components: {
    D3Network
  },
  props: {
    tool: {
      type: String
    },
    nodes: {
      type: Array,
      default: () => []
    },
    links: {
      type: Array,
      default: () => []
    },
    opt: {
      type: Object,
      default: () => {}
    },
    value: {
      type: Object,
      default: () => ({nodes: {}, links: {}})
    }
  },
  watch: {
    nodes: function (v, oldV) {
      oldV.forEach((old) => {
        if (v.every((n) => n.id !== old.id)) {
          this.$delete(this.selected, old.id)
        }
      })
      this.linksSelected = {}
      this.selectNodesLinks()
      this.updateSelection()
    }
  },
  data () {
    return {
      selected: {},
      linksSelected: {},
      pinned: {},
      ctrlHold: false
    }
  },
  created () {
    this.updateSelection()
  },
  mounted () {
    window.addEventListener('keydown', (e) => {
      this.ctrlHold = e.ctrlKey
    })
    window.addEventListener('keyup', (e) => {
      this.ctrlHold = e.ctrlKey
    })
  },
  methods: {
    // Events
    nodeClick (event, node) {
      switch (this.tool) {
        case 'pin':
          this.pinNode(node)
          break
        default: // selection tool
          // is selected
          if (this.selected[node.id]) {
            this.unSelectNode(node.id)
            // is not selected
          } else {
            if (!this.ctrlHold) this.clearSelection()
            this.selectNode(node)
          }
          this.selectNodesLinks()
          break
      }
      this.updateSelection()
    },
    linkClick (event, link) {
      if (this.linksSelected[link.id]) {
        this.unSelectLink(link.id)
      } else {
        if (!this.ctrlHold) this.clearSelection()
        this.selectLink(link)
      }
      this.updateSelection()
    },
    // Utils
    selection () {
      return {
        nodes: this.selected,
        links: this.linksSelected
      }
    },
    updateSelection () {
      this.$emit('input', this.selection())
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
    },
    // -- Selection
    selectNode (node) {
      this.$set(this.selected, node.id, node)
    },
    selectNodesLinks () {
      this.links.forEach((link) => {
        // node is selected
        if (this.selected[link.sid] || this.selected[link.tid]) {
          this.selectLink(link)
          // node is not selected
        } else {
          this.unSelectLink(link.id)
        }
      })
    },
    selectLink (link) {
      this.$set(this.linksSelected, link.id, link)
    },
    // unSelect
    unSelectNode (nodeId) {
      if (this.selected[nodeId]) {
        this.$delete(this.selected, nodeId)
        this.selectNodesLinks()
      }
    },
    unSelectLink (linkId) {
      if (this.linksSelected[linkId]) {
        this.$delete(this.linksSelected, linkId)
      }
    },
    // Clear all
    clearSelection () {
      this.selected = {}
      this.linksSelected = {}
    }
  },
  computed: {
    options () {
      const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
      const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - 110
      return {
        size: {
          w,
          h
        },
        force: 5000 * Math.max(1, ~~this.opt.forceFactor),
        nodeSize: 25,
        linkWidth: 5,
        nodeLabels: true,
        linkLabels: true,
        strLinks: true,
        ...this.opt
      }
    }
  }
}
</script>
