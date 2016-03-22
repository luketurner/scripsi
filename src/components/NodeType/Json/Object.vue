<template>
  <div class="item">
    <div v-for="(k, v) in node.content">
      
    </div>
  </div>
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
</style>