<template>
    <div>
        <nav class="uk-navbar uk-navbar-container uk-margin">
            <div class="uk-navbar-left">
                <ul class="uk-navbar-nav">
                    <li>
                        <router-link :to="{name: 'chat'}">
                            <span uk-icon="chevron-left"></span> <span class="uk-margin-small-left">Back to chat</span>
                        </router-link>
                    </li>
                </ul>
            </div>
        </nav>
        <div class="uk-container uk-flex uk-flex-center">
            <ValidationObserver v-slot="{ dirty, invalid, handleSubmit }">
            <form>
                <div class="uk-width-medium@m uk-width-1-1@2">
                    <div class="uk-margin">
                        <div class="uk-inline uk-width-1-1">
                            <span class="uk-form-icon" uk-icon="icon: user"></span>
                            <input class="uk-input" type="text" placeholder="Your name" v-model="name">
                        </div>
                    </div>
                    <ValidationProvider rules="positive" v-slot="{ errors, dirty }" name="age">
                        <div class="uk-margin">
                            <div class="uk-inline uk-width-1-1">
                                <span class="uk-form-icon" uk-icon="icon: clock"></span>
                                <input class="uk-input" type="text" placeholder="Your age" v-model="age">
                            </div>
                        </div>
                        <div class="uk-margin-small">
                            <span class="form-error-block" v-for="error in errors">{{ error }}</span>
                        </div>
                    </ValidationProvider>
                    <ValidationProvider rules="required|strong_password|min:6|confirmed:pass_conf" v-slot="{ errors, dirty }" name="password">
                        <div class="uk-margin">
                            <div class="uk-inline uk-width-1-1">
                                <span class="uk-form-icon uk-form-icon-flip" uk-icon="icon: lock"></span>
                                <input class="uk-input" type="password" placeholder="Your password" v-model="password">
                            </div>
                        </div>
                        <div class="uk-margin-small">
                            <span class="form-error-block" v-for="error in errors">{{ error }}</span>
                        </div>
                    </ValidationProvider>
                    <ValidationProvider v-slot="{ errors }" vid="pass_conf">
                    <div class="uk-margin">
                        <div class="uk-inline uk-width-1-1">
                            <span class="uk-form-icon uk-form-icon-flip" uk-icon="icon: lock"></span>
                            <input class="uk-input" type="password" placeholder="Repeat password" v-model="pass_conf">
                        </div>
                        <div class="uk-margin-small">
                            <span class="form-error-block" v-for="error in errors">{{ error }}</span>
                        </div>
                    </div>
                    </ValidationProvider>
                    <div uk-grid>
                        <div>
                            <button class="uk-button uk-button-primary" @click.prevent.stop="save">Save</button>
                        </div>
                    </div>
                </div>
            </form>
            </ValidationObserver>
        </div>
    </div>
</template>

<script>
  import userRepo from '../repository/user'
  import {ValidationObserver, ValidationProvider} from 'vee-validate';
  import notification from "../../notification";

  export default {
    name: 'UserSettings',
    components: {ValidationProvider, ValidationObserver},
    props: {
      items: Array
    },
    data() {
      return {
        name: '',
        age: '',
        password: '',
        pass_conf: ''
      }
    },
    methods: {
      save: function () {
        let user = {name: this.name, age: this.age, password: this.password};
        userRepo.save(user).then(() => {
          notification.send('updated', 'success')
          delete user.password
          this.$store.commit('set_user', user);
        }).catch((err) => {
          notification.send(err, 'danger')
        })
      }
    },
    created() {
      this.name = this.$store.state.user.name
      this.age = this.$store.state.user.age
    }
  }
</script>

<style scoped lang="less">
    @import "../../__data__/styles/forms.less";
</style>