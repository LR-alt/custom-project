<!--
 * @Date: 2022-10-28 10:57:57
 * @LastEditors: 刘荣 liurong@mastercom.cn
 * @LastEditTime: 2022-11-29 16:28:28
 * @FilePath: \common-project\elementui-component\src\components\check-detail-comp\LastTest.vue
-->
<!-- 查看详情组件测试示例 -->
<template>
  <div class="test">
    <checkDetail
      class="test__table"
      :columns="columns"
      :tableData="tableData" 
      >
      <!-- :cellStyle="cellStyleList" -->
      <!-- :spanMerge="spanMerge" -->
      <template #content2="{ row, index }">
        <span v-if="index === 4" v-html="row.content2"></span>
        <span v-else>{{ row.content2 }}</span>
      </template>
    </checkDetail>
  </div>
</template>
<script>
import { columns, tableData } from './testStatic';
import checkDetail from './checkDetail.vue';
export default {
  name: 'TestComp',
  components: {
    checkDetail,
  },
  data() {
    return {
      columns,
      tableData,
      // xRange 与 yRange代表水平和垂直方向的范围，clsName样式类名
    /*   cellStyleList: [
        {
          xRange: [0],
          yRange: [0, 9],
          clsName: 'title required',
        },
        {
          xRange: [1],
          yRange: [5, 8],
          clsName: 'title required',
        },
        {
          xRange: [2],
          yRange: [4],
          clsName: 'custom-text',
        },
      ], */
    };
  },
  methods: {
    /* spanMerge({ row, column, rowIndex, columnIndex }){

    } */
  },
};
</script>

<style lang="less" scoped>
.test {
  margin: 40px 60px;
  &__table {
    /deep/ .title {
      font-size: 13px;
      font-weight: bold;
      background-color: #f5f7fa;
    }
    /deep/ .required .cell::before {
      content: '*';
      color: #f56c6c;
      margin-right: 2px;
    }
    /deep/ .custom-text .cell {
      max-height: 72px;
      overflow-y: auto;
    }
  }
}
</style>
