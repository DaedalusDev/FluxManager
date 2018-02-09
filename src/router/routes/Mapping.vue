<template>
  <v-container fluid>
    <v-slide-x-transition>
      <v-layout column align-center>
        <svg xmlns="http://www.w3.org/2000/svg"
             :width="width+'px'"
             :height="height+'px'"
             @mousemove="drag($event)"
             @mouseup="drop()"
             v-if="bounds.minX">

          <line v-for="link in graph.links"
                :x1="coords[link.source.index].x"
                :y1="coords[link.source.index].y"
                :x2="coords[link.target.index].x"
                :y2="coords[link.target.index].y"
                stroke="black" stroke-width="2"/>

          <circle v-for="(node, i) in graph.nodes"
                  :cx="coords[i].x"
                  :cy="coords[i].y"
                  :r="(node.hover ? 25 : 20)" :fill="colors[Math.ceil(Math.sqrt(node.index))]"
                  :stroke="node.hover ? 'red' : 'white'" stroke-width="1"
                  @mousedown="currentMove = {x: $event.screenX, y: $event.screenY, node: node}"
                  @mouseenter="node.hover=true"
                  @mouseleave="node.hover=false""/>
        </svg>
      </v-layout>
    </v-slide-x-transition>
  </v-container>
</template>

<script>
import * as d3 from 'd3'

export default {
  data () {
    const width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
    const height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - 40
    return {
      graph: {
        nodes: d3.range(100).map(i => ({index: i, x: 0, y: 0, hover: false})),
        links: d3.range(99).map(i => ({source: Math.floor(Math.sqrt(i)), target: i + 1}))
      },
      width,
      height,
      padding: 20,
      colors: ['#2196F3', '#E91E63', '#7E57C2', '#009688', '#00BCD4', '#EF6C00', '#4CAF50', '#FF9800', '#F44336', '#CDDC39', '#9C27B0'],
      simulation: null,
      currentMove: null
    }
  },
  computed: {
    bounds () {
      return {
        minX: Math.min(...this.graph.nodes.map(n => n.x)),
        maxX: Math.max(...this.graph.nodes.map(n => n.x)),
        minY: Math.min(...this.graph.nodes.map(n => n.y)),
        maxY: Math.max(...this.graph.nodes.map(n => n.y))
      }
    },
    coords () {
      return this.graph.nodes.map(node => {
        return {
          x: this.padding + (node.x - this.bounds.minX) * (this.width - 2 * this.padding) / (this.bounds.maxX - this.bounds.minX),
          y: this.padding + (node.y - this.bounds.minY) * (this.height - 2 * this.padding) / (this.bounds.maxY - this.bounds.minY)
        }
      })
    }
  },
  created () {
    this.simulation = d3.forceSimulation(this.graph.nodes)
      .force('charge', d3.forceManyBody().strength(d => -100))
      .force('link', d3.forceLink(this.graph.links))
      .force('x', d3.forceX())
      .force('y', d3.forceY())
  },
  mounted () {
    this.width = this.$el.offsetWidth
    this.height = document.documentElement.clientHeight - this.$el.offsetTop
  },
  methods: {
    drag (e) {
      if (this.currentMove) {
        this.currentMove.node.x = this.currentMove.node.x - (this.currentMove.x - e.screenX) * (this.bounds.maxX - this.bounds.minX) / (this.width - 2 * this.padding)
        this.currentMove.node.y = this.currentMove.node.y - (this.currentMove.y - e.screenY) * (this.bounds.maxY - this.bounds.minY) / (this.height - 2 * this.padding)
        this.currentMove.x = e.screenX
        this.currentMove.y = e.screenY
      }
    },
    drop () {
      if (this.currentMove) {
        this.currentMove = null
        this.simulation.alpha(0.1)
        this.simulation.restart()
      }
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


