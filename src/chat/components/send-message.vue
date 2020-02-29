<template>
    <div>
        <stickers
                v-if="showStickers"
                v-on:cancel="showStickers = false"
                v-on:sticker="sendSticker"
        ></stickers>
        <form class="uk-position-fixed uk-position-bottom-center uk-background-muted" @submit.prevent="sendMessage">
            <div class="uk-margin uk-legend" uk-margin uk-grid>
                <div class=" uk-width-expand">
                    <div class="uk-inline">
                        <span class="uk-form-icon" uk-icon="icon: pencil"></span>
                        <input class="uk-input" v-model="message">
                    </div>
                </div>
                <div class="uk-width-auto">
                    <a href="#" class="uk-icon-button" uk-icon="happy"
                       @click.prevent="showStickers = !showStickers"></a>
                    <a href="#" class="uk-icon-button" uk-icon="play" @click.prevent="sendMessage"></a>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
  import Stickers from "./stickers";

  export default {
    name: 'SendMessage',
    components: {Stickers},
    data() {
      return {
        showStickers: false,
        message: ''
      }
    },
    methods: {
      sendMessage: function () {
        if ('' !== this.message) {
          this.$emit('message', this.message)
          this.message = ''
        }
      },
      sendSticker: function (sticker) {
        this.$emit('sticker', sticker)
        this.showStickers = false
      }
    }
  }
</script>