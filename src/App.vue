<template>
  <div id="app">
    <navbar :state="state"></navbar>
    <node-view :node="state.rootNode" @change="rootNodeChanged"></node-view>
  </div>
</template>

<script>
  import './directives/Medium'
  import Navbar from './components/Navbar'
  import NodeView from './components/NodeView'

  export default {
    methods: {
      rootNodeChanged: function () {
        this.$emit('change', this.state)
      }
    },
    components: {
      Navbar,
      NodeView
    },
    props: {
      state: { required: true }
    }
  }
</script>

<style>
body {
  font-family: Helvetica, sans-serif;
}
</style>
