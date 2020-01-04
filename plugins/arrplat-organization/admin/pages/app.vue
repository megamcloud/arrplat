<template>
  <ArrPanel title="应用中心" border>
    <AppItem :item="item" :key="i" v-for="(item, i) in allAppsGetter" @onClick="handleItemClick"></AppItem>
    <el-dialog
      title="应用详情"
      :visible.sync="detailDialogVisible"
      width="40%"
      :before-close="handleDialogClose">
      <AppItemDetails v-if="detailDialogVisible" :item="currentApp" @onDismiss="handleDialogClose" />
    </el-dialog>
  </ArrPanel>
</template>
<script lang="ts">
  import { Component, Vue, namespace } from 'nuxt-property-decorator'
  import AppItem from '../components/AppItem.vue'
  import AppItemDetails from '../components/AppItemDetails.vue'
  import { Application } from '@arrplat/common'

  const app = namespace('app')

  @Component({
    layout: 'plugin',
    components: {
      AppItem, AppItemDetails
    }
  })
  export default class Apps extends Vue {
    detailDialogVisible: boolean = false
    currentApp: Application = {}

    @app.Getter currentOrg
    @app.Getter allAppsGetter
    @app.Action getAllApps

    handleItemClick(app) {
      this.detailDialogVisible = true
      this.currentApp = app
    }

    handleDialogClose() {
      this.detailDialogVisible = false
    }

    beforeMount() {
      this.getAllApps(this.currentOrg.id)
    }
  }
</script>
