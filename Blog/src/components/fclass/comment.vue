<template>
  <div class="list">
    <div>
      <el-button type="success" icon="el-icon-plus">新增</el-button>
      <el-button type="primary" icon="el-icon-edit">修改</el-button>
      <el-button type="danger" icon="el-icon-delete">删除</el-button>
      <el-input v-model="searchTableInfo" placeholder="请输入搜索关键字" style="width: 160px;margin-left: 160px">
      </el-input>
      <el-button type="success" @click="updateData">搜索</el-button>
    </div>
    <div class="tab">
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="commentBody"
          label="评论内容"
          align='center'
          width="170">
        </el-table-column>
        <el-table-column
          prop="commentCreateTime"
          label="评论时间"
          align='center'
          width="170">
        </el-table-column>
        <el-table-column
          prop="commentator"
          label="评论人名称"
          align='center'
          width="170">
        </el-table-column>
        <el-table-column
          prop="email"
          label="评论人邮箱"
          align='center'
          width="170">
        </el-table-column>
        <el-table-column
          prop="commentStatus"
          label="状态"
          align='center'
          width="170">
        </el-table-column>
        <el-table-column
          prop="commentBody"
          label="回复内容"
          align='center'
          width="170">
        </el-table-column>
      </el-table>
    </div>
    <div class="page">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="paginations.page_index"
        :page-sizes="paginations.page_sizes"
        :page-size="paginations.page_size"
        :layout="paginations.layout"
        :total="paginations.total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  export default {
    name: "list",
    data() {
      return {
        searchTableInfo: "",
        tableData: [], //数据
        paginations: {
          page_index: 1, //当前页
          total: 0, //总数
          page_size: 4, //一页显示多少
          page_sizes: [4, 8, 16, 32], //每页显示多少条
          layout: 'total, sizes, prev, pager, next, jumper'
        },
        allTableData: []
      }
    },
    methods: {
      updateData() {
        let param = {'page': 1, 'limit': 10, 'keyword': this.searchTableInfo}
        this.axio.get('/admin/blogs/list', {
          params: param
        }).then(res => {

        }).catch(err => {
          console.log(err);
        });
      },
      setPaginations() {
        this.paginations.total = this.allTableData.length; //数据的数量
        this.paginations.page_index = 1; //默认显示第一页
        this.paginations.page_size = 4; //每页显示多少数据

        //显示数据
        this.tableData = this.allTableData.filter((item, index) => {
          return index < this.paginations.page_size;
        })
      },
      handleSizeChange(page_size) {
        this.paginations.page_index = 1; //第一页
        this.paginations.page_size = page_size; //每页先显示多少数据
        this.tableData = this.allTableData.filter((item, index) => {
          return index < page_size
        })
      },
      handleCurrentChange(page) {
        //获取当前页
        let index = this.paginations.page_size * (page - 1);
        //获取总数
        let allData = this.paginations.page_size * page;

        let tablist = [];
        for (let i = index; i < allData; i++) {
          if (this.allTableData[i]) {
            tablist.push(this.allTableData[i])
          }
          this.tableData = tablist
        }
      },
      updateData() {
        let param = {'page': 1, 'limit': 10, 'keyword': this.searchTableInfo}
        this.axio.get('/blog_back/admin/comments/list', {
          params: param
        }).then(res => {
          let lists = res.data.data.list;
          this.allTableData.splice(0, this.allTableData.length);
          if (res.data.resultCode === 200) {
            for (var i = 0; i < lists.length; i++) {
              this.allTableData.push(lists[i]);
            }
          }
          this.setPaginations();
        }).catch(err => {
          console.log(err);
        });
      },
    },
    created() {
      this.updateData()
    }
  }
</script>

<style scoped>
  @import "../../assets/css/common.css";
</style>
