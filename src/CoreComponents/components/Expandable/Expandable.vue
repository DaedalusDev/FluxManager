<template>
  <v-flex class="expandable">
    <!--<div v-if="parentLine!==''" :class="'expandable-horizontal-line '+ parentLine"></div>-->
    <v-expansion-panel expand>
      <v-expansion-panel-content :class="classes" lazy @input="setIsOpen" :value="isOpen">
        <div slot="header" class="expandable-header"
             :style="{opacity: value.matchFilter ? 1 : 0.25, paddingLeft: hasFocus ? '1.5rem': null}">
          <!--<div :class="'expandable-vertical-line '+ parentLine"></div>-->
          <!--<div :class="'expandable-dot ' + line"></div>-->
          <!--<div :class="'expandable-horizontal-line '+ line"></div>-->
          {{ value.name }} {{mappings}}
        </div>
        <v-card>
          <v-card-text class="grey lighten-3 expandable-content" style="padding-left: 2rem;">
            <div class="nodeDescription">
              <!--<div :class="'expandable-horizontal-line '+ line"></div>-->
              <span v-if="elementAttr" v-for="(attr, k) in elementAttr">
              <strong>{{k}}</strong> : {{attr}}
            </span>
            </div>
            <!--<expandable-->
            <!--v-if="elementSubStructure"-->
            <!--v-for="(childNode, k) in elementSubStructure"-->
            <!--:mapping="mapping"-->
            <!--v-model="elementSubStructure[k]"-->
            <!--:key="_uid + '-' + childNode.name"-->
            <!--/>-->
            <expandable
                v-if="value.childNodes !== undefined"
                v-for="(childNode, k) in value.childNodes"
                v-model="value.childNodes[k]"
                :key="childNode.path"
                :nbMapping="nbMapping"
                :parentLine="line"
            />
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-flex>
</template>

<script>
const EXCLUDE = ['childNodes', 'nodeName', 'name', 'isOpen', 'parent', ' matchFilter', 'childMatch', 'vInstance', 'mappings']
const COLORS = ['red', 'blue', 'green', 'purple', 'yellow', 'lime', 'indigo', 'pink']
export default {
  name: 'expandable',
  props: {
    value: {
      type: Object
    },
    nbMapping: {
      type: Number,
      default: 1
    },
    parentLine: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      line: COLORS[Math.floor(Math.random() * COLORS.length)],
      hasFocus: false
    }
  },
  methods: {
    setIsOpen (v) {
      this.value.isOpen = v
    },
    highlight () {
      window.scrollBy({
        top: this.$el.getBoundingClientRect().top - 150,
        behavior: 'smooth'
      })
      this.hasFocus = true
      setTimeout(() => {
        this.hasFocus = false
      }, 400)
    }
  },
  watch: {
    value (v) {
      v.vInstance = this
    }
  },
  mounted () {
    this.value.vInstance = this
  },
  computed: {
    classes () {
      if (this.nbMapping === 1) {
        return ''
      }
      const count = Object.keys(this.value.mappings).length
      let classe = 'orange'
      if (count === 1) {
        classe = 'red'
      }
      if (count === this.nbMapping) {
        classe = 'green'
      }
      return classe + ' lighten-3'
    },
    isOpen () {
      return this.value.isOpen || this.value.childMatch
    },
    // matchFilter () {
    //   const {filter} = this
    //   let matchFilter = true
    //   if (filter.pattern && this.value.name.search(filter.pattern)) matchFilter = false
    //   return matchFilter
    // },
    elementAttr () {
      const {value} = this
      const attr = {}
      for (let k in value) {
        if (!EXCLUDE.includes(k)) {
          attr[k] = value[k]
        }
      }
      if (Object.keys(attr).length === 0) return false
      return attr
    },
    mappings () {
      return Object.keys(this.value.mappings).join(',')
    }
    // elementSubStructure () {
    //   const {value, mapping} = this
    //   if (value.nodeType === 'element' && mapping['xsd'][value.type]) {
    //     return mapping['xsd'][value.type]['childNodes'] || false
    //   }
    //   return false
    // }
    // isOpen: {
    //   get () {
    //     return (this.value.isOpen && this.matchFilter) || this.hasOpenChild
    //   },
    //   set (v) {
    //     this.value.isOpen = v
    //   }
    // }
  }
}
</script>

<style scoped>
  .expandable {
    position: relative;
  }

  .container.grid-list-md .layout .flex.expandable {
    padding: 0;
  }

  .expandable-dot {
    position: absolute;
    top: calc(50% - 0.5rem);
    left: 0.5rem;
    width: 1rem;
    height: 1rem;
    border-radius: 1rem;
  }

  .expandable-horizontal-line {
    position: absolute;
    left: -1.25rem;
    top: 0;
    bottom: 0;
    width: 0.5rem;
  }

  .expandable-vertical-line {
    position: absolute;
    left: -1.25rem;
    top: 1.5rem;
    width: 2.5rem;
    height: 0.5rem;
  }

  .expandable:last-of-type > .expandable-horizontal-line {
    bottom: auto;
    height: 1.5rem;
  }

  .expandable-header {
    transition: all 400ms;
  }

  .expandable-header .expandable-horizontal-line {
    left: 0.75rem;
  }

  .expandable .expandable-header .expandable-horizontal-line {
    top: 1.5rem;
  }

  .nodeDescription {
    position: relative;
  }

  .nodeDescription > .expandable-horizontal-line {
    top: -16px;
  }

</style>
