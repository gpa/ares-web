<template>
  <v-container fill-height fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-6">
          <v-form ref="Form">
            <v-card-text>
              <v-container class="text-center">
                <v-alert v-if="errorMsg" dense outlined type="error">{{ errorMsg }}</v-alert>
                <v-text-field
                  filled
                  label="Username"
                  type="Text"
                  autofocus
                  tabindex="1"
                  v-model="userField"
                  :rules="userRules"
                ></v-text-field>
                <v-text-field
                  filled
                  label="Password"
                  :append-icon="hidePasswordToggle ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="hidePasswordToggle ? 'text' : 'password'"
                  v-model="passwordField"
                  :rules="passwordRules"
                  tabindex="2"
                  @click:append="hidePasswordToggle = !hidePasswordToggle"
                  @keyup.enter.native="submit"
                ></v-text-field>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn color="primary" tabindex="3" @click="submit">Login</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import Vue from 'vue';
import router from '@/app/router';
import { LOGIN } from '@/app/store/types';

export default Vue.extend({
  name: 'log-in-form',
  data: () => ({
    errorMsg: null,
    userField: '',
    passwordField: '',
    userRules: [v => !!v || 'Username is required'],
    passwordRules: [v => !!v || 'Password is required'],
    hidePasswordToggle: false
  }),
  methods: {
    async submit() {
      this.errorMsg = null;
      this.$store
        .dispatch(LOGIN, { name: this.userField, password: this.passwordField })
        .then(() => {
          if (this.$route.query.next) router.push(this.$route.query.next);
          else router.push({ name: 'home' });
        })
        .catch(error => {
          this.errorMsg = error.message;
        });
    }
  }
});
</script>
