<template>
  <div class="item">
    <ul>
      <li>
        <text-field :content="node.content" @change="contentChanged"></text-field>
      </li>
    </ul>
    <div class="child" v-for="childId in node.children">
      <node-view :node-id="childId"></node-view>
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
  .item {
    display: flex;
    flex-flow: column nowrap;
  }
  .child {
    display: flex;
  }
  ul {
    margin: 0 0 0 1.25rem;
    padding: 0;
  }
</style>
