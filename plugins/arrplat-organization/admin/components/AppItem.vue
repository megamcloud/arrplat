<template>
  <div class="app-item">
    <div class="app-item-head" @click="openDetailsDialog">
      <img class="app-item-image" :src="item.icon" />
      <h2 class="app-item-title">{{item.title}}</h2>
    </div>
    <div class="footer">
      <el-button type="text">进入</el-button>
      <AppToggleBtn type="text" :item="item"></AppToggleBtn>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  @import "~@arrplat/ui/src/theme/variables";

  .app-item {
    width:235px;
    height:273px;
    background: #FDFDFD;
    border-radius:5px;
    border:1px solid $borderColor;
    display: flex;
    flex-direction: column;
    margin-left: 20px;
    cursor: pointer;

    .app-item-head {
      height: 228px;
      align-items: center;
      width: 100%;
      justify-content: center;
      display: flex;
      flex-direction: column;

      .app-item-image {
        width: 132px;
        height: 132px;
      }

      .app-item-title {
        height: 37px;
        font-size: 22px;
        font-family: PingFangSC-Regular,PingFang SC;
        font-weight: 400;
        color: rgba(65,65,65,1);
        line-height: 37px;
        margin-top: 19px;
      }
    }

    .footer {
      border-top: 1px solid $borderColor;
      display: flex;
      .el-button {
        flex: 1;
      }
    }
  }
</style>
<script lang="ts">
  import { Vue, Component, Prop, Emit } from 'nuxt-property-decorator'
  import AppToggleBtn from '../components/AppToggleBtn.vue'

  @Component({
      components: { AppToggleBtn }
  })
  export default class AppItem extends Vue {
    @Prop([Object]) item

    @Emit('onClick')
    openDetailsDialog() {
      return this.item
    }

    mounted() {
      console.log('item:', this.item)
    }
  }
</script>
