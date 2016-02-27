<template>
  <div class="item">
    <div class="text">
      <a class="anchor">o</a>
      <span class="content" contenteditable="true" v-medium="node.content"></span>
    </div>
    <div class="child" v-for="child in node.children">
      <node-view :node="child"></node-view>
    </div>
  </div>
</template>

<script>
  import NodeView from '../NodeView'
  export default {
    name: 'node-view',
    components: { NodeView },
    props: {
      node: { require: true }
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
