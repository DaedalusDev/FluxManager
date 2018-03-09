<template>
    <v-expansion-panel expand>
        <v-expansion-panel-content :lazy="true">
            <div slot="header">{{ value.name }}</div>
            <v-card>
                <v-card-text class="grey lighten-3">
                    <span v-if="elementAttr" v-for="(attr, k) in elementAttr">
                        <strong>{{k}}</strong> : {{attr}}
                    </span>
                    <expandable
                        v-if="elementSubStructure"
                        v-for="childNode in elementSubStructure"
                        :mapping="mapping"
                        :value="childNode"
                        :key="_uid + '-' + childNode.name"
                    />
                    <expandable
                        v-if="value.childNodes !== undefined"
                        v-for="childNode in value.childNodes"
                        :mapping="mapping"
                        :value="childNode"
                        :key="_uid + '-' + childNode.name"
                    />
                </v-card-text>
            </v-card>
        </v-expansion-panel-content>
    </v-expansion-panel>
</template>

<script>
const EXCLUDE = ['childNodes', 'nodeType', 'name']
export default {
  name: 'expandable',
  props: {
    mapping: {
      type: Object,
      required: true
    },
    value: {
      type: Object,
      required: true
    },
    filter: {
      type: Object
    }
  },
  watch: {
    filter (filter) {
      let visible = false
      if (filter.pattern && this.value.name.search(filter.pattern)) visible = true
      console.log(visible)
    }
  },
  computed: {
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
    elementSubStructure () {
      const {value, mapping} = this
      if (value.nodeType === 'element' && mapping['xsd'][value.type]) {
        return mapping['xsd'][value.type]['childNodes'] || false
      }
      return false
    }
  }
}
</script>
