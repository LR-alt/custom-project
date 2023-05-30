<!--
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-05-14 18:07:28
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-05-15 22:32:12
 * @FilePath: \webStormProjectse:\componyProject\element-comps\elementui-common-comps\src\components\valid-input\tableRow.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<template>
	<tr class="row">
		<template v-for="(item) in row">
			<!-- title -->
			<td
				class="title"
				:width="titleWidth"
				:rowspan="item.children && item.children.length ? item.children.length : ''"
				:key="item.label"
			>
				<slot name="title">{{ item.label }}</slot>
			</td>
			<!-- content -->
			<td
				v-if="!item.children || !item.children.length"
				class="content"
				:width="contentWidth"
				:colspan="item.colspan || setColspan(row)"
				:key="item.prop"
			>
				<slot :item="item"></slot>
			</td>
      <!-- 递归 -->
		<!-- 	<table-row v-else :row="item.children" :key="`${item.label}-${index}`">
				<template v-slot="item">
					<slot :item="item"></slot>
				</template>
			</table-row> -->
		</template>
	</tr>
</template>

<script>
	export default {
		name: 'table-row',
		inject: ['parentNode'],
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
		methods: {
			setColspan(row) {
				const len = row.length;
				return (this.parentNode.maxGrids - len) / len;
			},
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
