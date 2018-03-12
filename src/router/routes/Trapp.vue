<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <expandable
          :mapping="currentMapping"
          v-model="currentMapping.PROCEDURE"
      />

      <v-slide-x-reverse-transition mode="in-out">
        <v-container grid-list-md v-show="showFilter" class="filterWrapper card">
          <v-layout row wrap>
            <v-flex>
              <v-form ref="form">
                Résultats : {{ iTargetedElement }} / {{ aResults.length }}
                  <v-select
                          :items="availableMapping"
                          v-model="selectedMapping"
                          label="Select"
                          single-line
                  />
                  <v-text-field
                      label="Recherche"
                      v-model="term"
                      :loading="searchInProgress"
                  />
              </v-form>
            </v-flex>
          </v-layout>
        </v-container>
      </v-slide-x-reverse-transition>
        <v-speed-dial
                v-model="showFilter"
                bottom
                right
                fixed
        >
            <v-btn
                    slot="activator"
                    color="blue darken-2"
                    dark
                    fab
                    hover
                    v-model="showFilter"
            >
                <v-icon>filter_list</v-icon>
                <v-icon>close</v-icon>
            </v-btn>

            <v-btn
                    fab
                    dark
                    small
                    color="red"
                    @click.stop="scrollTo(1)"
                    :disabled="aResults === 0 || aResults.length === currentNodes.length"
            >
                <v-icon>keyboard_arrow_down</v-icon>
            </v-btn>
            <v-btn
                    fab
                    dark
                    small
                    color="red"
                    @click.stop="scrollTo(-1)"
                    :disabled="aResults === 0 || aResults.length === currentNodes.length"
            >
                <v-icon>keyboard_arrow_up</v-icon>
            </v-btn>
        </v-speed-dial>
    </v-layout>
  </v-container>
</template>

<script>
import mappingTrapp from '../../assets/trapp'
import _ from 'lodash'

const oNodes = {}
export default {
  data () {
    const mapping = allMapping()
    return {
      mapping,
      oNodes,
      showFilter: false,
      term: null,
      searchInProgress: false,
      iTargetedElement: 0,
      availableMapping: Object.keys(mapping),
      selectedMapping: 'xsd'
    }
  },
  methods: {
    debouncedFilter: _.debounce(function () {
      this.applyFilter()
    }, 400),
    applyFilter () {
      const rPattern = this.term ? new RegExp(this.term, 'i') : false
      this.currentNodes.forEach(function (n) {
        n.childMatch = false
        n.matchFilter = true
        if (rPattern) {
          const bMatch = rPattern.test(n.name)
          n.matchFilter = bMatch
          if (bMatch) {
            let p = n.parent
            while (p) {
              p.childMatch = bMatch
              p = p.parent
            }
          }
        }
      })
      this.iTargetedElement = 0
      this.searchInProgress = false
      setTimeout(() => this.scrollTo(0), 600)
    },
    scrollTo (dir) {
      if (this.aResults.length) {
        if (dir) {
          this.iTargetedElement = this.iTargetedElement + dir
        }
        if (this.iTargetedElement < 0) {
          this.iTargetedElement = this.aResults.length - 1
        }
        if (this.iTargetedElement > this.aResults.length) {
          this.iTargetedElement = 0
        }
        const vInstance = _.get(this.aResults[this.iTargetedElement], 'vInstance')
        if (vInstance) {
          vInstance.highlight()
        }
      }
    }
  },
  watch: {
    term () {
      this.searchInProgress = true
      this.debouncedFilter()
    },
    selectedMapping () {
      this.applyFilter()
    }
  },
  computed: {
    aResults () {
      return this.currentNodes.filter((n) => n.matchFilter)
    },
    currentMapping () {
      return this.mapping[this.selectedMapping]
    },
    currentNodes () {
      return this.oNodes[this.selectedMapping]
    }
  }
}
const allMapping = () => {
  const oMapping = {}
  const aMapping = [{}]
  for (let k in mappingTrapp) {
    oNodes[k] = []
    oMapping[k] = constructionMapping({PROCEDURE: mappingTrapp[k]['PROCEDURE']}, k)
    aMapping.push(oMapping[k])
  }
  oMapping['merge'] = _.merge.apply(null, aMapping)
  oNodes['merge'] = indexNode(oMapping['merge'])
  return oMapping
}

const constructionMapping = (o, k, p) => {
  if (_.isObject(o)) {
    _.mapValues(o, (n) => {
      if (p) {
        n.parent = p
        n.path = p.path + '/' + n.name
      } else {
        n.path = n.name
      }
      return mapNode(n, k)
    })
  }
  return o
}

const mapNode = (o, k) => {
  if (_.isObject(o)) {
    oNodes[k].push(o)
    // Init dynamic v-model
    o.isOpen = false
    o.childMatch = false
    o.matchFilter = true
    o.institutions = {[k]: true}
    // Traitement des nodes
    if (o.nodeName === 'xs:element' && mappingTrapp[k][o.type]) { // Cas du XSD
      o.childNodes = mappingTrapp[k][o.type]['childNodes'] || false
    } else if (o.nodeName === 'xsl:call-template' && mappingTrapp[k][o.name] && o.parent.name !== o.name) { // Cas du XSL
      o.childNodes = mappingTrapp[k][o.name]['childNodes'] || false
    } else if (o.nodeName !== 'xs:element' && o.type && o.type.substr(0, 3) !== 'xs:') {
      o.error = 'Type inconnu'
    }
    if (o.childNodes) {
      constructionMapping(o.childNodes, k, o)
    }
  }
  return o
}

const indexNode = (o) => {
  const aIndex = []
  if (_.isObject(o)) {
    const map = (o) => {
      _.mapValues(o, (n) => {
        if (_.isObject(n)) {
          aIndex.push(n)
          if (n.childNodes) {
            map(n.childNodes)
          }
        }
      })
    }
    map(o)
  }
  return aIndex
}
</script>

<style scoped>
  .filterWrapper {
    position: fixed;
    bottom: 90px;
    right: 100px;
    width: 300px;
    padding: 24px 16px;
    max-height: 75vh;
    overflow: auto;
    z-index:4;
  }
</style>
