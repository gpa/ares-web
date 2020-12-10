<template>
  <img
    :src="contentInfo.preview"
    @click="viewContent"
    class="content-preview"
    style="width: 100%; height: 100%"
  />
</template>
<style lang="scss" scoped>
.content-preview:hover {
  cursor: pointer;
}
</style>
<script lang="ts">
import Vue, { PropType } from 'vue';
import { ContentInfo } from '@/app/api/models/ContentInfo';
export default Vue.extend({
  name: 'content-preview',
  props: {
    contentInfo: {
      type: Object as PropType<ContentInfo>
    }
  },
  methods: {
    viewContent: function() {
      this.$router.push(`/content/${this.contentInfo.uri}`);
    }
  }
});
</script>
