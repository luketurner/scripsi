<template>
  <span class="text" contenteditable="true" @blur="handleBlur" v-html="content" v-focus-auto></span>
</template>

<script>
  import Medium from 'medium.js'
  import {focusAuto} from 'vue-focus'

  export default {
    directives: {
      focusAuto
    },
    props: {
      content: { required: true }
    },
    methods: {
      handleBlur: function () {
        let value = this.medium.value()
        if (value !== this.content) {
          this.$emit('change', value)
        }
      }
    },
    attached: function () {
      this.medium = new Medium({
        element: this.$el,
        mode: Medium.inlineMode,
        pasteAsText: false,
        tags: null
      })
    }
  }
</script>

<style lang="sass" scoped>
.text {
  &:hover, &:focus {
    outline: none;
  }
}
</style>