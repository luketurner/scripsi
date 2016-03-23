<template>
  <div class="bookmarks">
    <h3>Bookmarks</h3>
    <div v-for="node in bookmarks" class="line" @click="setDisplayNode(node.id)">
      {{ node.content.toString().slice(0, 25) }}
    </div>
  </div>
</template>

<script>
  import _ from 'lodash'
  import {setDisplayNode} from '../Actions'
  import {getConfig} from '../Getters'
  
  export default {
    vuex: {
      getters: {
        bookmarks (state) {
          let config = getConfig(state)
          console.log(config)
          return _.map(config.bookmarks, (node) => state.nodes[node])
        }
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