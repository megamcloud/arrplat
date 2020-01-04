import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
// @ts-ignore
import { Department, Staff, Role, Auth, OrgParams } from '@arrplat/common'
import * as orgServices from '../services/org'

function loop (department): Department[] {
  return department.map(dep => {
    const children = dep.child_org_departments && dep.child_org_departments.length > 0 ? loop(dep.child_org_departments) : []
    return {
      id: dep.id,
      label: dep.name,
      children
    }
  })
}

@Module({
  name: 'org',
  stateFactory: true,
  namespaced: true
})
export default class OrgModule extends VuexModule {
  department: Department[] = []
  staffs: Staff[] = []
  roles: Role[] = []
  auth: Auth[] = []
  createOrgVisible: boolean = false

  get allDepartment() { return this.department }
  get allStaffs() { return this.staffs }
  get allRoles() { return this.roles }
  get allAuth() { return this.auth }
  get createOrgVisibleGetter() { return this.createOrgVisible }

  @Mutation GET_DEPARTMENT (val) { this.department = loop(val) }
  @Mutation GET_STAFFS(val) { this.staffs = val }
  @Mutation GET_ROLES(val) { this.roles = val }
  @Mutation SET_ALL_AUTH(val) { this.auth = val }
  @Mutation SET_CREATE_ORG_DIALOG(val) { this.createOrgVisible = val }

  @Action({ commit: 'SET_CREATE_ORG_DIALOG', rawError: true })
  toggleCreateOrgDialog(val) {
    return val
  }

  @Action({ commit: 'GET_DEPARTMENT' })
  async getCurrentDepartment(orgId) {
    const res = await orgServices.getAllDepartment(orgId)
    return res.data.data
  }

  @Action({ commit: 'GET_STAFFS' })
  public async getStaffs({ orgId, departmentId }) {
    const res = await orgServices.getStaffs(orgId, departmentId)
    return res.data.data
  }

  @Action
  public async addDepartment({ orgId, departmentName, parentDepartmentId }) {
    const res = await orgServices.addDepartment(orgId, departmentName, parentDepartmentId)
    return res
  }

  @Action
  public async deleteDepartment({ orgId, departmentId }) {
    const res = await orgServices.deleteDepartment(orgId, departmentId)
    return res
  }

  @Action({ rawError: true })
  public addStaff(staff) {
    return orgServices.addStaff(staff)
  }

  @Action
  public removeStaff({ orgId, staffId }) {
    return orgServices.removeStaff(orgId, staffId)
  }

  @Action({ commit: 'GET_ROLES' })
  public async getRoles(orgId) {
    const res = await orgServices.getRoles(orgId)
    return res.data.data
  }

  @Action
  public modifyRole({ isEdit, orgId, roleName, roleId }) {
    return orgServices.modifyRole(isEdit, orgId, roleName, roleId)
  }

  @Action
  public getRolesStaff({ roleId, orgId }) {
    return orgServices.getRolesStaff(roleId, orgId)
  }

  @Action
  public getRolesAuth({ roleId, orgId }) {
    return orgServices.getRolesAuth(roleId, orgId)
  }

  @Action({ commit: 'SET_ALL_AUTH' })
  public async getAuth(orgId) {
    const res = await orgServices.getAuth(orgId)
    const data = res.data.data
    return [ ...data.system_menu, ...data.application_menu ]
  }

  @Action
  public deleteRole({ roleId, orgId }) {
    return orgServices.deleteRole(roleId, orgId)
  }

  @Action
  public deleteRoleStaff({ roleId, staffId, orgId }) {
    return orgServices.deleteRoleStaff(roleId, orgId, staffId)
  }

  @Action
  public saveRoleAuth({ roleId, orgId, auth }) {
    return orgServices.saveRoleAuth(roleId, orgId, auth)
  }

  @Action
  public saveRoleStaff({ roleId, orgId, staffIds }) {
    return orgServices.saveRoleStaff(roleId, orgId, staffIds)
  }

  @Action
  public modifyOrg(org) {
    return orgServices.modifyOrg(org)
  }

  @Action({ rawError: true })
  public createOrg(org: OrgParams) {
    return orgServices.createOrg(org)
  }
}
