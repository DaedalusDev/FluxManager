<template>
    <v-expansion-panel expand>
        <v-expansion-panel-content lazy @input="setIsOpen" :value="isOpen">
            <div slot="header" class="expandableHeader" :style="{opacity: value.matchFilter ? 1 : 0.25, paddingLeft: hasFocus ? '1.5rem': null}">{{ value.name }} {{ institutions}}</div>
            <v-card>
                <v-card-text class="grey lighten-3">
                    <span v-if="elementAttr" v-for="(attr, k) in elementAttr">
                        <strong>{{k}}</strong> : {{attr}}
                    </span>
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
                    />
                </v-card-text>
            </v-card>
        </v-expansion-panel-content>
    </v-expansion-panel>
</template>

<script>
const EXCLUDE = ['childNodes', 'nodeName', 'name', 'isOpen', 'parent', ' matchFilter', 'childMatch', 'vInstance', 'institutions']
export default {
  name: 'expandable',
  props: {
    value: {
      type: Object
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
      setTimeout(() => { this.hasFocus = false }, 400)
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
    institutions () {
      return Object.keys(this.value.institutions).join(',')
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
    .expandableHeader {
        transition: all 400ms;
    }
</style>
