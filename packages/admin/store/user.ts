import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { User } from "@arrplat/common"
import { auth } from "@arrplat/utils"
import * as authServices from "~/services/auth"
import * as userServices from "~/services/user"

interface LoginResult {
  user: User,
  access_token: string,
  refreshToken?: string
}

@Module({
  name: 'user',
  stateFactory: true,
  namespaced: true,
})
class UserModule extends VuexModule {
  userDetailsVisible: boolean = false
  user: User | null = null
  access_token: string | null = null

  get currentUser() { return this.user }
  get getUserInfo() { return this.user }
  get checkLoginStatus () { return !!this.access_token }
  get userDetailsVisibleGetter () { return this.userDetailsVisible }

  @Mutation
  LOGIN_RESULT({ user, access_token }: LoginResult) {
    this.user = user
    this.access_token = access_token
  }

  @Mutation REFRESH_USER_DETAILS(val) { this.user = val }

  @Mutation SET_USER_DETAILS_DIALOG(val) { this.userDetailsVisible = val }

  @Action({ rawError: true })
  exitOrg(id) {
    return userServices.exitOrg(id)
  }

  @Action
  readMessage(id) {
    return userServices.readMessage(id)
  }

  @Action({ commit: 'SET_USER_DETAILS_DIALOG' })
  toggleUserDetailsDialog(val) {
    return val
  }

  @Action
  async login(params: any) {
    const res = await authServices.login(params)
    auth.setToken(res.data.data.access_token)

    if (res.status === 200) {
      this.context.commit('LOGIN_RESULT', res.data.data)
    }

    return res
  }

  @Action({ rawError: true })
  async verification(params: any) {
    const res = await authServices.verification(params)
    return res.data
  }

  @Action
  getMessage(params) {
    return userServices.getMessage(params)
  }

  @Action
  editUser(params) {
    return userServices.editUser(params)
  }

  @Action({ commit: 'REFRESH_USER_DETAILS' })
  async refreshUserDetails() {
    const res = await userServices.getUserDetails()
    return res.data.data
  }
}

export default UserModule
