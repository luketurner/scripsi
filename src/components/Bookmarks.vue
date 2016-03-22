<template>
  <div>
    <index :filter-action="bookmarksOnly" title="Bookmarks"></index>
  </div>
</template>

<script>
  import _ from 'lodash'
  import Index from './Index'
  import getConfigNode from '../Actions'
  
  export default {
    methods: {
      bookmarksOnly (store, node) {
        let bookmarks = getConfigNode(store).bookmarks
        return _.has(bookmarks, node.id)
      }
    },
    components: {
      Index
    }
  }
</script>

<style lang="sass" scoped>
</style>