<script>
	import { affairColsLast, testCols } from './static';
	export default {
		name: 'check-detail-last',
		props: {
			row: {
				type: Array,
				default: () => [],
			},
			titleWidth: {
				type: String,
				default: '15%',
			},
			contentWidth: {
				type: String,
				default: '35%',
			},
		},
		created() {
			console.log(this.$scopedSlots);
		},
		methods: {
			createTdTag({ label, prop, rowspan, colspan }) {
				if (prop) {
					return [
						<td class='tb_th' rowspan={rowspan}>
							{this.$scopedSlots[label] ? this.$scopedSlots[label]() : label}
						</td>,
						<td class='tb_td' rowspan={rowspan} colspan={colspan}>
							{this.$scopedSlots[prop] ? this.$scopedSlots[prop]() : prop}
						</td>,
					];
				} else if (label) {
					return (
						<td class='tb_th' rowspan={rowspan} colspan={colspan}>
							{this.$scopedSlots[label] ? this.$scopedSlots[label]() : label}
						</td>
					);
				}
				return '';
			},
			setColspan(row) {
				const len = row.length;
				return (this.parentNode.maxGrids - len) / len;
			},
			toFlat(item) {
				let preLabel = this.createTdTag(item);
				let result = [];

				const childList = item.children.reduce((pre, cur) => {
					if (cur.prop && cur.rowspan) {
						return pre.concat(cur, ...new Array(cur.rowspan - 1).fill({}));
					}
					return pre.concat(cur);
				}, []);

				for (const subItem of childList) {
					const { prop, children } = subItem;
					if (prop) {
						const tds = this.createTdTag(subItem);
						if (preLabel) {
							tds.unshift(preLabel);
							preLabel = null;
						}
						result.push(tds);
					} else if (children) {
						result.push(...this.toFlat(subItem));
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
					groupTds.push(
						foldTds
							.map((item) => item[i])
							.filter(Boolean)
							.reduce((pre, cur) => pre.concat(cur), [])
					);
				}
				return groupTds;
			},
		},
		render() {
			return (
				<table class='check-detail' border='1' cellspacing='0' width='100%'>
					{affairColsLast.map((items, index) => {
						const isFold = items.some(
							(item) => item.children && item.children.length
						);
						if (!isFold) {
							return (
								<tr key={index}>
									{items.map((it) => this.createTdTag(it)).flat()}
								</tr>
							);
						} else {
							const foldTds = items.map((item) => this.toFlat(item));
							return this.toMergeTds(foldTds).map((tds, inx) => {
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
	.title {
		font-weight: bold;
		width: 15%;
	}
	.content {
		width: 35%;
	}
</style>
