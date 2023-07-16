<!-- 查看详情 -->
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
    isRequired: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      maxRows: 4,
    };
  },
  directives: {
    hidden: {
      inserted(el) {
        let timer = setTimeout(() => {
          el.style.display = "none";
          clearTimeout(timer);
          timer = null;
        }, 4000);
      },
    },
  },
  methods: {
    createTds(item, cols) {
      const { label, prop, rowspan, colspan, required } = item;
      const result = [];
      if (label) {
        result.push(
          <td class="tb_th" rowspan={rowspan} colspan={1}>
            <div class={`cell ${required ? "isRequired" : ""}`}>
              {this.$scopedSlots[label]?.() || label}
            </div>
          </td>
        );
        cols--;
      }
      if (prop) {
        const curColspan = colspan || cols;
        result.push(
          <td class="tb_td" rowspan={rowspan} colspan={curColspan}>
            {this.setFormItem(
              item,
              <div class="cell">
                {this.$scopedSlots[prop]?.() || this.detail[prop]}
              </div>
            )}
          </td>
        );
      }
      return result ?? (result.length === 1 ? result[0] : result);
    },
    toFlat(item, grids = this.baseGrids, autoRows) {
      const result = [];
      const label = item.label;
      let preLabel = null;

      if (label) {
        preLabel = (
          <td
            class="tb_th"
            rowspan={item.rowspan || autoRows[label]}
            colspan={1}
          >
            <div class="cell">{this.$scopedSlots[label]?.() || label}</div>
          </td>
        );
        grids--;
      }
      for (const subItem of this.getFullChild(item.children)) {
        const { prop, children } = subItem;
        if (prop) {
          const tds = [];
          if (preLabel) {
            tds.push(preLabel);
            preLabel = null;
          }
          const subTds = this.createTds(subItem, grids);
          result.push(tds.concat(subTds));
        } else if (children) {
          result.push(...this.toFlat(subItem, grids, autoRows));
        } else {
          result.push(null);
        }
      }
      console.log(result);
      return result;
    },
    mergeTds(groupTds) {
      const maxRow = Math.max(...groupTds.map((item) => item.length));
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
    getMaxRows(curNode, counts = {}) {
      let account = 0;
      for (const item of curNode.children) {
        if (item.children?.length) {
          account += this.getMaxRows(item, counts).account;
        } else {
          account++;
        }
      }
      counts[curNode.label] = account;
      return {
        account,
        counts,
      };
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
    setForm(content) {
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
    setFormItem(item, content) {
      const { prop, required, customTip } = item;
      if (required) {
        let rules;
        if (Object.prototype.toString.call(customTip) === "[object Object]") {
          rules = [customTip];
        } else if (Array.isArray(customTip)) {
          rules = customTip;
        } else if (typeof customTip === "string") {
          rules = [{ required: true, message: customTip }];
        } else {
          rules = [{ required: true, message: "必填" }];
        }
        return (
          <el-form-item
            prop={prop}
            rules={rules}
            scopedSlots={{
              error: ({ error }) => (
                <span
                  class="custom-error"
                  {...{ directives: [{ name: "hidden" }] }}
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
    return this.setForm(
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
                const { account, counts } = this.getMaxRows(item);
                if (account > maxRowspan) {
                  maxRowspan = account;
                } else {
                  item.rowspan = maxRowspan;
                }
                return this.toFlat(item, item.grids, counts);
              });
              return this.mergeTds(groupTds).map((tds, inx) => (
                <tr key={`${index}${inx}`}>{tds}</tr>
              ));
            }
            const averageGrids = this.getAverageGrids(this.baseGrids, items);
            return (
              <tr key={index}>
                {items
                  .map((it, i) => this.createTds(it, averageGrids[i]))
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
