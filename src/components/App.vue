<template>
  <div id="app">
    <navbar></navbar>
    <node-view v-if="rootNodeId" :node-id="rootNodeId"></node-view>
  </div>
</template>

<script>
  import Vue from 'vue'
  
  import Navbar from './Navbar'
  import NodeView from './NodeView'
  import TextField from './TextField'
  
  // Globally register some common components for convenience
  Vue.component('node-view', NodeView)
  Vue.component('text-field', TextField)

  export default {
    components: {
      Navbar
    },
    vuex: {
      getters: {
        rootNodeId: (state) => state.rootNodeId
      }
    }
  }
</script>

<style>
body {
  font-family: Helvetica, sans-serif;
}
</style>
