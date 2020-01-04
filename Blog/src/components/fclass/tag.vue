<template>
  <div class="list">
    <div>
      <el-button @click="dialogAddVisible = true" type="success" icon="el-icon-plus">新增</el-button>
      <el-button @click="dialogEditVisible =true" type="primary" icon="el-icon-edit">修改</el-button>
      <el-button @click="dialogDeleteVisible = true" type="danger" icon="el-icon-delete">删除</el-button>
      <el-input v-model="searchTableInfo" placeholder="请输入搜索关键字" style="width: 160px;margin-left: 160px">
      </el-input>
      <el-button type="success" @click="updateData">搜索</el-button>
    </div>
    <div class="tab">
      <el-table
        :data="tableData"
        @selection-change="selectionRowsChange"
        style="width: 100%">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="tagId"
          label="标签Id"
          align='center'
          width="300">
        </el-table-column>
        <el-table-column
          prop="tagName"
          label="标签名称"
          align='center'
          width="300">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="添加时间"
          align='center'
          width="300">
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
    <el-dialog title="友链添加" :visible.sync="dialogAddVisible">
      <el-form :model="form">
        <el-form-item label="友链类型" :label-width="formLabelWidth">
          <el-select v-model="form.web_type" placeholder="请选择友链类型">
            <el-option label="友链" value="1"></el-option>
            <el-option label="推荐网站" value="2"></el-option>
            <el-option label="个人链接" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="网站名称" :label-width="formLabelWidth">
          <el-input v-model="form.web_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="网站链接" :label-width="formLabelWidth">
          <el-input v-model="form.web_url" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="网站描述" :label-width="formLabelWidth">
          <el-input v-model="form.web_describe" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="排序值" :label-width="formLabelWidth">
          <el-input v-model="form.web_sortValue" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddVisible = false">取 消</el-button>
        <el-button type="primary" @click="addFunc">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="友链修改" :visible.sync="dialogEditVisible">
      <el-form :model="form">
        <el-form-item label="友链类型" :label-width="formLabelWidth">
          <el-select v-model="form.web_type" placeholder="请选择友链类型">
            <el-option label="友链" value="1"></el-option>
            <el-option label="推荐网站" value="2"></el-option>
            <el-option label="个人链接" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="网站名称" :label-width="formLabelWidth">
          <el-input v-model="form.web_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="网站链接" :label-width="formLabelWidth">
          <el-input v-model="form.web_url" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="网站描述" :label-width="formLabelWidth">
          <el-input v-model="form.web_describe" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="排序值" :label-width="formLabelWidth">
          <el-input v-model="form.web_sortValue" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEditVisible = false">取 消</el-button>
        <el-button type="primary" @click="editFunc">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="友链删除"
      :visible.sync="dialogDeleteVisible"
      width="30%">
      <span>你确定要删除这些友链信息吗?</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogDeleteVisible = false">取 消</el-button>
    <el-button type="primary" @click="deleteFunc">确 定</el-button>
  </span>
    </el-dialog>
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
        allTableData: [],
        multipleSelection: [],
        dialogAddVisible: false,
        dialogEditVisible: false,
        dialogDeleteVisible: false,
        form: {
          web_type: '',
          web_name: '',
          web_url: '',
          web_describe: '',
          web_sortValue: 0,
        },
        formLabelWidth: '120px'
      }
    },
    methods: {
      updateData() {
        let param = {'page': 1, 'limit': 10, 'keyword': this.searchTableInfo}
        this.axio.get('/blog_back/admin/tags/list', {
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
      selectionRowsChange(val) {
        this.multipleSelection = val;
        console.log("总长度为: "+this.multipleSelection.length)
        if (this.multipleSelection.length > 0) {
          for (var i = 0; i < this.multipleSelection.length; i++) {
            console.log(i + "  ,值" + this.multipleSelection[i].id)
          }
        }
      },
      addFunc() {
        this.dialogAddVisible = false;
      },
      editFunc() {
        this.dialogEditVisible = false;
      },
      deleteFunc() {
        this.dialogDeleteVisible = false;
      }
    },
    created() {
      this.updateData()
    }
  }
</script>

<style scoped>
  @import "../../assets/css/common.css";
</style>
