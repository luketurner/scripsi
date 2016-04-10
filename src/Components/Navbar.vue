<template>
  <div class="navbar">
    <s-button class="btn" icon="cog" title="Open config"></s-button>
    <s-button class="btn sep" icon="stack" title="Toggle node index" @click="toggleIndex"></s-button>
    <s-button class="btn sep" icon="home" title="Open root node" @click="setDisplayNode(rootNodeId)"></s-button>
    <s-button class="btn" icon="bookmarks" title="Show bookmarks" @click="toggleBookmarks"></s-button>
    <s-button class="btn" icon="bookmark" title="Bookmark open node" @click="addBookmark"></s-button>
    <div class="spacer"></div>
  </div>
</template>

<script>
  import {setDisplayNode, toggleActiveSidebar, addBookmark} from '../Store/Actions'
  export default {
    vuex: {
      actions: {
        setDisplayNode,
        addBookmark,
        toggleIndex (store) {
          toggleActiveSidebar(store, 'Index')
        },
        toggleBookmarks (store) {
          toggleActiveSidebar(store, 'Bookmarks')
        }
      },
      getters: {
        rootNodeId: (state) => state.rootNodeId
      }
    }
  }
</script>

<style lang="sass" scoped>
  @import '../Colors.scss';

  .navbar {
    height: 1.5rem;
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    margin: 0.25rem;
  }
  .spacer {
    flex-grow: 1;
  }
  .favorites {
    width: 0.5rem;
    flex-grow: 0;
  }
  .btn {
    font-size: 1.25rem;
    margin-right: 0.25rem;
    fill: $color-fg-primary;
  }
  .sep {
    margin-right: 1.5rem;
  }
  .datasource {
    flex-grow: 0;
  }
</style>
