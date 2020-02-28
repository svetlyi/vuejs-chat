<template>
    <div class="uk-grid uk-grid-small uk-child-width-auto"
         v-bind:class="{'uk-flex-bottom uk-flex-right uk-text-right': isCurUsrMsg}">
        <div class="uk-width-auto uk-flex uk-flex-bottom">
            <img class="uk-border-circle" width="32" height="32" src="/images/avatar.png">
        </div>
        <div class="uk-width-auto">
            <div class="uk-card uk-card-body uk-card-small uk-card-default uk-border-rounded">
                <div class="uk-card-title" v-if="!isCurUsrMsg">
                    <span>{{authorName}}</span>
                    <hr>
                </div>
                <p class="uk-margin-remove">{{text}}</p>
            </div>
        </div>
    </div>
</template>

<script>

  export default {
    name: 'Message',
    props: {
      text: String,
      authorName: String
    },
    components: {},
    data() {
      return {}
    },
    computed: {
      isCurUsrMsg: function () {
        return this.authorName === this.$store.state.user.name
      }
    },
    created: function () {
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
    }
</style>