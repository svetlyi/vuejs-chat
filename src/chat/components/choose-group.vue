<template>
  <div id="choose-group-list" uk-offcanvas>
    <div class="uk-offcanvas-bar">
      <ul class="uk-nav uk-nav-default">
        <li class="uk-nav-header">Choose group</li>
        <li v-for="group in groups"><a href="#">{{ group.name }}</a></li>
      </ul>
    </div>
  </div>
</template>

<script>

import groupRepository from "../../group/repository/group";

export default {
  name: 'ChooseGroup',
  components: {
  },
  props: {
    groups: Array
  },
  data() {
      return {
        group: ''
      }
  },
  methods: {
  },
  created() {
    groupRepository.list()
      .then((groups) => {
        this.groups = groups
      })
      .catch(alert)
  }
}
</script>