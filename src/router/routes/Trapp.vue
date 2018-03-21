<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <expandable
          v-model="currentMapping.PROCEDURE"
          :nbMapping="nbMapping"
          :systCible="systCible"
      />

      <trapp-filters
        v-bind="filter"
        v-model="filters"
        :scroll-to="scrollTo"
        :nbResults="aResults.length"
        @input="debouncedFilter"
      />
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
      <v-progress-circular
              v-if="searchInProgress"
              :size="150"
              :width="15"
              :rotate="-90"
              :value="searchInProgress"
              color="primary"
              class="trapp-progress"
      >
        <h1>{{ searchInProgress }}%</h1>
      </v-progress-circular>
    </v-layout>
  </v-container>
</template>

<script>
import mappingTrapp from '../../assets/trapp'
import _ from 'lodash'
import TrappFilters from '../../components/Trapp/TrappFilters'

let GLOB_R_A_F = null

export default {
  components: {
    TrappFilters
  },
  data () {
    const mapping = mappingTrapp.data
    const aNodes = indexNode(mapping)
    const systCible = mappingTrapp.info.systemesCible
    return {
      mapping,
      mappingTrapp,
      aNodes,
      systCible,
      showFilter: false,
      iTargetedElement: 0,
      availableOrigines: mappingTrapp.info.systemesOrigine,
      availableCibles: mappingTrapp.info.systemesCible,
      filters: {
        term: null,
        selectedOrigines: mappingTrapp.info.systemesOrigine,
        selectedCibles: mappingTrapp.info.systemesCible
      },
      searchInProgress: false
    }
  },
  methods: {
    debouncedFilter: _.debounce(function () {
      this.applyFilter()
    }, 500),
    applyFilter () {
      if (GLOB_R_A_F) {
        cancelAnimationFrame(GLOB_R_A_F)
        GLOB_R_A_F = null
      }
      const rPattern = this.filters.term ? new RegExp(this.filters.term, 'i') : false

      const traitement = (n) => {
        n.matchFilter = true
        n.childMatch = false
        if (rPattern ||
          this.availableOrigines.length !== this.filters.selectedOrigines.length ||
          this.availableCibles.length !== this.filters.selectedCibles.length
        ) {
          if (rPattern && n.matchFilter) { // Filtrer par term
            n.matchFilter = rPattern.test(n.name)
          }
          if (n.matchFilter && this.availableOrigines.length !== this.filters.selectedOrigines.length &&
            !Object.keys(n.mapping).some((m) => this.filters.selectedOrigines.includes(m))) { // Filtrage des systèmes Origine
            n.matchFilter = false
          }
          if (n.matchFilter && n.to && this.availableCibles.length !== this.filters.selectedCibles.length &&
            Object.keys(n.to).some((m) => this.filters.selectedCibles.includes(m))) {
            n.matchFilter = false
          }
          if (n.matchFilter) {
            let p = n.parent
            while (p) {
              if (p.childMatch) break // cas ou le parent aurait déjà des enfants qui matchent
              p.childMatch = true
              p = p.parent
            }
          }
        }
      }

      let cn = this.currentNodes.slice(0)
      let lcn = cn.length
      let nExpectedLoops = lcn / 100 | 0
      const allTraitementProm = () => {
        return new Promise(resolve => {
          const allTraitement = () => {
            for (let x = 0; x < nExpectedLoops; ++x) {
              let xn = cn.shift()
              if (xn) {
                traitement(xn)
              } else {
                this.iTargetedElement = 0
                this.searchInProgress = false
                resolve(true)
                return
              }
            }
            this.searchInProgress = 100 - 100 * cn.length / lcn | 0
            GLOB_R_A_F = requestAnimationFrame(allTraitement)
          }
          allTraitement()
        })
      }
      // Lancement du traitement
      allTraitementProm().then(() => {
        this.scrollTo(0)
      })
    },
    scrollTo (dir) {
      if (this.aResults.length) {
        if (dir) {
          this.iTargetedElement = this.iTargetedElement + dir
        }
        if (this.iTargetedElement < 0) {
          this.iTargetedElement = this.aResults.length - 1
        }
        if (this.iTargetedElement >= this.aResults.length) {
          this.iTargetedElement = 0
        }
        const vInstance = _.get(this.aResults[this.iTargetedElement], 'vInstance')
        if (vInstance) {
          vInstance.highlight()
        }
      }
    }
  },
  computed: {
    filter () {
      const {showFilter, iTargetedElement, availableOrigines, availableCibles} = this
      return {
        showFilter,
        iTargetedElement,
        availableOrigines,
        availableCibles
      }
    },
    aResults () {
      return this.currentNodes.filter((n) => n.matchFilter)
    },
    currentMapping () {
      return this.mapping
    },
    currentNodes () {
      return this.aNodes
    },
    nbMapping () {
      return mappingTrapp.info.systemesOrigine.length
    }
  }
}

const indexNode = (o) => {
  const aIndex = []
  if (_.isObject(o)) {
    const map = (o, p) => {
      _.mapValues(o, (n) => {
        if (_.isObject(n)) {
          n.isOpen = false
          n.childMatch = false
          n.matchFilter = true
          if (p) {
            n.parent = p
            n.path = p.path + '/' + n.name
          } else {
            n.path = '/' + n.name
          }
          aIndex.push(n)
          if (n.childNodes) {
            map(n.childNodes, n)
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
  .trapp-progress {
    position: fixed;
    top: calc(50% - 75px);
    left: calc(50% - 75px);
  }
</style>

