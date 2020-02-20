<template>
    <div>
        <div class="messages-block uk-width-1-1" id="messages-block">
            <message
                    v-for="message in messages" :key="message.id"
                    :text="message.text"
            ></message>
        </div>
        <send-message v-on:message="sendMessage"></send-message>
    </div>
</template>

<script>
import SendMessage from "../send-message";
import Message from "../message";
import messageService from "../../message"

export default {
  name: 'GroupMessagesBlock',
  components: {SendMessage, Message},
  methods: {
    sendMessage: function(message) {
      messageService.send(message).then(() => {
        this.messages.push({
          id: 126,
          user: {
            id: 126,
            name: 'someuser'
          },
          date: Date.now(),
          text: message
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
  data() {
      return {
        messages: [
          {
            id: 123,
            user: {
              id: 123,
              name: 'someuser'
            },
            date: Date.now(),
            text: 'Hello, darkness'
          },
          {
            id: 124,
            user: {
              id: 123,
              name: 'someuser'
            },
            date: Date.now(),
            text: 'Hello, darkness'
          },
          {
            id: 125,
            user: {
              id: 123,
              name: 'someuser'
            },
            date: Date.now(),
            text: 'Hello, darkness'
          }
        ]
      }
  },
}
</script>