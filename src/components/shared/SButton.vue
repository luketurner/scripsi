<template>
  <div class="button" :title="title">
    <s-icon :type="icon" class="icon"></s-icon>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    props: ['icon', 'title'],
    methods: {
      clicked () {
        this.$emit('click')
      }
    }
  }
</script>

<style lang="sass" scoped>
  .button {
    display: flex;
    height: 1.25em;
    min-width: 1.25em;
    cursor: pointer;
    padding: 0.125em;
    &:hover {
      background-color: rgba(0, 0, 0, 0.1)
    }
  }
  
  .icon {
    margin-right: 0.125em;
  }
</style>