<template>
  <v-app>
    <v-navigation-drawer app :value="showDrawer">
      <SettingScreen/>
    </v-navigation-drawer>

    <v-content :class="currentColor">
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import SettingScreen from '@/components/SettingScreen.vue'

export default {
  name: 'home',
  components: {
    SettingScreen
  },
  computed: {
    ...mapGetters({
      timerState: 'timer/currentState'
    }),

    showDrawer () {
      return this.$store.state.drawer
    },

    currentColor () {
      const stateColors = {
        focus: this.$store.state.focusColor,
        'short-break': this.$store.state.shortbreakColor,
        'long-break': this.$store.state.longbreakColor
      }

      return stateColors[this.timerState]
    }
  }
}
</script>

<style lang="scss">
html, body {
  margin: 0;
  padding: 0;
}

#app {
  font-family: 'Lato', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
