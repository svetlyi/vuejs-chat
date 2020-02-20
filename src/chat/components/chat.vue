<template>
    <div>
        <nav class="uk-navbar uk-navbar-container uk-margin">
            <div class="uk-navbar-left">
                <a class="uk-navbar-toggle" href="#choose-user-list" uk-toggle>
                    <span uk-icon="user"></span> <span class="uk-margin-small-left">Choose user</span>
                </a>
                <a class="uk-navbar-toggle" href="#choose-group-list" uk-toggle>
                    <span uk-icon="users"></span> <span class="uk-margin-small-left">Choose group</span>
                </a>
            </div>
            <div class="uk-navbar-right">
                <ul class="uk-navbar-nav">
                    <li>
                        <a href="#" @click.stop.prevent="exit">
                            <span uk-icon="sign-out"></span> <span class="uk-margin-small-left">Exit</span>
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
        <choose-user :users="users"></choose-user>
        <choose-group></choose-group>
        <group-messages-block></group-messages-block>
    </div>
</template>

<script>
  import ChooseUser from "./choose-user";
  import ChooseGroup from "./choose-group";
  import GroupMessagesBlock from "./group/messages-block";
  import auth from "../../user/auth";
  import socket from "../../sockets";

  export default {
    name: 'chat',
    components: {GroupMessagesBlock, ChooseGroup, ChooseUser},
    data() {
      return {
        users: [
          {
            id: 123,
            name: 'asdasd',
          }
        ],
      }
    },
    methods: {
      exit: function () {
        auth.logout().then(() => {
          this.$router.push({name: 'authorization'})
        })
      }
    },
    created() {
      socket.getInst().then((socket) => {
      }).catch((err) => {
        console.log(err)
      })
    }
  }
</script>

<style lang="less">
    .messages-block {
        position: absolute;
        bottom: 60px;
        top: 80px;
        overflow: auto;
    }
</style>