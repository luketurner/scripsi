<template>
  <index :filter="bookmarksOnly"></index>
</template>

<script>
  import _ from 'lodash'
  import getConfigNode from '../Actions'
  
  export default {
    actions: {
      bookmarksOnly (store, node) {
        let bookmarks = getConfigNode(store).bookmarks
        return _.has(bookmarks, node.id)
      }
    }
  }
</script>

<style lang="sass" scoped>
.text {
  &:hover, &:focus {
    outline: none;
  }
}
</style>