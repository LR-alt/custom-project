<!--
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-05-08 22:07:42
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-05-20 15:19:21
 * @FilePath: \webStormProjectse:\componyProject\element-comps\elementui-common-comps\src\components\valid-input\check-detail.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<!-- check=-detail -->
<template>
	<div>
		<table :border="1" width="100%" class="check-detail">
			<template v-for="(items, index) in columns">
				<tableRow :row="items" :key="index">
					<template v-slot="{ item }">
						<slot :name="item.prop" :item="item">
							{{ data[item.prop] }}
						</slot>
					</template>
				</tableRow>
			</template>
		</table>
		<!--  -->
		<el-divider></el-divider>
	</div>
</template>
<script>
	import tableRow from './tableRow.vue';
	export default {
		name: 'check-detail',
		components: {
			tableRow,
		},
		provide () {
      return {
        parentNode: this
      }
    },
		props: {
			data: {
				type: Object,
				default: () => ({}),
			},
			columns: {
				type: Array,
				default: () => [],
			},
		},
		computed: {
			maxGrids() {
				return Math.max(...this.columns.map(items => items.length)) * 2;
			}
		}
	};
</script>

<style lang="less" scoped>
	.check-detail {
		border-collapse: collapse;
		.cell {
			padding-left: 10px;
			padding-right: 10px;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: normal;
			word-break: break-all;
			line-height: 23px;
			display: inline-block;
			box-sizing: border-box;
			width: 100%;
		}
	}
</style>
