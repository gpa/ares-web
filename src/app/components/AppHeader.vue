<template>
  <div class="header">
    <v-app-bar app clipped-left color="amber" dense flat>
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <span class="title mr-5" @click="goToHomepage">
        <span class="font-weight-bold">ARES</span>&nbsp;
        <span class="font-weight-light">Web</span>
      </span>
      <search-box />
      <v-btn icon>
        <v-icon>mdi-view-grid</v-icon>
      </v-btn>
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-account</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="logout">
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" app clipped disable-resize-watcher>
      <v-list dense class="grey lighten-4">
        <template v-for="(item, i) in menuItems">
          <v-divider v-if="item.divider" :key="i" dark class="my-4" />
          <v-list-item v-else :key="i" router :to="item.to">
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="grey--text">{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>
<style scoped>
.title:hover {
  cursor: pointer;
}
</style>
<script lang="ts">
import Vue from 'vue';
import router from '@/app/router';
import SearchBox from './SearchBox.vue';
import { LOGOUT } from '@/app/store/types';

export default Vue.extend({
  name: 'app-header',
  components: {
    SearchBox
  },
  data: () => ({
    drawer: false,
    menuItems: [
      { icon: 'mdi-home', title: 'Home', to: '/' },
      { icon: 'mdi-upload', title: 'Upload', to: '/upload' }
    ]
  }),
  methods: {
    logout: function() {
      this.$store.dispatch(LOGOUT).then(() => {
        router.push({ name: 'login' });
      });
    },
    goToHomepage: function() {
      router.push({ name: 'home' });
    }
  }
});
</script>
