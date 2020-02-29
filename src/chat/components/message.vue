<template>
    <div class="uk-grid uk-grid-small uk-child-width-auto"
         v-bind:class="{'uk-flex-bottom uk-flex-right uk-text-right': isCurUsrMsg}">
        <div class="uk-width-auto uk-flex uk-flex-bottom">
            <img class="uk-border-circle" width="32" height="32" src="/images/avatar.png">
        </div>
        <div class="uk-width-auto">
            <div class="uk-card uk-card-body uk-card-small uk-card-default uk-border-rounded">
                <div class="uk-card-title" v-if="!isCurUsrMsg">
                    <span>{{message.user.name}}</span>
                    <hr>
                </div>
                <div class="uk-card-media-bottom sticker" v-if="message.sticker && message.sticker.length > 0">
                    <img :src="message.sticker" alt="">
                </div>
                <p class="uk-margin-remove" v-if="message.text && message.text.length > 0">{{message.text}}</p>
            </div>
        </div>
    </div>
</template>

<script>

  export default {
    name: 'Message',
    props: {
      message: Object
    },
    computed: {
      isCurUsrMsg: function () {
        return this.message.user.name === this.$store.state.user.name
      }
    }
  }
</script>

<style lang="less" scoped>
    .uk-card-title {
        hr {
            margin: 0;
        }

        span {
            font-size: 10pt;
        }
    }

    .uk-card {
        padding-top: 0;

        .sticker img {
            width: 100px;
            height: 100px;
        }
    }
</style>