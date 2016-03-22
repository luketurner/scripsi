<template>
  <div>
    <div :is="nodeComponent" :node="node" @change="handleChange">
    </div>
  </div>
</template>

<script>
  import ListItem from './NodeType/ListItem'
  import {getNode} from '../Node'
  
  export default {
    props: {
      nodeId: { required: true }
    },
    components: {
      'ListItem': ListItem
    },
    computed: {
      node: function () {
        return getNode(this.nodeId)
      },
      nodeComponent: function () {
        return this.node.type
      }
    },
    methods: {
      handleChange: function () {
        this.$emit('change', this.nodeId)
      }
    }
  }
</script>
