<script>
import { affairColsLast } from './static';
export default {
    name: 'check-detail-last',
    props: {
        row: {
            type: Array,
            default: () => [],
        },
        baseGrids: {
            type: Number,
            default: 6,
        },
    },
    computed: {
        unitWidth() {
            return (1 / this.baseGrids) * 100 + '%';
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
                    <td
                        class="tb_th"
                        style={{ width: this.unitWidth }}
                        rowspan={rowspan}
                        colspan={labelSpan}
                    >
                        {this.$scopedSlots[label] ? this.$scopedSlots[label]() : label}
                    </td>,
                    <td class="tb_td" rowspan={rowspan} colspan={colspan}>
                        {this.$scopedSlots[prop] ? this.$scopedSlots[prop]() : prop}
                    </td>,
                ];
            } else if (prop) {
                return [
                    <td class="tb_td" rowspan={rowspan} colspan={colspan}>
                        {this.$scopedSlots[prop] ? this.$scopedSlots[prop]() : prop}
                    </td>,
                ];
            } else if (label) {
                rowspan = rowspan || this.getChildNumbers(children);
                return (
                    <td
                        class="tb_th"
                        style={{ width: this.unitWidth }}
                        rowspan={rowspan}
                        colspan={labelSpan}
                    >
                        {this.$scopedSlots[label] ? this.$scopedSlots[label]() : label}
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
                const rowTds = foldTds.map((item) => item[i]).filter(Boolean).flat();
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
            <table class="check-detail" border="0" cellspacing="0" cellpadding="0" width="100%">
                {affairColsLast.map((items, index) => {
                    const isFold = items.some((item) => item.children && item.children.length);
                    if (!isFold) {
                        const len = this.baseGrids / (items.length || 1);
                        return (
                            <tr key={index}>
                                {items.map((it) => this.createTdTag(it, len)).flat()}
                            </tr>
                        );
                    } else {
                        const foldTds = items.map((item) => {

                            return this.toFlat(item, item.grids);
                        });
                        const mergeTds = this.toMergeTds(foldTds);
                        return mergeTds.map((tds, inx) => {
                            return <tr key={`${index}${inx}`}>{tds}</tr>;
                        });
                    }
                })}
            </table>
        );
    },
};
</script>

<style lang="less" scoped>
.check-detail {
    .tb_th,
    .tb_td {
        line-height: 32px;
    }
    .tb_th {
        text-align: center;
        // color: #454545;
        border: 1px solid #ebeef5;
        background-color: #f5f7fa;
    }
    .tb_td {
        text-align: center;
        border: 1px solid #ebeef5;
    }
}
</style>
