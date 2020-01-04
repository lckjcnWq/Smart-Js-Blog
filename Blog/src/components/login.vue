<template>
  <div class="login">
    <!--登录表单-->
    <el-form :model="loginForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <h1 class="title">博客登录</h1>

      <el-form-item label="账号" prop="username">
        <el-input type="text" v-model="loginForm.username" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="loginForm.password" autocomplete="off"></el-input>
      </el-form-item>

      <div class="loginbutton">
        <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        //登录表单的数据
        loginForm: {
          username: '',
          password: ''
        },
        //验证数据
        rules: {
          username: [
            {required: true, message: '请输入用户名', trigger: 'blur'},//非空验证
            {min: 5, max: 18, message: '长度在 5 到 18 个字符', trigger: 'blur'} //长度验证
          ],
          password: [
            {required: true, message: '请输入用户密码', trigger: 'blur'},
            {min: 5, max: 18, message: '长度在 5 到 18 个字符', trigger: 'blur'}
          ],
        }
      };
    },
    methods: {
      submitForm(a) {
        this.$refs[a].validate((valid) => {
          let _this = this;
          if (valid) {
            try {
              let para = new URLSearchParams();
              para.append('userName', this.loginForm.username);
              para.append('password', this.loginForm.password);
              this.$post('blog_back/admin/login', para)
                .then((response) => {
                  console.log("日志信息为:" + response);
                  _this.$store.commit('SAVE_USERINFO', response)
                  this.$router.push('/');
                })

            } catch (error) {
              console.log(error)
            }
          } else {
            console.log('用户名或者密码错误');
            return false;
          }
        });
      }
    }
  }
</script>

<style>
  html, body {
    margin: 0;
    padding: 0;
  }

  html, body, #app, .login {
    height: 100%;
  }

  .login {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .el-form {
    width: 400px;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 0px 45px 10px 10px;
  }

  .loginbutton {
    width: 70px;
    margin: 0 auto;
  }

  .title {
    font-size: 22px;
    color: #333;
    font-weight: bold;
    padding: 20px 0 20px 160px;
  }

  .pointer {
    margin: 0px auto;
  }
</style>
