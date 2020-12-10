<template>
  <center>
    <div class="full-content-view">
      <img v-if="getType() == 'image'" :src="contentInfo.src" />
      <div v-else-if="getType() == 'video'">
        <video class="video-player-box" ref="videoPlayer" controls @canplay="onCanPlay">
          <source :src="contentInfo.src" type="video/mp4" />
        </video>
      </div>
    </div>
  </center>
</template>
<style lang="scss" scoped>
.full-content-view {
  min-height: 300px;
  img,
  video {
    max-width: 800px;
    max-height: 600px;
  }
}
</style>
<script lang="ts">
import Vue, { PropType } from 'vue';
import { ContentInfo } from '@/app/api/models/ContentInfo';

export default Vue.extend({
  name: 'content-detail',
  props: ['contentInfo'],
  computed: {},
  methods: {
    onCanPlay: async function() {
      const videoPlayer = this.$refs['videoPlayer'] as any;
      try {
        await videoPlayer.play();
      } catch (e) {
        videoPlayer.muted = true;
        await videoPlayer.play();
      }
    },
    getType: function() {
      if (!this.contentInfo) return 'unknown';
      return this.contentInfo.type;
    }
  }
});
</script>
