<template>
  <v-expansion-panel expand>
    <v-expansion-panel-content :class="classes" lazy @input="setIsOpen" :value="isOpen">
      <div slot="header" class="expandable-header"
           :style="{opacity: value.matchFilter ? 1 : 0.25, paddingLeft: hasFocus ? '1.5rem': null}">
        {{ value.name }} {{mappings}}
      </div>
      <v-card>
        <v-card-text class="grey lighten-3 expandable-content" style="padding-left: 2rem;">
          <div class="nodeDescription">
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
          />
        </v-card-text>
      </v-card>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
const EXCLUDE = ['childNodes', 'nodeName', 'name', 'isOpen', 'parent', ' matchFilter', 'childMatch', 'vInstance', 'mappings']
export default {
  name: 'expandable',
  props: {
    value: {
      type: Object
    },
    nbMapping: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
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
    },
    classes () {
      const {nbMapping} = this
      const aClasses = []
      if (nbMapping !== 1) {
        aClasses.push('lighten-3')
        const count = Object.keys(this.value.mappings).length
        if (count === nbMapping) {
          aClasses.push('green')
        } else if (count === 1) {
          aClasses.push('red')
        } else {
          aClasses.push('orange')
        }
      } else {
        aClasses.push('white')
      }
      return aClasses
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
    .expandable-header {
        transition: all 400ms;
    }
</style>
