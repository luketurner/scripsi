<template>
  <div class="definition">
    <text-field class="label" :content="node.content" @change="labelChanged"></text-field>
    <div class="children">
      <div v-if="!node.collapsed" v-for="childId in node.children">
        <node-view :node-id="childId"></node-view>
      </div>
    </div>
  </div>

</template>

<script>
  import _ from 'lodash'
  export default {
    props: {
      node: { required: true },
      isRootNode: { default: false }
    },
    methods: {
      labelChanged (newLabel) {
        this.$emit('update', _.set(this.node, 'params.label', newLabel))
      }
    }
  }
</script>

<style scoped>
  @import '../../colors';
  .definition {
    display: flex;
    flex-flow: row nowrap;
  }
  .label {
    font-weight: bold;
    font-color: $color-fg-emphasis;
    flex-shrink: 0;
  }
</style>