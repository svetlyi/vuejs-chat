<template>
    <div class="uk-comment">
        <header class="uk-comment-header uk-grid-medium uk-flex-middle" uk-grid>
            <div class="uk-width-auto">
                <img class="uk-comment-avatar" src="/images/avatar.png" width="80" height="80" alt="">
            </div>
            <div class="uk-width-expand">
                <h4 class="uk-comment-title uk-margin-remove"><a class="uk-link-reset" href="#">Author</a></h4>
                <ul class="uk-comment-meta uk-subnav uk-subnav-divider uk-margin-remove-top">
                    <li><a href="#">12 days ago</a></li>
                </ul>
            </div>
        </header>
        <div class="uk-comment-body">
            <p>{{text}}</p>
        </div>
    </div>
</template>

<script>

export default {
  name: 'Message',
  props: {
    text: String
  },
  components: {
  },
  data() {
      return {
      }
  },
  created: function () {
  }
}
</script>