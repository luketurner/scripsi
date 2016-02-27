<template>
  <div>
    <div :is="nodeComponent" :node="node">
    </div>
  </div>
</template>

<script>
  import ListItem from './Nodes/ListItem'
  export default {
    props: {
      node: { required: true }
    },
    components: {
      'ListItem': ListItem
    },
    computed: {
      nodeComponent: function () {
        return this.node.type
      }
    }
  }
</script>
