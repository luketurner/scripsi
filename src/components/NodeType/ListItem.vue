<template>
  <div class="item">
    <ul :class="{root: isRootNode}">
      <li>
        <text-field :content="node.content" @change="contentChanged"></text-field>
      </li>
    </ul>
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
      }
    }
  }
</script>

<style lang="sass" scoped>
  .item {
    display: flex;
    flex-flow: column nowrap;
  }
  .child {
    display: flex;
    flex-shrink: 0;
  }
  ul {
    margin: 0 0 0 1.25rem;
    padding: 0;
  }
  .root {
    font-size: 1.75rem;
    list-style: none;
    margin: 1rem 0;
  }
</style>
