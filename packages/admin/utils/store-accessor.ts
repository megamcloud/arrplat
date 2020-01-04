import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import app from '../store/app'
import user from '../store/user'
import org from '../store/org'
import system from '../store/system'

let systemStore: any = null

function initialiseStores(store: Store<any>): void {
  getModule(app, store)
  getModule(user, store)
  getModule(org, store)
  systemStore = getModule(system, store)
}

export {
  initialiseStores,
  systemStore
}
