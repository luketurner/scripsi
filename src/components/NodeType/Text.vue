<template>
  <span><text-field class="text" :content="node.content" @change="contentChanged"></text-field></span>
</template>

<script>
  import _ from 'lodash'
  export default {
    props: {
      node: { required: true },
      isRootNode: { default: false }
    },
    methods: {
      contentChanged: function (newContent) {
        this.$emit('update', _.set(this.node, 'content', newContent))
      }
    }
  }
</script>

<style lang="sass" scoped>
  .text {
    max-width: 45em;
  }
</style>
