<template>
  <el-dialog
    :title="`${isEdit ? '修改' : '新增'}员工`"
    :visible.sync="dialogVisible"
    width="30%">
    <el-form label-width="100px">
      <el-form-item label="手机号*" prop="name"><el-input v-model="entity.phone"></el-input></el-form-item>
      <el-form-item label="部门" prop="name">
        <el-tree
          class="department-tree"
          :data="allDepartment"
          show-checkbox
          node-key="id"
          default-expand-all></el-tree>
      </el-form-item>
      <el-form-item label="岗位" prop="name"><el-input v-model="entity.job_title"></el-input></el-form-item>
      <el-form-item label="直属上级*" prop="name">
        <el-select v-model="entity.superior_id" placeholder="请选择">
          <el-option
            v-for="item in allStaffs"
            :key="item.id"
            :label="`${item.user.nickname} - ${item.job_title}`"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="角色" prop="name">
        <el-select v-model="entity.role_id_list" multiple placeholder="请选择">
          <el-option
            v-for="item in allRoles"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态" prop="name">
        <el-switch
          style="display: block"
          v-model="entity.is_able"
          active-text="启用"
          inactive-text="停用"
          :active-value="1"
          :inactive-value="0">
        </el-switch>
      </el-form-item>

    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleStaffAdd">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script lang="ts">
  import { Component, Vue, namespace, Prop, Watch } from 'nuxt-property-decorator'
  import { StaffParams, DefaultStaff } from '@arrplat/common'
  import _ from 'lodash'

  const org = namespace('org')
  const app = namespace('app')

  @Component({})
  export default class StaffEditor extends Vue {
    entity: StaffParams = { is_able: 1 }

    @app.Getter currentOrg
    @org.Getter allRoles
    @org.Getter allDepartment
    @org.Getter allStaffs
    @org.Action addStaff

    @Prop([Boolean]) isEdit
    @Prop([Object]) staff
    @Prop([Boolean]) dialogVisible

    @Watch('staff')
    onStaffChange() {
      const entity = _.cloneDeep(this.staff)
      entity.phone = entity.user.phone
      delete entity.user
      this.entity = entity
    }

    async handleStaffAdd() {
      if (!this.entity.phone || this.entity.phone.length < 1) {
        return this.$message({ message: '请输入手机号', type: 'error' })
      }

      if (!this.entity.superior_id) {
        return this.$message({ message: '请选择上级', type: 'error' })
      }

      try {
        await this.addStaff({ orgId: this.currentOrg.id, data: this.entity })
        this.$emit('onChange')
        this.$message({ message: '操作成功', type: 'success' })
      } catch(e) {
        console.log('re:', e)
        if (e.response) {
          this.$message({ message: e.response.data.message, type: 'error' })
        }
      }
    }
  }
</script>
