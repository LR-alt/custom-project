<!-- 测试版 -->
<template>
  <div class="check-detail">
    <el-table
      :data="tableData"
      :cell-class-name="setCellStyle"
      :show-header="false"
      :span-method="spanMethod"
      size="small"
      style="width: 100%"
      border
    >   
      <el-table-column
        v-for="item in columns"
        :key="item.prop"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
        v-slot="{ row, $index }"
      >
        <slot :name="item.prop" :row="row" :prop="item.prop" :index="$index">
          <span>{{ row[item.prop] }}</span>
        </slot>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'checkDetail',
  props: {
    columns: {
      type: Array,
      default: () => [],
      required: true,
    },
    tableData: {
      type: Array,
      default: () => [],
      required: true,
    },
    cellStyle: {
      type: [Array, Function],
      default: () => {
        return ({ columnIndex }) => {
          if (columnIndex % 2 === 0) {
            return 'check-detail__defaultTitle';
          }
        }
      },
    },
    spanMerge: {
      type: [Array, Function],
      default: () => {},
    },
  },
  methods: {
    getExtremum (tarArr) {
      return [Math.min(...tarArr), Math.max(...tarArr)];
    },
    isRange(tarInx, inxArr) {
      const getValue = (tarArr) => {
        const [min, max] = this.getExtremum(tarArr);
        return tarInx >= min && tarInx <= max;
      };
      // 若为二维数组时
      if (inxArr.some((item) => Array.isArray(item))) {
        return inxArr.some((item) =>
          isNaN(item) ? getValue(item) : tarInx === item
        );
      }
      return getValue(inxArr);
    },
    // 设置合并样式
    setCellStyle({ rowIndex, columnIndex }) {
      rowIndex, columnIndex 
     /*  if (columnIndex === 0) {
        return 'check-detail__defaultTitle';
      }
      if (columnIndex === 1 && this.isRange(rowIndex, [4, 7])) {
        return 'check-detail__defaultTitle';
      } */
    },
    // 单元格合并函数
    spanMethod({ rowIndex, columnIndex }) {
      rowIndex, columnIndex 
     /*  if ((this.isRange(rowIndex, [0, 3]) || rowIndex === 8)) {
        if (columnIndex === 1) {
          return [1, 0];
        } else if (columnIndex === 2) {
          return [1, 2];
        }
      } */
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
/deep/ .check-detail__defaultTitle {
  font-size: 13px;
  font-weight: bold;
  background-color: #f5f7fa;
}

</style>
