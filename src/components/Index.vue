<template>
  <div class="index">
    <div v-for="node in filteredNodes" class="line" @click="setDisplayNode(node.id)">
      {{ node.content.toString().slice(0, 25) }}
    </div>
  </div>
</template>

<script>
  import _ from 'lodash'
  import {setDisplayNode} from '../Actions.js'
  
  export default {
    props: ['filter'],
    computed: {
      filteredNodes () {
        return _.filter(this.nodes, this.filter || _.constant(true))
      }
    },
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
  .line {
    cursor: pointer;
    padding: 0.25rem;
    margin: 0.25rem;
    background-color: $color-bg-primary;
    border-radius: 0.25rem;
  }
</style>