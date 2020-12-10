<template>
  <div class="a">
    <app-header></app-header>
    <h1>Home</h1>
  </div>
</template>
<script>
import Vue from 'vue';
import axios from 'axios';
import AppHeader from '@/app/components/AppHeader';

export default Vue.extend({
  components: {
    AppHeader
  }
});
</script>
