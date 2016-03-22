<template>
  <div :class="{ 'node-view': true, 'outlined': outlined }">
    <div class="menu-button" @mouseenter="outlined = true" @mouseleave="outlined = false"></div>
    <div :is="nodeComponent" :node="node" @change="updateNode">
    </div>
  </div>
</template>

<script>
  import ListItem from './NodeType/ListItem'
  import {updateNode} from '../Actions'
  
  export default {
    props: {
      nodeId: { required: true }
    },
    components: {
      ListItem
    },
    data () {
      return {
        outlined: false
      }
    },
    computed: {
      node: function () {
        return this.$store.state.nodes[this.nodeId]
      },
      nodeComponent: function () {
        return this.node.type
      }
    },
    vuex: {
      actions: {
        updateNode
      }
    }
  }
</script>

<style lang="sass" scoped>
  .node-view {
    display: flex;
    padding: 0.25rem;
    border-radius: 0.125rem;
    &.outlined {
      border: 1px dashed rgba(0, 0, 0, 0.3);
      background-color: rgba(0, 0, 0, 0.1);
    }
  }
  .menu-button {
    width: 1rem;
    height: 1rem;
    border-radius: 3px;
    display: flex;
    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
      cursor: pointer;
    }
  }
</style>