<template>
  <div class="check-detail">
    <table
      class="detail"
      border="0"
      cellspacing="0"
      cellpadding="0"
      width="100%"
    >
      <tr v-for="(items, index) in newColumns" :key="index">
        <template v-for="(item, inx) in items">
          <td
            v-if="item.label"
            class="tb_th"
            :rowspan="item.rowspan"
            colspan="1"
            :key="`${index}-${inx}-label`"
          >
            <div class="cell">
              <slot :name="item.label">{{ item.label }}</slot>
            </div>
          </td>
          <td
            v-if="item.prop"
            class="tb_td"
            :rowspan="item.rowspan"
            :colspan="item.colspan"
            :key="`${index}-${inx}-prop`"
          >
            <div class="cell">
              <slot :name="item.prop">{{ detail[item.prop] }}</slot>
            </div>
          </td>
        </template>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "check-detail-last",
  props: {
    columns: {
      type: Array,
      default: () => [],
      required: true,
    },
    detail: {
      type: Object,
      default: () => ({}),
    },
    baseGrids: {
      type: Number,
      default: 8,
    },
  },
  data() {
    return {
      newColumns: [],
    };
  },
  created() {
    this.newColumns = this.formatColumns(this.columns);
  },
  methods: {
    formatColumns(columns) {
      const result = [];
      for (const items of columns) {
        const isNest = items.some((it) => it.children?.length);
        if (isNest) {
          const tds = items.map((item) => this.toFlat(item, item.grids));
          result.push(...this.mergeItems(tds));
        } else {
          const averageGrids = this.getAverageGrids(this.baseGrids, items);
          result.push(
            items.map((item, inx) => {
              const curGrid = averageGrids[inx];
              return {
                ...item,
                colspan: item.colspan || (item.label ? curGrid - 1 : curGrid),
              };
            })
          );
        }
      }
      return result;
    },
    toFlat(item, grids = this.baseGrids) {
      const result = [];
      const { label, children, rowspan } = item;
      let preLabel = null;

      if (label) {
        preLabel = {
          label,
          rowspan: rowspan || this.getMaxRows(children),
        };
        grids--;
      }

      for (const subItem of this.getFullChild(item.children)) {
        const { prop, label, children } = subItem;
        if (prop) {
          const tds = [];
          if (preLabel) {
            tds.push(preLabel);
            preLabel = null;
          }
          tds.push({ ...subItem, colspan: label ? grids - 1 : grids });
          result.push(tds);
        } else if (children) {
          result.push(...this.toFlat(subItem, grids));
        } else {
          result.push(null);
        }
      }
      return result;
    },
    mergeItems(foldTds) {
      const maxRow = Math.max(...foldTds.map((item) => item.length));
      const groupTds = [];

      for (let i = 0; i < maxRow; i++) {
        const rowTds = foldTds
          .map((item) => item[i])
          .filter(Boolean)
          .flat();
        groupTds.push(rowTds);
      }
      return groupTds;
    },
    // 自动计算栅格
    getAverageGrids(total, items) {
      let piece = items.length;
      const emptyIndexes = [];
      const baseGrids = items.map((item, index) => {
        if (item.colspan) {
          piece--;
          total = total - item.colspan - 1;
        } else {
          emptyIndexes.push(index);
        }
        return item.colspan;
      });
      if (piece > 0) {
        const unit = Math.floor(total / piece);
        const restNumbers = total % piece;
        for (let i = 0; i < piece; i++) {
          let curUnit = unit;
          if (i < restNumbers) {
            curUnit++;
          }
          const curEmptyInx = emptyIndexes[emptyIndexes.length - i - 1];
          baseGrids[curEmptyInx] = curUnit;
        }
      }
      return baseGrids;
    },
    getFullChild(children) {
      return children.reduce((pre, cur) => {
        if (cur.prop && cur.rowspan) {
          return pre.concat(cur, ...new Array(cur.rowspan - 1).fill({}));
        }
        return pre.concat(cur);
      }, []);
    },
    getMaxRows(srcList = [], account = 0) {
      for (const item of srcList) {
        account++;
        if (item.children?.length) {
          return this.getMaxRows(item.children, account);
        }
      }
      return account;
    },
  },
};
</script>

<style lang="less" scoped>
.check-detail {
  border: 1px solid #ebeef5;
  .detail {
    table-layout: fixed;
    .tb_th,
    .tb_td {
      padding: 8px 0;
      font-size: 14px;
      border-right: 1px solid #ebeef5;
      border-bottom: 1px solid #ebeef5;
    }
    .tb_th {
      font-weight: bold;
      color: #606266;
      background-color: #f5f7fa;
    }
    .cell {
      padding-right: 10px;
      padding-left: 10px;
      line-height: 23px;
      min-height: 23px;
      text-overflow: ellipsis;
      white-space: normal;
      word-break: break-all;
      overflow: hidden;
      box-sizing: border-box;
    }
  }
}
</style>