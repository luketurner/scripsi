<template>
  <text-field class="text" :content="node.content" @change="contentChanged"></text-field>
</template>

<script>
  import _ from 'lodash'
  export default {
    props: {
      node: { required: true }
    },
    methods: {
      contentChanged: function (newContent) {
        this.$emit('change', _.set(this.node, 'content', newContent))
      }
    }
  }
</script>

<style lang="sass" scoped>
  .text {
    max-width: 45em;
  }
</style>
