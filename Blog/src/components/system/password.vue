<template>
  <el-row :gutter="20" style="margin-left: 0px">
    <el-col :span="11" class="borderStyle">
      <div class="titleStyle">
        <span>基本信息</span>
      </div>
      <el-form :model="user" status-icon :rules="user_rules" ref="userRule" label-width="100px" class="demo-ruleForm">
        <el-form-item label="登录名称" prop="username">
          <el-input type="text" v-model="user.user_name" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="昵称" prop="password">
          <el-input type="text" v-model="user.user_nickname" autocomplete="off"></el-input>
        </el-form-item>

        <div class="loginbutton">
          <el-button type="primary" @click="submitUser('userRule')">确认修改</el-button>
        </div>
      </el-form>
    </el-col>
    <el-col :span="11" class="borderStyle">
      <div class="titleStyle">
        <span>修改密码</span>
      </div>
      <el-form :model="password" status-icon :rules="password_rules" ref="passwordRule" label-width="100px"
               class="demo-ruleForm">
        <el-form-item label="原密码" prop="username">
          <el-input type="text" v-model="password.oldPwd" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="新密码" prop="password">
          <el-input type="text" v-model="password.newPwd" autocomplete="off"></el-input>
        </el-form-item>

        <div class="loginbutton">
          <el-button type="primary" @click="submitPwd('passwordRule')">确认修改</el-button>
        </div>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    name: "system",
    data() {
      return {
        password: {
          oldPwd: '',
          newPwd: '',
        },
        user: {
          user_name: '',
          user_nickname: ''
        },
        user_rules: {},
        password_rules: {},
      };
    },
    methods: {
      submitUser(a) {
        this.$refs[a].validate((valid) => {
          if (valid) {
            try {
              let para = new URLSearchParams();
              para.append('loginUserName', this.user.user_name);
              para.append('nickName', this.user.user_nickname);
              this.$post('blog_back/admin/profile/name', para)
                .then((response) => {
                  alert("修改用户名称成功")
                })
            } catch (error) {
              console.log("修改用户名称错误:" + error)
            }
          } else {
            console.log('修改用户名称异常');
            return false;
          }
        });
      },
      submitPwd(a) {
        this.$refs[a].validate((valid) => {
          if (valid) {
            try {
              let para = new URLSearchParams();
              para.append('originalPassword', this.password.oldPwd);
              para.append('newPassword', this.password.newPwd);
              this.$post('blog_back/admin/profile/password', para)
                .then((response) => {
                  //进行请求修改
                  alert("修改密码成功")
                })
            } catch (error) {
              console.log("修改密码失败:" + error)
            }
          } else {
            console.log('修改密码失败异常');
            return false;
          }
        });
      },
    }
  }
</script>

<style scoped>
  .borderStyle {
    border: 1px solid #A9A9A9;
    margin-left: 30px;
  }

  span {
    font-weight: bold;
    font-size: 20px;
    margin: 0 auto;
  }

  .loginbutton {
    width: 70px;
    margin: 0 auto;
  }

  .titleStyle {
    width: 100px;
    margin: 0 auto;
    margin-top: 20px;
  }

  .el-form {
    margin-top: 20px;
  }
</style>
