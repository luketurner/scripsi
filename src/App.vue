<template>
  <div id="app">
    <navbar :state="state"></navbar>
    <node-view v-if="state.rootNode" :node-id="state.rootNode" @change="rootNodeChanged"></node-view>
  </div>
</template>

<script>
  import Vue from 'vue'
  
  import './directives/Medium'
  import Navbar from './components/Navbar'
  import NodeView from './components/NodeView'
  
  Vue.component('node-view', NodeView)

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
