<template>
  <div class="index">
    <div class="header" style="background-color:rgb(21, 26, 34);">
      <div class="top_left">
        <img class="top_img" src="../assets/img/icon.jpg" height="40">
        <span class="top_title">JSON--个人博客</span>
      </div>
      <div class="top_right">
        <a href="https://www.baidu.com" class="el-icon-position">博客首页</a>
      </div>
    </div>
    <div style="margin-top: 43px;">
      <el-container style="height: 500px; border: 1px solid #eee">
        <el-aside width="200px" style="background-color: rgb(84, 92, 100)">
          <el-menu :default-openeds="open_list" default-active="relblog"  router background-color="#545c64" text-color="#fff"
                   active-text-color="#1E90FF">
            <el-submenu index="1">
              <template slot="title"><i class="el-icon-edit"></i>DashBoard</template>
              <el-menu-item index="relblog">编辑博客</el-menu-item>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title"><i class="el-icon-menu"></i>分类管理</template>
              <el-menu-item index="blog">博客管理</el-menu-item>
              <el-menu-item index="comment">评论管理</el-menu-item>
              <el-menu-item index="fclass">分类管理</el-menu-item>
              <el-menu-item index="tag">标签管理</el-menu-item>
              <el-menu-item index="friend">友情管理</el-menu-item>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title"><i class="el-icon-setting"></i>设置管理</template>
              <el-menu-item index="system">系统修改</el-menu-item>
              <el-menu-item index="password">密码修改</el-menu-item>
              <el-menu-item index="out">安全退出</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>

        <el-container>
          <el-main>
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: 'JSON',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        open_list: ["1"]
      }
    }
  };
</script>

<style scoped>
  .header {
    height: 43px;
    width: 100%;
    z-index: 2;
    line-height: 43px;
    position: fixed;
    top: 0;
    left: 0;
  }

  .top_left {
    display: inline-block;
  }

  .top_img {
    vertical-align: middle;
  }

  .top_title {
    display: inline-block;
    color: white;
    font-weight: bolder;
    /*margin-top: 20px;*/
    height: 100%;
    line-height: 43px;
  }

  .top_right {
    float: right;
  }

  a {
    font-weight: bold;
    color: #409eff;
    font-size: 16px;
    margin-top: 14px;
    margin-right: 30px;
  }

  html, body {
    margin: 0;
    padding: 0;
  }

  html, body, #app, .index, .el-aside {
    height: 100%;
  }

  .index {
    width: 100%;
  }

  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #ccc;
  }

  .el-container {
    height: 100% !important;
  }

</style>
