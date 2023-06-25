<template>
  <div class="attachment-table">
    <el-table :key="edit" :data="tableData" @selection-change="selectChange" @cell-click="wrapCellClick">
      <el-table-column v-if="isSelect" type="selection" width="50"></el-table-column>
      <el-table-column
        v-for="item in showColumns"
        :key="`${edit}${item.prop}`"
        :prop="item.prop"
        :label="item.label"
        v-slot="{ row, $index }"
      >
        <slot :name="`tb_${item.prop}`" :row="row" :item="item" :index="$index">
          <span>{{ customPropVal(row, item.prop) }}</span>
        </slot>
      </el-table-column>
      <el-table-column label="操作" v-slot="{ row, $index }">
        <slot name="tb_op" :row="row" :index="$index">
          <el-button type="danger" icon="el-icon-delete" @click="deleteData($index, row.uid)"></el-button>
          <!-- <slot name="tb_uploadBtn" /> -->
        </slot>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "FileTable",
  // inheritAttrs: false,
  data() {
    return {};
  },
  computed: {
    editProps({ requiredProps, optionalProps }) {
      return Array.from(new Set([...requiredProps, ...optionalProps]));
    }
  },
  methods: {
    wrapCellClick(row, column, cell, event) {
      if(!this.editProps.includes(column.property)) return;
      this.cellClick(row, column, cell, event);
    },
    deleteData(index, id) {
      this.tableData.splice(index, 1);
      this.fileList = this.fileList.filter((item) => item.uid !== id);
    },
  },
  props: {
    showColumns: {
      type: Array,
      default: () => [],
      required: true,
    },
    tableData: {
      type: Array,
      default: () => [],
      required: true,
    },
    // 
    customPropVal: {
      type: Function,
      default: (row,prop) => row[prop],
    },
    // 多选 和 单选
    selectChange: {
      type: Function,
      default: () => { },
    },
    isSelect: {
      type: Boolean,
      default: false,
    },
    cellClick: {
      type: Function,
      default: () => { console.log('cellclick') }
    },
    // 外部属性
    fileList: {
      type: Array,
      default: () => [],
    },
    requiredProps: { // 必填属性
      type: Array,
      default: () => [],
    },
    optionalProps: { // 选填属性
      type: Array,
      default: () => [],
    },
    edit: {
      type: Boolean,
      default: false,
    }
  },
};
</script>
