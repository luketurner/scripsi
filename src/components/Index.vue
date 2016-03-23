<template>
  <div class="index">
    <h3>Index</h3>
    <div v-for="node in nodes" class="line" @click="setDisplayNode(node.id)">
      {{ node.content.toString().slice(0, 25) }}
    </div>
  </div>
</template>

<script>
  import {setDisplayNode} from '../Actions.js'
  
  export default {
    vuex: {
      getters: {
        nodes: (state) => state.nodes
      },
      actions: {
        setDisplayNode
      }
    }
  }
</script>

<style lang="sass" scoped>
  @import '../Colors.scss';
  
  .index {
    background-color: $color-bg-secondary;
  }
  
  h3 {
    font-weight: normal;
    margin: 0.25rem;
  }
  
  .line {
    cursor: pointer;
    padding: 0.25rem;
    margin: 0.25rem;
    background-color: $color-bg-primary;
    border-radius: 0.25rem;
  }
</style>