<template>
  <span>
    <text-field class="text" :content="node.content" @change="contentChanged" v-focus-auto></text-field>
    <div class="child" v-if="!node.collapsed" v-for="childId in node.children">
      <node-view :node-id="childId"></node-view>
    </div>
  </span>
</template>

<script>
  import _ from 'lodash'
  import {focusAuto} from 'vue-focus'
  
  const IMPORT_FROM_JSON = 'IMPORT_FROM_JSON'
  
  export default {
    directives: { focusAuto },
    props: {
      node: { required: true },
      isRootNode: { default: false },
      menuItems: { type: Array }
    },
    created () {
      if (this.menuItems) {
        this.menuItems.push({
          label: 'Import text',
          type: IMPORT_FROM_JSON
        })
      }
    },
    events: {
      menuItemPress (menuItem) {
        switch (menuItem.type) {
          case IMPORT_FROM_JSON:
            // TODO - replace text node with imported nodes
            return false
          default:
            return true
        }
      }
    },
    methods: {
      contentChanged: function (newContent) {
        this.$emit('update', _.set(this.node, 'content', newContent))
      }
    }
  }
</script>

<style lang="sass" scoped>
  .text {
    max-width: 45em;
    min-width: 10px;
  }
</style>
