<template>
    <div class="uk-container">
        <form class="uk-position-center">
            <div class="uk-margin">
                <div class="uk-inline">
                    <span class="uk-form-icon" uk-icon="icon: user"></span>
                    <input class="uk-input" type="text" placeholder="Your username" v-model="username">
                </div>
            </div>
            <div class="uk-margin">
                <div class="uk-inline">
                    <span class="uk-form-icon uk-form-icon-flip" uk-icon="icon: lock"></span>
                    <input class="uk-input" type="text" placeholder="Your password" v-model="password">
                </div>
            </div>
            <div uk-grid>
                <div><button class="uk-button uk-button-primary" @click.prevent.stop="login">Login</button></div>
                <div><button class="uk-button uk-button-default" @click.prevent.stop="register">Register</button></div>
            </div>
        </form>
    </div>
</template>

<script>
import auth from '../auth'

export default {
  name: 'Authorization',
  props: {
    items: Array
  },
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login: function() {
      auth.login(this.username, this.password).then(() => {
        this.$router.push({name: 'chat'})
      }).catch((err) => {
        alert(err)
      })
    },
    register: function() {
      auth.register(this.username, this.password).then(() => {
        this.$router.push({name: 'chat'})
      }).catch((err) => {
        alert(err)
      })
    }
  }
}
</script>

<style scoped>
</style>