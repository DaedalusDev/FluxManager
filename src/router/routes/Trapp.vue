<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <expandable
          :mapping="mapping"
          v-model="mapping.PROCEDURE"
      />

      <v-slide-x-reverse-transition mode="in-out">
        <v-container grid-list-md v-show="showFilter" class="filterWrapper card">
          <v-layout row wrap>
            <v-flex>
              <v-form ref="form">
                Résultats : {{ aResults.length }}
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
      <v-btn
          color="blue darken-2"
          dark
          fab
          fixed
          right
          bottom
          @click.native="showFilter = !showFilter"
          v-model="showFilter"
      >
        <v-icon>filter_list</v-icon>
        <v-icon>close</v-icon>
      </v-btn>
    </v-layout>
  </v-container>
</template>

<script>
import mappingTrapp from '../../assets/trapp'
import _ from 'lodash'

const aNodes = []
export default {
  data () {
    const mapping = constructionMapping({PROCEDURE: mappingTrapp['xsd']['PROCEDURE']})
    return {
      mapping,
      showFilter: false,
      term: null,
      searchInProgress: false
    }
  },
  methods: {
    applyFilter: _.debounce(function () {
      const rPattern = this.term ? new RegExp(this.term, 'i') : false
      aNodes.forEach(function (n) {
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
      this.searchInProgress = false
    }, 400)
  },
  watch: {
    term () {
      this.searchInProgress = true
      this.applyFilter()
    }
  },
  computed: {
    aResults () {
      return aNodes.filter((n) => n.matchFilter)
    }
  }
}

const mapNode = (o) => {
  if (_.isObject(o)) {
    aNodes.push(o)
    // Init dynamic v-model
    o.isOpen = false
    o.childMatch = false
    o.matchFilter = true
    // Traitement des nodes
    if (o.nodeType === 'element' && mappingTrapp['xsd'][o.type]) {
      o.childNodes = mappingTrapp['xsd'][o.type]['childNodes'] || false
    } else if (o.nodeType !== 'element' && o.type && o.type.substr(0, 3) !== 'xs:') {
      o.error = 'Type inconnu'
    }
    if (o.childNodes) {
      constructionMapping(o.childNodes, o)
    }
  }
  return o
}

const constructionMapping = (o, p) => {
  if (_.isObject(o)) {
    _.mapValues(o, (n) => {
      if (p) {
        n.parent = p
        n.path = p.path + '/' + n.name
      } else {
        n.path = n.name
      }
      return mapNode(n)
    })
  }
  return o
}
</script>

<style scoped>
  .filterWrapper {
    position: fixed;
    bottom: 90px;
    right: 10px;
    width: 300px;
    padding: 24px 16px;
    max-height: 75vh;
    overflow: auto;
    z-index:4;
  }
</style>
