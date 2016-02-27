<template>
  <div>
    <div :is="nodeComponent" :node="node" @change="handleChange">
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
    },
    methods: {
      handleChange: function () {
        this.$emit('change', this.node)
      }
    }
  }
</script>
