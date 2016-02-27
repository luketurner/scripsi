<template>
  <div id="app">
    <navbar></navbar>
    <node-view :node="node"></node-view>
  </div>
</template>

<script>
  import './directives/Medium'
  import Navbar from './components/Navbar'
  import NodeView from './components/NodeView'

  export default {
    components: {
      Navbar,
      NodeView
    },
    data: function () {
      return {
        node: {
          id: '12345',
          content: 'Anode',
          type: 'ListItem',
          children: [
            {id: '12355',
             content: 'Inode',
             type: 'ListItem',
             children: []},
            {id: '12355',
             content: 'Inode',
             type: 'ListItem',
             children: []}
          ]
        }
      }
    }
  }
</script>

<style>
body {
  font-family: Helvetica, sans-serif;
}
</style>
