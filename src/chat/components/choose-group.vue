<template>
    <div ref="choose-group-list" id="choose-group-list" uk-offcanvas>
        <div class="uk-offcanvas-bar">
            <ul class="uk-nav uk-nav-default">
                <li class="uk-nav-header">Choose group</li>
                <li
                        v-for="group in groups"
                        @click="chooseGroup(group.id)"
                        v-bind:class="{ 'uk-active': currentGroupId === group.id}"
                >
                    <a href="#">{{ group.name }}</a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>

  import groupRepository from "../../group/repository/group";
  import notification from "../../notification"
  import socket from "../../sockets";
  import UIkit from 'uikit';

  export default {
    name: 'ChooseGroup',
    components: {},
    data() {
      return {
        currentGroupId: '',
        groups: []
      }
    },
    methods: {
      chooseGroup: function (groupId) {
        socket.getInst()
          .then((socket) => {
            socket.emit('join-group', {groupId: groupId}, () => {
              this.currentGroupId = groupId
              this.$emit('choose-group', groupId)
              UIkit.offcanvas(this.$refs['choose-group-list']).hide();
            })
          }).catch((err) => {
          notification.send(err, 'danger')
        })
      }
    },
    created() {
      groupRepository.list()
        .then((groups) => {
          this.groups = groups
        })
        .catch((err) => notification.send(err, 'danger'))
    }
  }
</script>