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
    setCellStyle({ row, column, rowIndex, columnIndex }) {
      if (typeof this.cellStyle === 'function') {
        return this.cellStyle({ row, column, rowIndex, columnIndex });
      }
      for (const cell of this.cellStyle) {
        if (
          this.isRange(columnIndex, cell.xRange) &&
          this.isRange(rowIndex, cell.yRange)
        ) {
          return cell.clsName;
        }
      }
    },
    // 单元格合并函数
    spanMethod({ row, column, rowIndex, columnIndex }) {
      if (typeof this.spanMerge === 'function') {
        return this.spanMerge({ row, column, rowIndex, columnIndex });
      }
      for (const { xRange, yRange, type } of this.spanMerge) {
        if (
          this.isRange(columnIndex, xRange) &&
          this.isRange(rowIndex, yRange)
        ) {
          const [xStart, xEnd] = this.getExtremum(xRange);
          const [yStart, yEnd] = this.getExtremum(yRange);
          if (type === 'row') {
            return [rowIndex === yStart ? yEnd - yStart + 1 : 0, 1];
          } else if (type === 'col') {
            if (xStart === xEnd) {
              return [1, 0];
            }
            return [1, columnIndex === xStart ? xEnd - xStart + 1 : 0];
          } else {
            return [
              rowIndex === yStart ? yEnd - yStart + 1 : 0,
              columnIndex === xStart ? xEnd - xStart + 1 : 0,
            ];
          }
        }
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.check-detail {
/deep/ .check-detail__defaultTitle {
  font-size: 13px;
  font-weight: bold;
  background-color: #f5f7fa;
}
}
</style>
