<template>
  <el-form class="login-form" :model="loginForm" status-icon :rules="rules" ref="ruleForm">
    <el-form-item prop="username" label="手机号" label-width="60px">
      <el-input v-model="loginForm.phone" placeholder="手机号" type="username" auto-complete="off" />
    </el-form-item>
    <el-form-item prop="code" label="验证码" label-width="60px">
      <el-col :span="13">
        <el-input v-model="loginForm.phone_code" placeholder="验证码" type="text" auto-complete="off" class="passwordInput" />
      </el-col>
      <el-col :span="9" :offset="1">
        <el-button type="primary" @click="getCode">{{ msg }}</el-button>
      </el-col>
    </el-form-item>
    <el-button type="primary" @click="handleLogin('ruleForm')" class="login-btn">登录</el-button>
  </el-form>
</template>
<script lang="ts">
  import { Component, namespace, Vue } from 'nuxt-property-decorator'
  import { LoginEntity } from '@arrplat/common'
  import { checkPhone } from '~/utils'

  const user = namespace('user')

  @Component
  export default class Index extends Vue {
    msg = '获取验证码'
    loginForm: LoginEntity = {} as LoginEntity
    lock = true
    timeout: any = null
    rules = {
      phone: [{
        validator: (rule: any, value: any, callback: Function) => (value === ''  ? callback(new Error ('请输入用户名')) : ''),
        trigger: 'blur'
      }],
      phone_code: [{
        validator: (rule: any, value: any, callback: Function) => (value === ''  ? callback(new Error ('请输入密码')) : ''),
        trigger: 'blur'
      }]
    }

    @user.Action login:any
    @user.Action verification:any

    public async handleLogin() {
      try {
        const res = await this.login(this.loginForm)
        if(res.status === 200) {
          this.$message({ message: '登录成功，欢迎回来～', type: 'success' })
          return this.$router.push('/admin')
        }
        return this.$message({ message: res.message, type: 'error' })
      } catch(e) {
        if (e.response) {
          this.$message({ message: e.response.data.message, type: 'error' })
        } else {
          this.$message({ message: '登录失败!' + e.message, type: 'error' })
        }
      }
    }

    public getCode() {
      let time = 60
      if (!checkPhone(this.loginForm.phone)) {
        return (this.$refs.ruleForm as any).validateField('username', (valid) => {
          if (!valid) return false
        })
      }

      if (time === 60 && this.lock) {
        this.lock = false
        const data = this.verification(this.loginForm)
        if (data.code === 400) {
          this.$message({ message: data.msg, type: 'warning' })
          time = 60
          this.lock = true
          this.msg = '获取验证码'
          return false
        }
        this.timeout = setInterval(() => {
          this.msg = (time -= 1) + '秒后获取'
          if (time < 0) {
            clearInterval(this.timeout)
            time = 60
            this.lock = true
            this.msg = '获取验证码'
          }
        }, 1000)
        return false
      }
    }
  }
</script>

<style lang="scss" scoped>
  .login-form {
    display: flex;
    flex-direction: column;
  }

  .login-btn {
    width: 100%;
    margin: 0 auto;
    border-radius: 15px;
  }
</style>
