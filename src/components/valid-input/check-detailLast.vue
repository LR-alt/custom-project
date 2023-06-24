<!--
尚未解决的问题
1.树形结构的的栅格自动占位计算
2.colspan 和 groups的统一问题
3.树形结构行自动适配
-->
<script>
export default {
    name: 'check-detail-last',
    props: {
        columns: {
            type: Array,
            default: () => [],
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
            maxRows: 4,
        };
    },
    methods: {
        createTds({ label, prop, rowspan, colspan }, cols) {
            const result = [];
            if (label) {
                result.push(
                    <td class="tb_th" rowspan={rowspan} colspan={1}>
                        <div class="cell">
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
                        <div class="cell">
                            {this.$scopedSlots[prop]?.() || this.detail[prop]}
                        </div>
                    </td>
                );
            }
            return result ? (result.length === 1 ? result[0] : result) : null;
        },
        toFlat(item, span = this.baseGrids) {
            const result = [];
            let preLabel = null;
            const { label, children, rowspan } = item;
            if (label) {
                preLabel = (
                    <td
                        class="tb_th"
                        rowspan={rowspan || this.getMaxRows(children)}
                        colspan={1}
                    >
                        <div class="cell">
                            {this.$scopedSlots[label]?.() || label}
                        </div>
                    </td>
                );
                span--;
            }

            for (const subItem of this.getFullChild(item.children)) {
                const { prop, children } = subItem;
                if (prop) {
                    const tds = [];
                    if (preLabel) {
                        tds.push(preLabel);
                        preLabel = null;
                    }
                    const subTds = this.createTds(subItem, span);
                    result.push(tds.concat(subTds));
                } else if (children) {
                    result.push(...this.toFlat(subItem, span));
                } else {
                    result.push(null);
                }
            }
            return result;
        },
        mergeTds(foldTds) {
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
        getMaxRows(srcList = [], account = 0) {
            for (const item of srcList) {
                account++;
                if (item.children?.length) {
                    return this.getMaxRows(item.children, account);
                }
            }
            return account;
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
    },
    render() {
        return (
            <div class="check-detail">
                <table class="detail" border="0" cellspacing="0" cellpadding="0" width="100%">
                    {this.columns.map((items, index) => {
                        const isNest = items.some((item) => item.children?.length);
                        if (isNest) {
                            const tds = items.map((item) => this.toFlat(item, item.span));
                            return this.mergeTds(tds).map((tds, inx) => <tr key={`${index}${inx}`}>{tds}</tr>);
                        }
                        const averageGrids = this.getAverageGrids(this.baseGrids, items);
                        return (
                            <tr key={index}>
                                {items.map((it, i) => this.createTds(it, averageGrids[i])).flat()}
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
            border-right: 1px solid #ebeef5;
            border-bottom: 1px solid #ebeef5;
        }
        .tb_th {
            font-size: 14px;
            font-weight: bold;
            color: #606266;
            background-color: #f5f7fa;
        }
        .tb_td {
            font-size: 14px;
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
