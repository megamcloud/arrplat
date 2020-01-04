<template>
  <div class="app-list">
    <div class="app-item" v-for="(app, i) in orgApps" :key="i" @click="() => handleAppClick(app)">
      <div class="app-item-bg"></div>
      <img class="icon" :src="app.icon"/>
      <div class="name">
        {{app.title}}
      </div>
    </div>
  </div>
</template>
<script>
  import { Component, Vue, namespace } from 'nuxt-property-decorator'

  const app = namespace('app')

  @Component
  export default class Dashboard extends Vue {
    @app.Getter orgApps

    handleAppClick(item) {
      this.$router.push(`/plugins/${item.admin_route}`)
    }
  }
</script>
<style lang="scss" scoped>
  @import "../assets/styles/variables";

  .app-list {
    display: flex;
    overflow: hidden;
    width: 100%;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;

    .app-item {
      align-items: center;
      display: flex;
      flex-direction: column;
      margin-right: 50px;
      margin-bottom: 30px;
      cursor: pointer;
      padding: 10px;
      position: relative;

      .app-item-bg {
        display: none;
        background: white;
        border-radius: 20px;
        opacity: 0.6;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 1;
      }

      &:hover {
        .app-item-bg {
          display: block;
        }
      }

      .icon {
        width: 100px;
        height: 100px;
        border-radius: 10px;
        background: #FFF;
        display: flex;
        align-items: center;
        text-align: center;
        z-index: 2;

        i {
          flex: 1;
          font-size: 36px;
          width: 50px;
          height: 50px;
          color: white;
          line-height: 50px;
        }
      }

      .name {
        color: $mainTextColor;
        margin-top: 10px;
        font-size: 20px;
        z-index: 2;
      }
    }
  }
</style>
