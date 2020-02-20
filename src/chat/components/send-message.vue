<template>
    <form class="uk-position-fixed uk-position-bottom-center uk-background-muted" @submit.prevent="sendMessage">
        <div class="uk-margin uk-legend" uk-margin uk-grid>
            <div class=" uk-width-expand">
                <div class="uk-inline">
                    <span class="uk-form-icon" uk-icon="icon: pencil"></span>
                    <input class="uk-input" v-model="message">
                </div>
            </div>
            <div class="uk-width-auto">
                <div uk-form-custom="target: true">
                    <input type="file">
                    <span uk-icon="upload"></span>
                </div>
                <button class="uk-button uk-button-default">Send</button>
            </div>
        </div>
    </form>
</template>

<script>
export default {
  name: 'SendMessage',
  data() {
    return {
      message: '',
    }
  },
  methods: {
    sendMessage: function() {
      if ('' !== this.message) {
        this.$emit('message', this.message)
        this.message = ''
      }
    }
  },
}
</script>