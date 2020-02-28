<template>
    <div>
        <div class="messages-block uk-width-1-1" id="messages-block">
            <message
                    v-for="message in messages" :key="message.id"
                    :text="message.text"
                    :authorName="message.user.name"
            ></message>
        </div>
        <send-message v-on:message="sendMessage"></send-message>
    </div>
</template>

<script>
import SendMessage from "../send-message";
import Message from "../message";
import sockets from "../../../sockets";

export default {
  name: 'GroupMessagesBlock',
  props: ['currentGroupId'],
  components: {SendMessage, Message},
  methods: {
    sendMessage: function(message) {
      sockets.getInst().then(socket => {
        socket.emit('chat-message', {text: message}, (message) => {
          console.log(message)
          this.messages.push(message)
        })
      })
    },
    scrollTop: function() {
      let container = this.$el.querySelector('#messages-block');
      container.scrollTop = container.scrollHeight;
    }
  },
  mounted: function() {
    this.scrollTop()
  },
  updated: function() {
    this.scrollTop()
  },
  created: function() {
    sockets.getInst().then(socket => {
      console.log('subscribing')
      socket.on('chat-message', message => {
        console.log(message)
        this.messages.push(message)
      })
    })
  },
  data() {
      return {
        messages: [
        ]
      }
  },
}
</script>