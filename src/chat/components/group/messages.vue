<template>
    <div>
        <div class="messages-block uk-width-1-1" ref="messages-block">
            <message
                    v-for="message in messages" :key="message.id"
                    :message="message"
            ></message>
        </div>
        <send-message
                v-on:message="sendMessage"
                v-on:sticker="sendSticker"
        ></send-message>
    </div>
</template>

<script>
  import SendMessage from "../send-message";
  import Message from "../message";
  import sockets from "../../../sockets";

  export default {
    name: 'GroupMessages',
    props: ['groupId', 'initialMessages'],
    components: {SendMessage, Message},
    data() {
      return {
        messages: [
        ]
      }
    },
    methods: {
      sendMessage: function (message) {
        sockets.getInst().then(socket => {
          socket.emit('chat-message', {text: message}, (message) => {
            console.log('chat-message', message)
            this.messages.push(message)
          })
        })
      },
      sendSticker: function (sticker) {
        sockets.getInst().then(socket => {
          socket.emit('chat-message', {text: '', sticker: sticker}, (message) => {
            console.log('chat-message with sticker', message)
            this.messages.push(message)
          })
        })
      },
      scrollTop: function () {
        let container = this.$refs['messages-block'];
        container.scrollTop = container.scrollHeight;
      },
      fillWithInitialMessages: function () {
        this.messages.splice(0, this.messages.length)
        for (let i = 0; i < this.initialMessages.length; i++) {
          this.messages.push(this.initialMessages[i])
        }
      }
    },
    mounted: function () {
      this.scrollTop()
    },
    updated: function () {
      this.scrollTop()
    },
    created: function () {
      this.fillWithInitialMessages()
      sockets.getInst().then(socket => {
        console.log("subscribing to 'chat-message'")
        socket.on('chat-message', message => {
          console.log("'chat-message': received a message", message)
          this.messages.push(message)
        })
      })
    },
    watch: {
      groupId: function () {
        this.fillWithInitialMessages()
      }
    }
  }
</script>