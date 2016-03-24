<template>
  <div class="item" @click="press">
    <slot>I'm a menu item</slot>
  </div>
</template>

<script>
  export default {
    methods: {
      press () {
        this.$emit('press')
        this.$dispatch('menuClose')
      }
    }
  }
</script>

<style lang="sass" scoped>
  @import '../../Colors.scss';
  
  .item {
    margin: 0.25rem;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
</style>