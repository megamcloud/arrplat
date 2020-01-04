import { Vue } from 'nuxt-property-decorator'
import ArrplatUI from '@arrplat/ui'

console.log('ArrplatUI:', ArrplatUI.install)

export default () => {
  Vue.use(ArrplatUI)
}
