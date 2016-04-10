<template>
  <div :class="{ 'node-view': true, 'outlined': outlined }"
    draggable="true" @dragstart="dragstart" @dragend="dragend" @drop="drop" @dragenter="dragenter" @dragleave="dragleave"
    @keydown.stop.prevent.enter="createSiblingNode(this.node, { type: this.node.type })"
    @keydown.stop.delete="deleteEmptyNode">
    <div class="menu-button" @mouseenter="mouseOver = true" @mouseleave="mouseOver = false" @click="toggleCollapse" @contextmenu.prevent="toggleMenu">
      <s-icon class="icon" v-if="outlined" :type="node.collapsed ? 'plus' : 'minus'"></s-icon>
    </div>
    <menu :open="menuOpen" :items="menuItems" @close="menuOpen = false">
    </menu>
    <div :is="nodeComponent" :node="node" @update="updateNode" :is-root-node="isRootNode" :menu-items="menuItems">
    </div>
  </div>
</template>

<script>
  import _ from 'lodash'
  import {updateNode, deleteNode, createChildNode, createSiblingNode} from '../../Store/Actions'
  
  const CREATE_CHILD_NODE = 'CREATE_CHILD_NODE'
  const DELETE_NODE = 'DELETE_NODE'
  const CONVERT_NODE = 'CONVERT_NODE'

  export default {
    props: {
      nodeId: { required: true },
      isRootNode: { type: Boolean, default: false }
    },
    components: {
      ListItem: require('../NodeType/ListItem'),
      TodoListItem: require('../NodeType/TodoListItem'),
      DefinitionListItem: require('../NodeType/DefinitionListItem'),
      JsonObject: require('../NodeType/Json/Object'),
      Text: require('../NodeType/Text')
    },
    data () {
      return {
        mouseOver: false,
        menuOpen: false,
        menuItems: [{
          label: 'Delete node',
          type: DELETE_NODE
        }, {
          label: 'Create child node',
          type: CREATE_CHILD_NODE
        }, {
          label: 'Convert node to...',
          submenu: [{ label: 'Plain text', type: CONVERT_NODE, convertTo: 'Text' },
                    { label: 'List item', type: CONVERT_NODE, convertTo: 'ListItem' },
                    { label: 'Todo list item', type: CONVERT_NODE, convertTo: 'TodoListItem' },
                    { label: 'Definition list item', type: CONVERT_NODE, convertTo: 'DefinitionListItem' }]
        }]
      }
    },
    computed: {
      outlined () {
        return this.menuOpen || this.mouseOver
      },
      node () {
        return this.$store.state.nodes[this.nodeId]
      },
      nodeComponent () {
        return this.node.type
      }
    },
    events: {
      menuItemPress (menuItem) {
        switch (menuItem.type) {
          case DELETE_NODE:
            this.deleteNode(this.node)
            break
          case CREATE_CHILD_NODE:
            this.createChildNode(this.node, {})
            break
          case CONVERT_NODE:
            if (!menuItem.convertTo) {
              throw new Error('CONVERT_NODE menu item missing required convertTo field')
            }
            this.updateNode(_.set(this.node, 'type', menuItem.convertTo))
            break
          default:
            this.$broadcast('menuItemPress', menuItem)
            break
        }
      }
    },
    methods: {
      dragstart (ev) {
        ev.preventDefault()
        ev.stopPropagation()
        ev.dataTransfer.effectAllowed = 'move'
        ev.dataTransfer.setData('text/plain', this.node.id)
        console.log('started')
      },
      dragenter (ev) {
        ev.preventDefault()
        ev.dataTransfer.dropEffect = 'move'
        this.outlined = true
        console.log('dragenter')
      },
      dragleave (ev) {
        this.outlined = false
        console.log('dragleave')
      },
      toggleMenu () {
        this.menuOpen = !this.menuOpen
      }
    },
    vuex: {
      actions: {
        updateNode,
        deleteNode,
        createChildNode,
        createSiblingNode,
        deleteEmptyNode (store) {
          if (this.node.content.length === 0) {
            this.deleteNode(this.node)
          }
        },
        toggleCollapse (store) {
          this.updateNode(_.update(this.node, 'collapsed', (v) => !v))
        },
        dragend (store, ev) {
          if (ev.dataTransfer.dropEffect === 'none') { return }
          ev.preventDefault()
          deleteNode(store, this.node)
          console.log('deleted')
        },
        drop (store, ev) {
          ev.preventDefault()
          ev.stopPropagation()
          let droppedNodeId = ev.dataTransfer.getData('text/plain')
          // let droppedNode = getNode(store.state, droppedNodeId)
          this.node.children.push(droppedNodeId)
          console.log('dropped')
        }
      }
    }
  }
</script>

<style lang="sass" scoped>
  .node-view {
    position: relative;
    display: flex;
    padding: 0.25rem;
    border-radius: 0.125rem;
    border: 1px dashed rgba(0, 0, 0, 0);
    &.outlined {
      border-color: rgba(0, 0, 0, 0.3);
      background-color: rgba(0, 0, 0, 0.1);
    }
  }
  .menu-button {
    width: 1rem;
    height: 1rem;
    border-radius: 3px;
    display: flex;
    margin-right: 0.25rem;
    align-items: center;
    justify-content: center;
    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
      cursor: pointer;
      & > .icon {
        display: flex;
      }
    }
  }
  
  .icon {
    display: none;
    text-align: center;
    fill: rgba(0, 0, 0, 0.3);
    font-size: 0.5rem;
  }
</style>