import Vue from 'vue'
import Medium from 'medium.js'

Vue.directive('medium', {
  params: ['multiline', 'placeholder'],
  twoWay: true,
  bind: function () {
    this.medium = new Medium({
      element: this.el,
      mode: this.params.multiline ? Medium.richMode : Medium.inlineMode,
      tags: null
    })

    this.mediumHandler = function () {
      this.set(this.medium.value())
    }.bind(this)

    this.el.addEventListener('blur', this.mediumHandler)
  },
  update: function (value) {
    this.medium.value(value)
  },
  unbind: function () {
    this.el.removeEventListener('blur', this.mediumHandler)
  }
})
