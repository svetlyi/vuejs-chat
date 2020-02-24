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
        <choose-group v-on:choose-group="chooseGroup"></choose-group>
        <group-messages-block v-if="currentGroupId !== null" v-bind:currentGroupId="currentGroupId">
        </group-messages-block>
        <div v-else class="no-group-message">Please, choose a group or user to chat with</div>
    </div>
</template>

<script>
  import ChooseUser from "./choose-user";
  import ChooseGroup from "./choose-group";
  import GroupMessagesBlock from "./group/messages-block";
  import auth from "../../user/auth";

  export default {
    name: 'chat',
    components: {GroupMessagesBlock, ChooseGroup, ChooseUser},
    data() {
      return {
        currentGroupId: null,
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
      },
      chooseGroup: function (groupId) {
        this.currentGroupId = groupId
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