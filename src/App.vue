<template>
  <v-app>
    <v-navigation-drawer
        :mini-variant="miniVariant"
        v-model="drawer"
        fixed
        app
    >
      <v-toolbar flat class="transparent">
        <v-list class="pa-0">
          <v-list-tile avatar>
            <v-btn icon @click.stop="miniVariant = !miniVariant">
              <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
            </v-btn>
            <v-list-tile-content>
              <v-list-tile-title>Réduire</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <v-list class="pt-0" dense>
        <v-divider></v-divider>
        <v-list-tile v-for="item in items" v-if="item.icon" :key="item.name" :to="item.path">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.name }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
        app
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-content>
      <transition name="slide" mode="out-in">
        <router-view/>
      </transition>
    </v-content>
    <v-footer app>
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  created () {
    this.$router.options.routes.forEach(route => {
      this.items.push(route)
    })
  },
  data () {
    return {
      drawer: true,
      items: [],
      miniVariant: true,
      title: 'FluxManager'
    }
  },
  name: 'App'
}
</script>
