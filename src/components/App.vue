<template>
  <div id="app">
    <navbar></navbar>
    <div class="sidebar" :is="sidebarComponent">
    </div>
    <div class="node-container">
      <node-view v-if="displayNodeId" :node-id="displayNodeId" :is-root-node="true"></node-view>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  
  import Navbar from './Navbar'
  import Index from './Index'
  import Bookmarks from './Bookmarks'
  import NodeView from './NodeView'
  import TextField from './TextField'
  import Icon from './Icon'
  import SimpleButton from './SimpleButton'
  import Menu from './Menu/Menu'
  import MenuItem from './Menu/MenuItem'
  
  // Globally register some common components for convenience
  Vue.component('node-view', NodeView)
  Vue.component('text-field', TextField)
  Vue.component('icon', Icon)
  Vue.component('simple-button', SimpleButton)
  Vue.component('menu', Menu)
  Vue.component('menu-item', MenuItem)

  export default {
    components: {
      Navbar,
      Index,
      Bookmarks
    },
    vuex: {
      getters: {
        displayNodeId: (state) => state.displayNodeId,
        sidebarComponent: (state) => state.activeSidebarComponent
      }
    }
  }
</script>

<style lang="sass">
  @import "../Colors.scss";

  body {
    margin: 0;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }
  * {
    box-radius: border-box;
  }
  #app {
    font-family: Helvetica, sans-serif;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    height: 100%;
    color: $color-fg-secondary;
    background-color: $color-bg-secondary;
  }
  .node-container {
    padding: 1rem;
    width: 60rem;
    display: flex;
    background-color: white;
    height: 100%;
    color: $color-fg-primary;
    background-color: $color-bg-primary;
  }
  .sidebar {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    height: 85vh;
    margin-left: 0.5rem;
    width: 15vw;
  }
</style>
