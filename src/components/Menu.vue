<template>
  <span class="menu-container">
    <div class="menu bottom" v-if="open">
      <div class="item" v-for="item in items" @click="pressItem(item)">
        {{ item.label }}
        <menu v-if="item.submenu" :open.sync="item.submenuOpen" :items="item.submenu" @close="close"></menu>
      </div>
    </div>
  </span>
</template>

<script>
  import Vue from 'vue'
  export default {
    props: {
      open: { default: false },
      items: { required: true }
    },
    methods: {
      pressItem (item) {
        if (item.submenu) {
          Vue.set(item, 'submenuOpen', !item.submenuOpen)
        } else {
          this.$dispatch('menuItemPress', item)
          this.close()
        }
      },
      close () {
        this.open = false
        this.$emit('close')
      }
    }
  }
</script>

<style scoped>
  @import '../colors';
  $offset: 1.5rem;
  .menu {
    font-size: 0.8rem;
    position: absolute;
    top: 0;
    left: 0;
    max-width: 10rem;
    z-index: 1000;
    padding: 0.125rem;
    background-color: $color-fg-secondary;
    color: $color-bg-primary;
    background-clip: padding-box;
    border: 1px solid $color-fg-emphasis;
    border-radius: 5px;
    box-shadow: 0 5px 10px rgba(0,0,0,.2);
    // Offset the popover to account for the popover arrow
    &.top     { margin-top: -$offset; }
    &.right   { margin-left: $offset; }
    &.bottom  { margin-top: $offset; }
    &.left    { margin-left: -$offset; }
  }
  .item {
        margin: 0.25rem;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
</style>