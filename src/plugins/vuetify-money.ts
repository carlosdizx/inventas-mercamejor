import { App } from 'vue'
import VuetifyMoney from "@/components/generals/vuetify-money/VuetifyMoney.vue"

export default {
  install: (app: App) => {
    app.component('VuetifyMoney', VuetifyMoney)
  }
}
