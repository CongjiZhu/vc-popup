import Vue from 'vue'
import PopupBase from './popup-base.js'
import popupController from '../popup-base/index.js'

function popupRegister (name, template, popupConfig, defaultConfig) {
  var incrId = 0
  // 首字母大写
  name = name[0].toUpperCase() + name.slice(1)

  function popupTemplate (constructConfig) {
    if (this === undefined) return console.log('记得加new~')

    this.id = incrId++
    this.name = name
    this.popupConfig = popupConfig
    this.Template = Vue.extend(template)
    this.config = this.constructConfig =
      Object.assign({
        animationConfigurable: true
      }, defaultConfig, constructConfig)

    popupController.register(this.getRouterId(), this.open.bind(this))
  }

  popupTemplate.prototype = PopupBase

  if (Vue.prototype.$popup)
    Vue.prototype.$popup[name] = popupTemplate
  else
    Vue.prototype.$popup = {
      [name]: popupTemplate
    }

  return popupTemplate
}

export { popupRegister }
export default popupRegister
