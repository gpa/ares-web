<template>
  <div>
    <v-layout row>
      <v-flex xs12 sm12 md12>
        <v-container fluid grid-list-sm>
          <v-layout row wrap>
            <v-flex v-for="(contentInfo, i) in contentInfos" :key="i" xs12 sm4 md1 lg1>
              <content-preview :contentInfo="contentInfo"></content-preview>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
    <infinite-loading @infinite="infiniteHandler"></infinite-loading>
  </div>
</template>
<script>
import Vue from 'vue';
import InfiniteLoading from 'vue-infinite-loading';
import ContentPreview from './ContentPreview';
import { LOAD_MORE_CONTENT } from '@/app/store/types';
import { RootStoreState } from '@/app/store';

export default Vue.extend({
  name: 'content-feed',
  components: {
    InfiniteLoading,
    ContentPreview
  },
  methods: {
    infiniteHandler($state) {
      this.$store.dispatch(LOAD_MORE_CONTENT).then(stillRemaining => {
        if (stillRemaining) {
          $state.loaded();
        } else $state.complete();
      });
    }
  },
  computed: {
    contentInfos: function() {
      return this.$store.state.content.loadedContentInfos;
    }
  }
});
</script>
