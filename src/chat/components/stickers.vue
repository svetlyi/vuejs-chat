<template>
    <div class="uk-modal uk-open" ref="stickers-modal" style="display: block" @click="hide">
        <div class="uk-modal-dialog uk-modal-body uk-overflow-auto" @click.stop="">
            <h3 class="uk-modal-title">Choose sticker</h3>
            <div class="uk-grid-small">
                <div class="sticker" v-for="sticker in stickers" @click="chooseSticker(sticker)">
                    <img :src="sticker"/>
                </div>
            </div>
            <p class="uk-text-right">
                <button class="uk-button uk-button-default uk-modal-close" type="button" @click="hide">Cancel</button>
            </p>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'stickers',
    data() {
      return {
        stickers: [
          '/images/smiles/running.png',
          '/images/smiles/walking.png',
          '/images/smiles/smiling.png',
          '/images/smiles/thumb.png',
          '/images/smiles/dislike.png'
        ]
      }
    },
    methods: {
      hide: function() {
        this.$emit('cancel')
      },
      chooseSticker: function(sticker) {
        this.$emit('sticker', sticker)
      }
    }
  }
</script>

<style lang="less">
    .sticker {
        display: inline-block;
        padding: 3px;
        border: 2px solid black;
        margin: 1px;
        img {
            width: 100px;
            height: 100px;
        }
    }
    .sticker:hover {
        border: 2px dotted black;
        cursor: pointer;
    }
</style>