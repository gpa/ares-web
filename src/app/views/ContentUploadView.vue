<template>
  <div id="app">
    <app-header></app-header>
    <div class="container">
      <form enctype="multipart/form-data" novalidate v-if="isInitial || isSaving">
        <h1>Upload</h1>
        <div class="dropbox">
          <input
            type="file"
            multiple
            name="files"
            :disabled="isSaving"
            @change="filesChange($event.target.files)"
            accept="*/*"
            class="input-file"
          />
          <p v-if="isInitial">
            Drag your file(s) here to begin
            <br />or click to browse
          </p>
          <p v-if="isSaving">Uploading {{ fileCount }} files...</p>
        </div>
      </form>
      <div v-if="isSuccess">
        <h2>Uploaded {{ fileCount }} file(s) successfully.</h2>
        <p>
          <a href="javascript:void(0)" @click="reset()">Upload again</a>
        </p>
      </div>
      <div v-if="isFailed">
        <h2>Uploaded failed.</h2>
        <p>
          <a href="javascript:void(0)" @click="reset()">Try again</a>
        </p>
        <pre>{{ uploadError }}</pre>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue';
import AppHeader from '@/app/components/AppHeader';
import { UPLOAD_CONTENT } from '@/app/store/types';

const STATUS_INITIAL = 0,
  STATUS_SAVING = 1,
  STATUS_SUCCESS = 2,
  STATUS_FAILED = 3;
export default Vue.extend({
  name: 'upload',
  components: {
    AppHeader
  },
  data() {
    return {
      uploadedFiles: [],
      uploadError: null,
      fileCount: 0,
      currentStatus: null
    };
  },
  computed: {
    isInitial() {
      return this.currentStatus === STATUS_INITIAL;
    },
    isSaving() {
      return this.currentStatus === STATUS_SAVING;
    },
    isSuccess() {
      return this.currentStatus === STATUS_SUCCESS;
    },
    isFailed() {
      return this.currentStatus === STATUS_FAILED;
    }
  },
  methods: {
    reset() {
      this.currentStatus = STATUS_INITIAL;
      this.uploadedFiles = [];
      this.uploadError = null;
    },
    save(fileList) {
      this.currentStatus = STATUS_SAVING;
      this.$store
        .dispatch(UPLOAD_CONTENT, fileList)
        .then(x => {
          this.uploadedFiles = [].concat(x);
          this.currentStatus = STATUS_SUCCESS;
        })
        .catch(err => {
          this.uploadError = err.response;
          this.currentStatus = STATUS_FAILED;
        });
    },
    filesChange(fileList) {
      this.fileCount = fileList.length;
      if (!fileList.length) return;
      this.save(fileList);
    }
  },
  mounted() {
    this.reset();
  }
});
</script>
<style lang="scss" scoped>
.dropbox {
  outline: 2px dashed grey;
  outline-offset: -10px;
  background: lightcyan;
  color: dimgray;
  padding: 10px 10px;
  min-height: 200px;
  position: relative;
  cursor: pointer;
}
.input-file {
  opacity: 0;
  width: 100%;
  height: 200px;
  position: absolute;
  cursor: pointer;
}
.dropbox:hover {
  background: lightblue;
}
.dropbox p {
  font-size: 1.2em;
  text-align: center;
  padding: 50px 0;
}
</style>
