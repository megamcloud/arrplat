<template>
  <div class="plugin-menu" v-if="showPluginMenuGetter">
    <div class="plugin-menu-title" v-if="currentApp">
      <img :src="currentApp.icon" />
      <h3>
        {{currentApp.title}}
      </h3>
    </div>
    <el-menu
      default-active="2"
      class="plugin-menu-content"
      v-if="currentApp"
      router
    >
      <el-menu-item v-for="(menu, i) in currentApp.menus" :key="i" :index="lodash.startsWith(menu.path, 'http') ? menu.path : `/plugins/org/${menu.link}`">
        <i :class="menu.icon"></i>
        <span slot="title">{{menu.name}}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<style lang="scss" scoped>
  @import '../../assets/styles/variables';

  .plugin-menu {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 200px;

    .el-menu {
      box-sizing: border-box;
    }

    .plugin-menu-title {
      border-right: 1px solid $borderColor;
      border-bottom: 1px solid $borderColor;
      border-top: 0;
      height: 69px;
      line-height: 69px;
      display: flex;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;

      h3 {
        line-height: 32px;
        padding-left: 10px;
        font-weight: normal;
      }

      img {
        width: 32px;
        height: 32px;
        display: inline-block;
      }
    }

    .plugin-menu-content {
      width: 100%;
      height: 100%;
    }
  }
</style>
<script>
  import { Component, Vue, namespace } from 'nuxt-property-decorator'
  import _ from 'lodash'

  const app = namespace('app')
  const system = namespace('system')

  @Component({})
  export default class PluginMenu extends Vue {
    lodash = _

    @app.Getter currentApp
    @system.Getter showPluginMenuGetter
  }
</script>
