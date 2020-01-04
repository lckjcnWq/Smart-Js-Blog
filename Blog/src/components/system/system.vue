<template>
  <el-row :gutter="20" style="margin-left: 0px">
    <el-col :span="7" class="borderStyle">
      <div class="titleStyle">
        <span>个人信息</span>
      </div>
      <el-form :model="user" status-icon :rules="user_rules" ref="userRule" label-width="100px" class="demo-ruleForm">
        <el-form-item label="个人头像" prop="username">
          <el-input type="text" v-model="user.user_avator" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="个人名称" prop="password">
          <el-input type="text" v-model="user.user_name" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="个人邮箱" prop="password">
          <el-input type="text" v-model="user.user_mail" autocomplete="off"></el-input>
        </el-form-item>

        <div class="loginbutton">
          <el-button type="primary" @click="submitUser('userRule')">确认修改</el-button>
        </div>
      </el-form>
    </el-col>
    <el-col :span="7" class="borderStyle">
      <div class="titleStyle">
        <span>站点信息</span>
      </div>
      <el-form :model="siteName" status-icon :rules="site_rules" ref="siteRule" label-width="100px"
               class="demo-ruleForm">
        <el-form-item label="站点名称" prop="username">
          <el-input type="text" v-model="siteName.site_name" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="站点描述" prop="password">
          <el-input type="text" v-model="siteName.site_describe" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="站点Logo" prop="password">
          <el-input type="text" v-model="siteName.site_logo" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="favicon ico" prop="password">
          <el-input type="text" v-model="siteName.site_ico" autocomplete="off"></el-input>
        </el-form-item>

        <div class="loginbutton">
          <el-button type="primary" @click="submitSite('siteRule')">确认修改</el-button>
        </div>
      </el-form>
    </el-col>
    <el-col :span="7" class="borderStyle">
      <div class="titleStyle">
        <span>底部信息</span>
      </div>
      <el-form :model="bottomSite" status-icon :rules="bottomSite_rules" ref="bottomRule" label-width="100px"
               class="demo-ruleForm">
        <el-form-item label="About" prop="username">
          <el-input type="text" v-model="bottomSite.bottom_about" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="备案号" prop="password">
          <el-input type="text" v-model="bottomSite.bottom_ba" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="Copy Right" prop="password">
          <el-input type="text" v-model="bottomSite.bottom_cr" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="Powered By" prop="password">
          <el-input type="text" v-model="bottomSite.bottom_pb" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="Powered By URL" prop="password">
          <el-input type="text" v-model="bottomSite.bottom_pbu" autocomplete="off"></el-input>
        </el-form-item>

        <div class="loginbutton">
          <el-button type="primary" @click="submitBottom('bottomRule')">确认修改</el-button>
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
        //登录表单的数据
        siteName: {
          site_name: '',
          site_describe: '',
          site_logo: '',
          site_ico: '',
        },
        user: {
          user_avator: '',
          user_name: '',
          user_mail: ''
        },
        bottomSite: {
          bottom_about: '',
          bottom_ba: '',
          bottom_cr: '',
          bottom_pb: '',
          bottom_pbu: ''
        },
        //验证数据
        site_rules: {
          site_name: [
            {required: true, message: '站点名称', trigger: 'blur'},//非空验证
            {min: 5, max: 18, message: '长度在 5 到 18 个字符', trigger: 'blur'} //长度验证
          ],
          site_describe: [
            {required: true, message: '站点描述', trigger: 'blur'},
            {min: 5, max: 18, message: '长度在 5 到 18 个字符', trigger: 'blur'}
          ],
        },
        user_rules: {},
        bottomSite_rules: {}
      };
    },
    methods: {
      submitSite(a) {
        this.$refs[a].validate((valid) => {
          if (valid) {
            try {
              let para = new URLSearchParams();
              para.append('websiteName', this.siteName.sitename);
              para.append('websiteDescription', this.siteName.sitedescribe);
              para.append('websiteLogo', this.siteName.sitelogo);
              para.append('websiteIcon', this.siteName.siteico);
              this.$post('blog_back/admin/configurations/website', para)
                .then((response) => {
                  //进行请求修改
                  alert("站点配置成功")
                })
            } catch (error) {
              console.log("站点配置失败:" + error)
            }
          } else {
            console.log('站点配置异常');
            return false;
          }
        });
      },
      submitUser(a) {
        this.$refs[a].validate((valid) => {
          if (valid) {
            try {
              let para = new URLSearchParams();
              para.append('yourAvatar', this.user.user_avator);
              para.append('yourName', this.user.user_name);
              para.append('yourEmail', this.user.user_mail);
              this.$post('/blog_back/admin/configurations/userInfo', para)
                .then((response) => {
                  //进行请求修改
                  alert("个人信息配置成功")
                })
            } catch (error) {
              console.log("个人信息配置失败:" + error)
            }
          } else {
            console.log('个人信息配置异常');
            return false;
          }
        });
      },
      submitBottom(a) {
        this.$refs[a].validate((valid) => {
          if (valid) {
            try {
              let para = new URLSearchParams();
              para.append('footerAbout', this.bottomSite.bottom_about);
              para.append('footerICP', this.bottomSite.bottom_ba);
              para.append('footerCopyRight', this.bottomSite.bottom_cr);
              para.append('footerPoweredBy', this.bottomSite.bottom_pb);
              para.append('footerPoweredByURL', this.bottomSite.bottom_pbu);
              this.$post('admin/configurations/footer', para)
                .then((response) => {
                  //进行请求修改
                  alert("底部配置成功")
                })
            } catch (error) {
              console.log("底部配置失败:" + error)
            }
          } else {
            console.log('底部配置异常');
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
  span{
    font-weight: bold;
    font-size: 20px;
    margin: 0 auto;
  }
  .loginbutton{
    width: 70px;
    margin: 0 auto;
  }
  .titleStyle{
    width: 100px;
    margin: 0 auto;
    margin-top: 20px;
  }
  .el-form{
    margin-top: 20px;
  }
</style>
