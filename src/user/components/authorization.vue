<template>
    <div class="uk-container">
        <ValidationObserver v-slot="{ dirty, invalid, handleSubmit }">
            <form class="uk-position-center uk-align-center">
                <ValidationProvider rules="required|max:10" v-slot="{ errors, dirty }" name="name">
                    <div class="uk-margin">
                        <div class="uk-inline">
                            <span class="uk-form-icon" uk-icon="icon: user"></span>
                            <input
                                    v-bind:class="{'uk-form-danger': dirty && errors.length > 0}"
                                    class="uk-input" type="text" placeholder="Your name" v-model="name">
                        </div>
                    </div>
                    <div class="uk-margin-small">
                        <span class="uk-label uk-label-danger" v-for="error in errors">{{ error }}</span>
                    </div>
                </ValidationProvider>

                <ValidationProvider rules="required|strong_password|min:6" v-slot="{ errors, dirty }" name="password">
                    <div class="uk-margin">
                        <div class="uk-inline">
                            <span class="uk-form-icon uk-form-icon-flip" uk-icon="icon: lock"></span>
                            <input class="uk-input" type="password" placeholder="Your password" v-model="password">
                        </div>
                    </div>
                    <div class="uk-margin-small">
                        <span class="uk-label uk-label-danger" v-for="error in errors">{{ error }}</span>
                    </div>
                </ValidationProvider>
                <div uk-grid v-if="dirty && !invalid">
                    <div>
                        <button class="uk-button uk-button-primary" @click.prevent="handleSubmit(login)">Login</button>
                    </div>
                    <div>
                        <button class="uk-button uk-button-default" @click.prevent="handleSubmit(register)">Register</button>
                    </div>
                </div>
            </form>
        </ValidationObserver>
    </div>
</template>

<script>
  import userRepository from '../repository/user'
  import notification from "../../notification";
  import {ValidationProvider} from 'vee-validate';
  import { ValidationObserver } from 'vee-validate';

  export default {
    name: 'Authorization',
    components: {ValidationProvider, ValidationObserver},
    props: {
      items: Array
    },
    data() {
      return {
        name: '',
        password: ''
      }
    },
    methods: {
      login: function () {
        userRepository.login(this.name, this.password).then(() => {
          this.$store.commit('set_user', {name: this.name});
          this.$router.push({name: 'chat'})
        }).catch((err) => {
          notification.send(err, 'danger')
        })
      },
      register: function () {
        userRepository.register(this.name, this.password).then(() => {
          this.$store.commit('set_user', {name: this.name});
          this.$router.push({name: 'chat'})
        }).catch((err) => {
          notification.send(err, 'danger')
        })
      }
    }
  }
</script>

<style scoped>
</style>