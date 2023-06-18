<script>
import { affairColsLast } from './static';
export default {
    name: 'check-detail-last',
    props: {
        detail: {
            type: Object,
            default: () => ({}),
        },
        baseGrids: {
            type: Number,
            default: 8,
        },
    },
    methods: {
        createTdTag({ label, prop, children, rowspan, colspan }, groups) {
            let labelSpan = 0;
            if (label) {
                labelSpan = 1;
            }
            colspan = colspan || groups - labelSpan;

            if (prop && label) {
                return [
                    <td class="tb_th" rowspan={rowspan} colspan={labelSpan}>
                        <div class="cell">
                            {this.$scopedSlots[label] ? this.$scopedSlots[label]() : label}
                        </div>
                    </td>,
                    <td class="tb_td" rowspan={rowspan} colspan={colspan}>
                        <div class="cell">
                            {this.$scopedSlots[prop]
                                ? this.$scopedSlots[prop]()
                                : this.detail[prop]}
                        </div>
                    </td>,
                ];
            } else if (prop) {
                return [
                    <td class="tb_td" rowspan={rowspan} colspan={colspan}>
                        <div class="cell">
                            {this.$scopedSlots[prop]
                                ? this.$scopedSlots[prop]()
                                : this.detail[prop]}
                        </div>
                    </td>,
                ];
            } else if (label) {
                rowspan = rowspan || this.getChildNumbers(children);
                return (
                    <td class="tb_th" rowspan={rowspan} colspan={labelSpan}>
                        <div class="cell">
                            {this.$scopedSlots[label] ? this.$scopedSlots[label]() : label}
                        </div>
                    </td>
                );
            }
            return null;
        },
        toFlat(item, grids = this.baseGrids) {
            const result = [];
            let preLabel = this.createTdTag(item);
            const childList = this.formatChild(item.children);

            for (const subItem of childList) {
                const { prop, children } = subItem;
                if (prop) {
                    const tds = [];
                    if (preLabel) {
                        tds.push(preLabel);
                        preLabel = null;
                        grids--;
                    }
                    const subTds = this.createTdTag(subItem, grids);
                    result.push(tds.concat(subTds));
                } else if (children) {
                    result.push(...this.toFlat(subItem, grids));
                } else {
                    result.push(null);
                }
            }
            return result;
        },
        toMergeTds(foldTds) {
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
        getChildNumbers(srcList, account = 0) {
            for (const item of srcList) {
                account++;
                if (item.children && item.children.length) {
                    return this.getChildNumbers(item.children, account);
                }
            }
            return account;
        },
        formatChild(children) {
            return children.reduce((pre, cur) => {
                if (cur.prop && cur.rowspan) {
                    return pre.concat(cur, ...new Array(cur.rowspan - 1).fill({}));
                }
                return pre.concat(cur);
            }, []);
        },
    },
    render() {
        return (
            <div class="check-detail">
                <table class="el-table" border="0" cellspacing="0" cellpadding="0" width="100%">
                    {affairColsLast.map((items, index) => {
                        const isFold = items.some((item) => item.children && item.children.length);
                        if (!isFold) {
                            const halfGrids = this.baseGrids / (items.length || 1);
                            return (
                                <tr key={index}>
                                    {items.map((it) => this.createTdTag(it, halfGrids)).flat()}
                                </tr>
                            );
                        } else {
                            const foldTds = items.map((item) => this.toFlat(item, item.grids));
                            const mergeTds = this.toMergeTds(foldTds);
                            return mergeTds.map((tds, inx) => {
                                return <tr key={`${index}${inx}`}>{tds}</tr>;
                            });
                        }
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
    .el-table {
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
