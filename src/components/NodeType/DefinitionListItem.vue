<template>
  <div class="definition">
    <text-field class="label" :content="node.content" @change="labelChanged"></text-field>
    <div class="children">
      <div v-for="childId in node.children">
        <node-view :node-id="childId"></node-view>
      </div>
    </div>
  </div>

</template>

<script>
  import _ from 'lodash'
  export default {
    props: {
      node: { required: true }
    },
    methods: {
      labelChanged (newLabel) {
        this.$emit('change', _.set(this.node, 'params.label', newLabel))
      },
      contentChanged (newContent) {
        this.$emit('change', _.set(this.node, 'content', newContent))
      }
    }
  }
</script>

<style lang="sass" scoped>
  @import '../../Colors.scss';
  .definition {
    display: flex;
    flex-flow: row nowrap;
  }
  .label {
    font-weight: bold;
    font-color: $color-fg-emphasis;
  }
</style>