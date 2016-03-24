<template>
  <span class="menu-container">
    <div class="menu bottom" v-if="open">
      <slot>
        <menu-item>This menu is empty</menu-item>
      </slot>
    </div>
  </span>
</template>

<script>
  import MenuItem from './MenuItem'
  export default {
    props: {
      open: { default: false }
    },
    components: {
      MenuItem
    },
    events: {
      menuClose () {
        this.open = false
      }
    }
  }
</script>

<style lang="sass" scoped>
  @import '../../Colors.scss';
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
</style>