<template>
  <div class="app-bar">
    <div class="expand-btn" @click="handleToggleMenu">
      <img src="../../../assets/images/icon/menu.svg" class="expand-btn-icon" />
    </div>
    <div class="app-list">
      <el-tooltip class="item" effect="dark" :content="apps.title" placement="right" v-for="(apps, i) in orgApps" :key="i">
        <a href="javascript:void(0);" @click="$router.push(`/plugins/${apps.admin_route}`)">
          <div :class="`app-btn ${currentApp && currentApp.name === apps.name ? ' active' : ''}`">
            <img :src="apps.icon" />
          </div>
        </a>
      </el-tooltip>

      <el-tooltip class="item" effect="dark" content="添加应用" placement="right">
        <nuxt-link to="/">
          <div class="app-btn app-add-btn">
            <i class="el-icon-plus"></i>
          </div>
        </nuxt-link>
      </el-tooltip>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  @import "../../../assets/styles/variables";
  .app-bar {
    width: 62px;
    background: $mainColor;
    height: 100%;
    min-width: 62px;

    .app-list {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;

      .app-btn {
        width: 42px;
        height: 42px;
        border: 1px solid $borderSecondColor;
        border-radius: 10px;
        margin-top: 18px;
        background-color: #fff;
        opacity: 0.8;
        cursor: pointer;

        img {
          width: 100%;
          height: 100%;
        }

        &.active {
          opacity: 1;
        }

        &:hover {
          border-width: 2px;
        }
      }

      .app-add-btn {
        display: flex;
        justify-content: center;
        align-items: center;
        border-style: dashed;
        background-color: transparent;
        color: #fff;
        opacity: 1;
      }
    }

    .expand-btn {
      width: 100%;
      height: 62px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;

      .expand-btn-icon {
        width: 24px;
        height: 24px;
      }
    }
  }
</style>
<script lang="ts">
  import { Component, Vue, namespace } from 'nuxt-property-decorator'

  const app = namespace('app')
  const system = namespace('system')

  @Component({})
  export default class AppBar extends Vue {
    @app.Getter orgApps
    @app.Getter currentApp
    @system.Action togglePluginMenu

    handleToggleMenu() {
      this.togglePluginMenu()
    }
  }
</script>
