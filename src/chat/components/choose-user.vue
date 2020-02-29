<template>
    <div id="choose-user-list" uk-offcanvas>
        <div class="uk-offcanvas-bar">
            <ul class="uk-nav uk-nav-default">
                <li class="uk-nav-header">Choose user</li>
                <li v-for="user in users"><a href="#">{{ user.name }}</a></li>
            </ul>
        </div>
    </div>
</template>

<script>
import userRepository from "../../user/repository/user";

export default {
  name: 'ChooseUser',
  data() {
    return {
      currentUserName: '',
      users: []
    }
  },
  components: {
  },
  created() {
    userRepository.list()
      .then((users) => {
        console.log('got', users.length, 'users')
        this.users = users
      })
      .catch(alert)
  }
}
</script>