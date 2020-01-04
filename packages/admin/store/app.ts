import { Module, VuexModule, Mutation, Action, getModule } from 'vuex-module-decorators'
import * as appServices from '../services/app'
import { systemStore } from '~/utils/store-accessor'
import { DIALOG_NAME } from './system'
import { OrgConfig, Application } from '@arrplat/common'

@Module({
  name: 'app',
  stateFactory: true,
  namespaced: true,
})
class AppModule extends VuexModule {
  apps: Application[] = []
  allApps: Application[] = []
  orgs: OrgConfig[] = []
  currentOrgId: string | null = null
  createOrgDialogFlag: boolean = false

  @Mutation GET_APPS(apps: Application[]) { this.apps = apps }
  @Mutation GET_ALL_APPS(apps: Application[]) { this.allApps = apps }
  @Mutation GET_ORGS(orgs) { this.orgs = orgs }
  @Mutation SET_CURRENT_ORG_ID(currentOrgId) { this.currentOrgId = currentOrgId }
  @Mutation SET_ORG_DIALOG_FLAG(orgDialogFlag) { this.createOrgDialogFlag = orgDialogFlag }

  get currentOrgIdGetter() { return this.currentOrgId }
  get orgApps() { return this.apps }
  get allAppsGetter() { return this.allApps }
  get allOrgs() { return this.orgs }
  get getCreateOrgFlag() { return this.createOrgDialogFlag }

  get currentOrg() {
    if (this.currentOrgId) {
      const res = this.orgs.filter(org => org.id === this.currentOrgId)
      return res.length > 0 ? res[0] : this.orgs[0]
    }
    return this.orgs[0]
  }

  get currentApp() {
    if (process.server) {
      return null
    }
    const path = location.href
    let current: (Application | null) = null
    this.apps.map(plus => {
      if (path.indexOf(`plugins/${plus.admin_route}`) !== -1) {
        current = plus
      }
    })

    return current
  }

  @Action({ commit: 'GET_APPS' })
  async getAllAppsInOrg(orgId) {
    const res = await appServices.getAllApps(orgId, 0)
    return res.data.data
  }

  @Action({ commit: 'GET_ALL_APPS' })
  public async getAllApps(orgId) {
    const res = await appServices.getAllApps(orgId, 1)
    return res.data.data
  }


  @Action
  async init() {
    const orgs = await this.getAllOrgs(1)
    orgs.length > 0 && await this.getAllAppsInOrg(this.currentOrg.id)
    if(orgs.length < 1) {
      await this.setOrgDialogFlag(true)
    }
  }

  @Action({ commit: 'GET_ORGS' })
  public async getAllOrgs(hasDetails = 1) {
    const orgList = await appServices.getAllOrgs(hasDetails)
    const data = orgList.data.data

    if (data.length === 0) {
      systemStore.setDialogVisible({ key: DIALOG_NAME.NO_ORG_DIALOG, visible: true })
    }

    // auto select first org
    if (!this.currentOrgId && data.length > 0) {
      this.setCurrentOrgId(data[0].id)
    }

    return data
  }

  @Action({ commit: 'SET_CURRENT_ORG_ID' })
  public setCurrentOrgId(currentId) {
    return currentId
  }

  @Action
  public async onOrgChanged(currentOrgId) {
    await this.setCurrentOrgId(currentOrgId)
    return await this.init()
  }

  @Action({ commit: 'SET_ORG_DIALOG_FLAG' })
  public setOrgDialogFlag(orgDialogFlag) {
    return orgDialogFlag
  }

  @Action
  public async toggleApp({ appId, orgId, isAdd }) {
    const res = await appServices[isAdd ? 'addApp':'removeApp'](appId, orgId)
    if (res.status === 200) {
      this.getAllAppsInOrg(orgId)
      this.getAllApps(orgId)
    }
    return res
  }
}

export default AppModule
