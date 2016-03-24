<template>
  <div class="item">
    <div class="todo">
      <input type="checkbox" :checked="node.params.completed" class="checkbox" @change="toggleComplete">
      <text-field class="content" :content="node.content" @change="contentChanged"></text-field>
    </div>
    <div class="child" v-if="!node.collapsed" v-for="childId in node.children">
      <node-view :node-id="childId"></node-view>
    </div>
  </div>
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
      },
      toggleComplete: function () {
        this.$emit('update', _.update(this.node, 'params.completed', (v) => !v))
      }
    }
  }
</script>

<style lang="sass" scoped>
  .item {
    display: flex;
    flex-flow: column nowrap;
  }
  .todo {
    display: flex;
    flex-flow: row nowrap;
  }
  .child, .checkbox, .content {
    display: flex;
  }
</style>
