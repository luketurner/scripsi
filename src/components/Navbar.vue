<template>
  <div class="navbar">
    <simple-button class="btn" icon="cog" title="Open config" @click="openConfigNode"></simple-button>
    <simple-button class="btn sep" icon="stack" title="Toggle node index" @click="toggleIndex"></simple-button>
    <simple-button class="btn sep" icon="home" title="Open root node" @click="openRootNode"></simple-button>
    <simple-button class="btn" icon="bookmarks" title="Show bookmarks" @click="toggleBookmarks"></simple-button>
    <simple-button class="btn" icon="bookmark" title="Bookmark open node" @click="addBookmark"></simple-button>
    <div class="spacer"></div>
  </div>
</template>

<script>
  import {openConfigNode, openRootNode, toggleActiveSidebar} from '../Actions'
  export default {
    vuex: {
      getters: {
        config: (state) => state.nodes[state.configNodeId].content
      },
      actions: {
        openConfigNode,
        openRootNode,
        toggleIndex (store) {
          toggleActiveSidebar(store, 'Index')
        },
        toggleBookmarks (store) {
          toggleActiveSidebar(store, 'Bookmarks')
        },
        addBookmark (store) {
          store.dispatch('ADD_BOOKMARK', store.state.displayNodeId)
        }
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
  }
  .sep {
    margin-right: 1.5rem;
  }
  .datasource {
    flex-grow: 0;
  }
</style>
