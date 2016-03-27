<template>
  <div class="item">
  {
    <div class="property" v-for="(k, v) in node.content">
      <div class="key">{{ k }} :</div>
      <div class="value">{{ v }}</div>
    </div>
  }
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

<style scoped>
  .item {
    font: 0.8em 'Consolas',monospace;
  }
  .property {
    margin-left: 0.5rem;
    display: flex;
  }
  .value {
    margin-left: 0.25rem;
  }
</style>