<!-- 查看详情 -->
<script>
export default {
  name: "check-detail-last",
  props: {
    columns: { // 表格字段名数据
      type: Array,
      default: () => [],
      required: true,
    },
    detail: { // 数据
      type: Object,
      default: () => ({}),
    },
    baseGrids: { // 表格的栅格数
      type: Number,
      default: 8,
    },
    isRequired: { // 表单存在必填
      type: Boolean,
      default: true,
    },
    hideAfter: { // 校验提示自动隐藏的延时
      type: Number,
      default: 4000,
    }
  },
  data() {
    return {
      
    };
  },
  directives: {
    hidden: {
      bind(el, binding) {
        let timer = setTimeout(() => {
          el.style.display = "none";
          clearTimeout(timer);
          timer = null;
        }, binding.value);
      },
    },
  },
  methods: {
    createTds(item, { cols, rows }) {
      const { label, prop, rowspan, colspan, rules } = item;
      const result = [];
      if (label) {
        result.push(
          <td class="tb_th" rowspan={rowspan || rows || 1} colspan={1}>
            <div class={`cell ${this.isRequired && rules ? "isRequired" : ""}`}>
              {this.$slots[label] || label}
            </div>
          </td>
        );
        if (cols) cols--;
      }
      if (prop) {
        const curColspan = colspan || cols || 1;
        result.push(
          <td class="tb_td" rowspan={rowspan} colspan={curColspan}>
            {this.getFormItem(
              item,
              <div class="cell">
                {this.$slots[prop] || this.detail[prop]}
              </div>
            )}
          </td>
        );
      }
      return result ?? (result.length === 1 ? result[0] : result);
    },
    toFlat(item, grids = this.baseGrids) {
      const result = [];
      const label = item.label;
      let count = 0;

      if (label) grids--;

      for (const subItem of this.getFullChild(item.children)) {
        const { prop, children } = subItem;
        if (prop) {
          count++;
          result.push(this.createTds(subItem, { cols: grids }));
        } else if (children) {
          const { result: subTds, count: subCount } = this.toFlat(
            subItem,
            grids
          );
          count += subCount;
          result.push(...subTds);
        } else {
          result.push(null);
        }
      }

      if (label && result?.length) {
        result[0].unshift(this.createTds(item, { rows: count }));
      }

      return { result, count };
    },
    mergeTds(groupTds) {
      const maxRow = Math.max(...groupTds.map((items) => items.length));
      const newGroupTds = [];

      for (let i = 0; i < maxRow; i++) {
        const rowTds = groupTds
          .map((item) => item[i])
          .filter(Boolean)
          .flat();
        newGroupTds.push(rowTds);
      }
      return newGroupTds;
    },
    getFullChild(children) {
      return children.reduce((pre, cur) => {
        if (cur.prop && cur.rowspan) {
          return pre.concat(cur, ...new Array(cur.rowspan - 1).fill({}));
        }
        return pre.concat(cur);
      }, []);
    },
    // 自动计算栅格
    getAverageGrids(total, items) {
      let piece = items.length;
      const emptyIndexes = [];
      const baseGrids = [];
      items.forEach((item, index) => {
        if (item.colspan) {
          piece--;
          total = total - item.colspan - 1;
        } else {
          emptyIndexes.push(index);
        }
        baseGrids.push(item.colspan);
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
    getForm(content) {
      if (this.isRequired) {
        return (
          <el-form
            ref="formRef"
            props={{
              model: this.detail,
              size: "small",
            }}
          >
            {content}
          </el-form>
        );
      }
      return content;
    },
    getFormItem(item, content) {
      const { prop, rules } = item;
      if (this.isRequired && rules) {
        return (
          <el-form-item
            prop={prop}
            rules={rules}
            scopedSlots={{
              error: ({ error }) => (
                <span
                  class="custom-error"
                  {...{ directives: [{ name: "hidden", value: this.hideAfter }] }}
                >
                  {error}
                </span>
              ),
            }}
          >
            {content}
          </el-form-item>
        );
      }
      return content;
    },
    getFormRef() {
      return this.$refs.formRef;
    },
  },
  render() {
    return this.getForm(
      <div class="check-detail">
        <table
          class="detail"
          border="0"
          cellspacing="0"
          cellpadding="0"
          width="100%"
        >
          {this.columns.map((items, index) => {
            const isNest = items.some((item) => item.children?.length);
            // 是否为嵌套类型
            if (isNest) {
              let maxRowspan = 0;
              const groupTds = items.map((item) => {
                if (!item.rowspan && maxRowspan) {
                  item.rowspan = maxRowspan;
                }
                const { result, count } = this.toFlat(item, item.grids);
                if (count > maxRowspan) {
                  maxRowspan = count;
                }
                return result;
              });
              return this.mergeTds(groupTds).map((tds, inx) => (
                <tr key={`${index}${inx}`}>{tds}</tr>
              ));
            }
            const averageGrids = this.getAverageGrids(this.baseGrids, items);
            return (
              <tr key={index}>
                {items
                  .map((it, i) => this.createTds(it, { cols: averageGrids[i] }))
                  .flat()}
              </tr>
            );
          })}
        </table>
      </div>
    );
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
      border-right: 1px solid #dedede;
      border-bottom: 1px solid #dedede;
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
    .isRequired {
      &::before {
        content: "*";
        margin-right: 4px;
        color: red;
      }
    }
    .el-form-item {
      margin: 0;
      .custom-error {
        position: absolute;
        right: 10px;
        top: -26px;
        padding: 0 6px;
        height: 20px;
        line-height: 20px;
        border-radius: 2px;
        font-size: 12px;
        color: #fff;
        background-color: #f56c6c;
        &::before {
          content: "";
          position: absolute;
          margin-top: -5px;
          width: 10px;
          height: 8px;
          right: 50%;
          bottom: -3px;
          transform: translateX(50%) rotate(45deg);
          background-color: #f56c6c;
        }
      }
    }
  }
}
</style>
