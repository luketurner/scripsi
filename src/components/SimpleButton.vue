<template>
  <button :title="title">
    <icon :type="icon"></icon>
    {{ label }}
  </button>
</template>

<script>
export default {
  props: ['icon', 'label', 'title'],
  methods: {
    clicked () {
      this.$emit('click')
    }
  }
}
</script>

<style lang="sass" scoped>
  button {
    height: 1.25em;
    min-width: 1.25em;
    border: none;
    background-color: inherit;
    outline: none;
    cursor: pointer;
    padding: 0.125em;
    &:hover {
      background-color: rgba(0, 0, 0, 0.1)
    }
  }
</style>