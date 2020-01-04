<template>
  <ArrPanel style="min-width: 220px; max-width: 220px; width:220px;" headerButton="el-icon-plus" @on-header-button-click="() => openDepartmentDialog(false)" title="部门管理" :border="true" :header="true">
    <el-tree
      class="department-tree"
      :data="allDepartment"
      show-checkbox
      node-key="id"
      @node-click="handleNodeClick"
      default-expand-all>
      <span class="tree-operations" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span class="btns">
          <el-button type="text" icon="el-icon-edit" circle size="mini" @click="() => openDepartmentDialog(true, node, data)"></el-button>
          <el-button class="color-red" type="text" icon="el-icon-delete" circle size="mini" @click="() => handleDeleteDepartment(node, data)"></el-button>
        </span>
      </span>
    </el-tree>

    <el-dialog
      :title="`${isEdit ? '修改' : '新增'}部门`"
      :visible.sync="dialogVisible"
      width="30%">
      <el-form label-width="100px">
        <el-form-item label="部门名称" prop="name">
          <el-input v-model="currentDepartment.name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="hideDialog">取 消</el-button>
        <el-button type="primary" @click="handleDepartmentAdd">确 定</el-button>
      </span>
    </el-dialog>
  </ArrPanel>
</template>
<style lang="scss">
  .department-tree {
    overflow: auto;
    width: 100%;

    .el-tree-node__content {
      .is-current {
        .btns {
          display: block !important;
        }
      }
    }

    .tree-operations {
      width: 100%;

      .btns {
        text-align: right;
        float: right;
        display: none;

        .el-button {
          margin: 0;
        }
      }

      &:hover {
        .btns {
          display: block;
        }
      }
    }
  }
</style>
<script lang="ts">
  import { Component, Vue, namespace, Watch, Emit } from 'nuxt-property-decorator'
  import { Confirm } from '@arrplat/ui'

  const org = namespace('org')
  const app = namespace('app')

  @Component
  export default class DepartmentTree extends Vue {
    dialogVisible: boolean = false
    isEdit: boolean = false
    currentDepartment: any = {}

    @org.Action getCurrentDepartment
    @org.Action addDepartment
    @org.Action deleteDepartment
    @app.Getter currentOrg
    @org.Getter allDepartment

    hideDialog() {
      this.dialogVisible = false
    }

    async handleDeleteDepartment(data) {
      Confirm.deleteConfirm(this, '部门', () => this.deleteDepartment({ isEdit: this.isEdit, orgId: this.currentOrg.id, departmentId: data.data.id }))
          .then(() => this.getCurrentDepartment(this.currentOrg.id))
    }

    async handleDepartmentAdd() {
      if (!this.currentDepartment.id) {
        this.currentDepartment = this.allDepartment[0].id
      }
      const res = await this.addDepartment({ orgId: this.currentOrg.id, departmentName: this.currentDepartment.name, parentDepartmentId: this.currentDepartment.id })

      if (res.status !== 200) {
        return this.$message({ message: res.data.message, type: 'warning' })
      }

      this.$message({ message: '添加成功', type: 'success' })

      this.getCurrentDepartment(this.currentOrg.id)
      this.dialogVisible = false
      this.currentDepartment = {}
    }

    openDepartmentDialog(isEdit, node, data) {
      this.dialogVisible = true
      this.isEdit = isEdit

      if (isEdit) {
        this.currentDepartment = data
      }
    }

    @Watch('currentOrg')
    onCurrentOrgChange() {
      if(!this.currentOrg) return
      this.getCurrentDepartment(this.currentOrg.id)
    }

    @Emit('on-department-select')
    handleNodeClick(e) {
      this.currentDepartment = e
      return this.currentDepartment.id
    }

    mounted() {
      if(!this.currentOrg) return
      this.getCurrentDepartment(this.currentOrg.id)
    }
  }
</script>
