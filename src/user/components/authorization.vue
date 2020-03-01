<template>
    <div class="uk-position-center uk-align-center">
        <div class="uk-container">
            <h3 class="uk-heading-divider">Welcome to our chat</h3>
            <ValidationObserver v-slot="{ dirty, invalid, handleSubmit }">
                <form class="uk-width-medium@m uk-width-1-1 uk-grid-small" uk-grid>
                    <div class="uk-width-1-1">
                        <ValidationProvider rules="required|max:10" v-slot="{ errors, dirty }" name="name">
                            <div class="uk-inline uk-width-1-1">
                                <span class="uk-form-icon" uk-icon="icon: user"></span>
                                <input
                                        v-bind:class="{'uk-form-danger': dirty && errors.length > 0}"
                                        class="uk-input" type="text" placeholder="Your name"
                                        v-model="name">
                            </div>
                            <div class="uk-margin-small">
                                <span class="form-error-block" v-for="error in errors">{{ error }}</span>
                            </div>
                        </ValidationProvider>
                    </div>
                    <div class="uk-width-1-1">
                        <ValidationProvider
                                rules="required|has_special|has_alpha|has_upper_alpha|has_digits|min:6"
                                v-slot="{ errors, dirty }"
                                name="password"
                        >
                            <div class="uk-inline uk-width-1-1">
                                <span class="uk-form-icon uk-form-icon-flip" uk-icon="icon: lock"></span>
                                <input class="uk-input" type="password" placeholder="Your password"
                                       v-model="password">
                            </div>
                            <div class="uk-margin-small">
                                <span class="form-error-block" v-for="error in errors">{{ error }}</span>
                            </div>
                        </ValidationProvider>
                    </div>
                    <template v-if="dirty && !invalid">
                        <div class="uk-width-1-2">
                            <button class="uk-button uk-button-primary" @click.prevent="handleSubmit(login)">Login
                            </button>
                        </div>
                        <div class="uk-width-1-2">
                            <button class="uk-button uk-button-default" @click.prevent="handleSubmit(register)">
                                Register
                            </button>
                        </div>
                    </template>
                </form>
            </ValidationObserver>
        </div>

    </div>
</template>

<script>
  import userRepository from '../repository/user'
  import notification from "../../notification";
  import {ValidationProvider, ValidationObserver} from 'vee-validate';

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
        userRepository.register(this.name, this.password).then((user) => {
          this.$store.commit('set_user', {name: this.name});
          this.$router.push({name: 'chat'})
        }).catch((err) => {
          notification.send(err, 'danger')
        })
      }
    }
  }
</script>

<style scoped lang="less">
    @import "../../__data__/styles/forms.less";
</style>