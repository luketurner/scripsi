<template>
  <div class="bookmarks">
    <h3>Bookmarks</h3>
    <div v-for="node in bookmarks" class="line" @click="setDisplayNode(node.id)">
      {{ node.content.toString().slice(0, 25) }}
    </div>
  </div>
</template>

<script>
  import {setDisplayNode} from '../Store/Actions'
  
  export default {
    vuex: {
      getters: {
        bookmarks (state) {
          return state.bookmarks
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