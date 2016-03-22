<template>
  <div class="index">
    <h3>{{ title }}</h3>
    <div v-for="node in filteredNodes" class="line" @click="setDisplayNode(node.id)">
      {{ node.content.toString().slice(0, 25) }}
    </div>
  </div>
</template>

<script>
  import _ from 'lodash'
  import {setDisplayNode} from '../Actions.js'
  
  export default {
    props: {
      filterAction: {
        default: () => _.constant(true)
      },
      title: { default: 'Index' }
    },
    computed: {
      filteredNodes () {
        let that = this
        return _.filter(this.nodes, (node) => that.filterAction(that.$store, node))
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