<template>
  <div id="app">
    <app-header></app-header>
    <div class="wrapper" @click="goBack">
      <content-detail :contentInfo="contentInfo"></content-detail>
    </div>
  </div>
</template>
<style scoped>
.wrapper {
  cursor: pointer;
  margin-top: 15px;
}
.centered {
  float: center;
}
.add-key-button {
  margin-top: 5px;
}
</style>
<script>
import Vue from 'vue';
import AppHeader from '@/app/components/AppHeader';
import ContentDetail from '@/app/components/ContentDetail';
import { SELECT_CONTENT } from '@/app/store/types';

export default Vue.extend({
  name: 'content-detail-view',
  props: ['contentUri'],
  components: {
    AppHeader,
    ContentDetail
  },
  data: () => ({
    saving: null
  }),
  methods: {
    goBack: async function(a, b, c) {
      await this.$store.dispatch(SELECT_CONTENT, null);
      this.$router.go(-1);
    },
    addAttribute() {
      this.saving = true;
    },
    save() {
      this.saving = false;
    }
  },
  computed: {
    contentInfo: function() {
      return this.$store.state.content.selectedContentInfo;
    }
  },
  created: async function() {
    await this.$store.dispatch(SELECT_CONTENT, this.contentUri);
  }
});
</script>
