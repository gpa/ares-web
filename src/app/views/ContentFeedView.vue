<template>
  <div>
    <app-header></app-header>
    <content-feed></content-feed>
  </div>
</template>
<script>
import Vue from 'vue';
import AppHeader from '@/app/components/AppHeader';
import ContentFeed from '@/app/components/ContentFeed';
export default Vue.extend({
  components: {
    AppHeader,
    ContentFeed
  }
});
</script>
