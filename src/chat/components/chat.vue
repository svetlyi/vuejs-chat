<template>
    <div>
        <nav class="uk-navbar uk-navbar-container uk-margin">
            <div class="uk-navbar-left">
                <a class="uk-navbar-toggle" href="#choose-group-list" uk-toggle>
                    <span uk-icon="users"></span> <span class="uk-margin-small-left">Choose group</span>
                </a>
            </div>
            <div class="uk-navbar-right">
                <ul class="uk-navbar-nav">
                    <li>
                        <router-link :to="{name: 'userStats'}">
                            <span uk-icon="info"></span>
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="{name: 'userSettings'}">
                            <span uk-icon="user"></span> <span class="uk-margin-small-left">{{username}}</span>
                        </router-link>
                    </li>
                    <li>
                        <a href="#" @click.stop.prevent="exit">
                            <span uk-icon="sign-out"></span> <span class="uk-margin-small-left">Exit</span>
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
        <choose-group v-on:choose-group="chooseGroup"></choose-group>
        <group-messages
                v-if="currentGroupId !== null"
                v-bind:groupId="currentGroupId"
                :initialMessages="initialMessages"
        >
        </group-messages>
        <div v-else class="no-group-message">Please, choose a group or user to chat with</div>
    </div>
</template>

<script>
  import ChooseGroup from "./choose-group";
  import GroupMessages from "./group/messages";
  import userRepository from "../../user/repository/user";

  export default {
    name: 'chat',
    components: {GroupMessages, ChooseGroup},
    data() {
      return {
        currentGroupId: null,
        initialMessages: []
      }
    },
    computed: {
      username() {
        return this.$store.state.user.name
      }
    },
    methods: {
      exit: function () {
        userRepository.logout().then(() => {
          this.$router.push({name: 'authorization'})
        })
      },
      chooseGroup: function (groupInfo) {
        this.currentGroupId = groupInfo.groupId
        this.initialMessages = groupInfo.messages
      }
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

    .no-group-message {
        text-align: center;
        margin-top: 5%;
    }
</style>