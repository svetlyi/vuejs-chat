<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import userRepository from './user/repository/user'
import notification from './notification'

export default {
  name: 'app',
  created() {
    userRepository.getUser().then((user) => {
      console.log('authorized')
      this.$store.commit('set_user', user);
      notification.send(`welcome back, ${user.name}`, 'success')
    }).catch((err) => {
      notification.send(err, 'danger')
      this.$router.push({name: 'authorization'})
    })
  }
}
</script>

<style lang="less">
  @import "../node_modules/uikit/src/less/uikit.theme.less";
</style>