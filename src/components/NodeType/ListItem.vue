<template>
  <div class="item">
    <div class="text">
      <a class="anchor">o</a>
      <span class="content" contenteditable="true" v-medium="node.content"></span>
    </div>
    <div class="child" v-for="childId in node.children">
      <node-view :node-id="childId" @change="handleChange"></node-view>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      node: { require: true }
    },
    methods: {
      handleChange: function () {
        this.$emit('change', this.node)
      }
    },
    watch: {
      // Note: The node.content is updated by a two-way binding in v-medium directive
      'node.content': 'handleChange'
    }
  }
</script>

<style lang="sass" scoped>
  .item {
    display: flex;
    border-left: 1px solid #777;
    padding-left: 0.5rem;
    margin: 0.5rem;
    flex-flow: column nowrap;
  }
  .child {
    display: flex;
  }
</style>
