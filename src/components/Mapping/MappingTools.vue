<template>
<div>
  <v-speed-dial
      v-model="open"
      bottom
      right
      fixed
      direction="left"
  >
    <v-btn
        slot="activator"
        :color="selectedTool ? selectedTool.color : 'blue darken-2'"
        dark
        fab
        hover
        v-model="open"
    >
      <v-icon>{{selectedTool ? (selectedTool.icon || selectedTool.value) : 'build'}}</v-icon>
      <v-icon>close</v-icon>
    </v-btn>
    <v-tooltip
        v-for="tool in tools"
        v-if="tool.lockable"
        :key="tool.value"
        top>
      <v-btn
          fab
          dark
          small
          :color="tool.color"
          @click.stop="selectTool(tool)"
          slot="activator"
      >
        <v-icon>{{ tool.icon || tool.value }}</v-icon>
      </v-btn>
      <span>{{tool.label || tool.value}}</span>
    </v-tooltip>
  </v-speed-dial>

  <v-speed-dial
      v-model="open"
      bottom
      right
      fixed
  >
      <v-btn
          slot="activator"
          :color="selectedTool ? selectedTool.color : 'blue darken-2'"
          dark
          fab
          hover
          v-model="open"
      >
        <v-icon>{{selectedTool ? (selectedTool.icon || selectedTool.value) : 'build'}}</v-icon>
        <v-icon>close</v-icon>
      </v-btn>

      <v-tooltip
          v-for="tool in tools"
          v-if="!tool.lockable"
          :key="tool.value"
          left>
        <v-btn
            fab
            dark
            small
            :color="tool.color"
            @click.stop="selectTool(tool)"
            slot="activator"
        >
          <v-icon>{{ tool.icon || tool.value }}</v-icon>
        </v-btn>
        <span>{{tool.label || tool.value}}</span>
      </v-tooltip>
    </v-speed-dial>
</div>
</template>

<script>
export default {
  props: {
    tools: {
      type: Array,
      default () {
        return [
          {
            value: 'select',
            icon: 'open_with',
            color: 'blue',
            label: 'Manipuler/Selectionner',
            lockable: true
          },
          {
            value: 'pin',
            icon: 'lock',
            color: 'purple',
            label: 'Verrouiller',
            lockable: true
          },
          {
            value: 'add',
            color: 'green',
            label: 'Ajouter'
          },
          {
            value: 'edit',
            color: 'indigo',
            label: 'Modifier'
          },
          {
            value: 'delete',
            color: 'red',
            label: 'Supprimer'
          }
        ]
      }
    }
  },
  data () {
    return {
      open: false,
      currentTool: 0
    }
  },
  methods: {
    selectTool (tool) {
      if (tool.lockable) {
        this.currentTool = this.tools.indexOf(tool)
        this.$emit('input', tool)
      }
    }
  },
  computed: {
    selectedTool () {
      return this.currentTool !== null ? this.tools[this.currentTool] : null
    }
  }
}
</script>
