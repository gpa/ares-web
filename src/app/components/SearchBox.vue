<template>
  <v-text-field
    solo-inverted
    flat
    hide-details
    label="Search"
    class="search-box"
    prepend-inner-icon="mdi-magnify"
  />
</template>
<style scoped>
.search-box {
  border-radius: 0;
}
</style>
<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  name: 'search-box'
});
</script>
