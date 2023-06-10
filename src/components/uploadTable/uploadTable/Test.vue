<template>
  <div class="attachment">
    <AttachmentInfo
      :uploadUrl="uploadUrl"
      :tableData="tableData"
      :showColumns="showColumns"
      :customRules="[]"
      :exclude="[]"
      :selectChange="selectChange"
      :uploadStateFns="uploadStateFns"
      :propMap="propMap"
      :cellClick="cellClick"
      :createRowState="createRowState"
      :requiredProps="requiredProps"
      :edit="edit"
      isEditTable
    >
      <!-- <template #fl_def>
        <el-dropdown>
          <span class="el-dropdown-link"> 
            上传附件<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>黄金糕</el-dropdown-item>
            <el-dropdown-item>狮子头</el-dropdown-item>
            <el-dropdown-item>螺蛳粉</el-dropdown-item>
            <el-dropdown-item disabled>双皮奶</el-dropdown-item>
            <el-dropdown-item divided>
              <div>
                <p>
                  <span slot="upload">双皮奶</span>
                </p>
              </div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </template>-->
      <template #fl_def>
        <el-button slot="upload">上传附件</el-button>
      </template>

      <template #tb_size="{ row, index }">
        <span v-if="!getRowState(row).size.edit">{{ row.size }}</span>
        <el-form-item v-else :prop="`${index}.size`" :rules="getRule">
          <el-input v-model="row.size"></el-input>
        </el-form-item>
      </template>

      <template #tb_status="{ row, item }">
        <span>{{ item.prop }}:{{ row.status }}</span>
      </template>
      <template #tb_op="{ row, index }">
        <el-button slot="upload" icon="el-icon-upload"></el-button>
        <el-button icon="el-icon-delete" @click="deleteData(index, row.uid)"></el-button>
        <el-button icon="el-icon-edit" @click="deleteData(index, row.uid)"></el-button>
        <span slot="upload">span</span>
      </template>
    </AttachmentInfo>
    <el-button @click="changeKey">change edit</el-button>
  </div>
</template> 
<script>
// import AttachmentInfo from './Index.vue';
import AttachmentInfo from './UploadTable.vue';
export default {
  name: 'Test',
  components: {
    AttachmentInfo,
  },
  data() {
    const checkRepeatFile = (file, { tableData }) => {
      if (tableData.some(item => item.name === file.name)) {
        return '文件名又又又又重复';
      }
    };
    return {
      tableData: [],
      uploadUrl: 'https://jsonplaceholder.typicode.com/posts/',
      rules: [
        { validator: checkRepeatFile }
      ],
      showColumns: [
        {
          label: '文件名',
          prop: 'name',
          width: '30%',
        },
        {
          label: '文件类型',
          prop: 'fileType',
          width: '30%',
        },
        {
          label: '大小',
          prop: 'size',
          width: '20%',
        },
        {
          label: '状态',
          prop: 'status',
          width: '20%',
        },
      ],
      uploadStateFns: {
        onBefore({ file }) {
          const { uid, name, size, type } = file;
          return {
            uid,
            name,
            fileType: type,
            size,
            status: '上传开始',
          }
        },
        onSuccess({ res, file }) {
          return {
            status: '上传成功!!!',
          }
        },
        onError({ err, file, fileList }) {
          return {
            status: '上传失败'
          }
        },
        onProgress({ event, file, fileList }) {
          return {
            status: '上传中...'
          }
        }
      },
      requiredProps: ['size'],
      propMap: new Map,
      edit: true,
    };
  },
  computed: {
    getRule() {
      return [
        { required: true, message: '必填', trigger: 'blur' },
      ]
    }
  },
  methods: {
    changeKey() {
      this.edit = !this.edit;
      // this.tableData = JSON.parse(JSON.stringify(this.tableData));
    },
    getRowState(row) {
      console.log(row);
      return this.propMap.get(row);
    },
    createRowState(editProps, rowState) {
      editProps.forEach(prop => {
        rowState[prop] = { edit: false }
      })
      return rowState;
    },
    // 
    cellClick(row, { property }) {
      this.getRowState(row)[property].edit = true;
    },
    selectChange(selection) {
      console.log(selection);
    },
    deleteData(index, uid) {
      console.log(uid)
      this.tableData.splice(index, 1);
      // this.fileList = this.fileList.filter(item => item.uid !== id);
    },
  }
}
</script>
