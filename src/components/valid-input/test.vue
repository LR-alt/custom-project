<!--
 * @Date: 2022-10-19 09:42:00
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-06-03 18:48:55
 * @FilePath: \mtex-static-evase:\componyProject\element-comps\elementui-common-comps\src\components\valid-input\test.vue
-->
<template>
<!-- 	<checkDetail class="check-detail" :data="detail" :columns="columns">
		<template #affairType>
			<el-input
				v-model="detail.affairType"
				type="text"
				placeholder="请输入事务类型"
				clearable
			/>
		</template>
		<template #remindSize>
			<el-select
				v-model="detail.remindSize"
				class="w-full"
				placeholder="请选择"
				clearable
			>
				<el-option
					v-for="it in remindSizeOps"
					:key="it.value"
					:label="it.label"
					:value="it.value"
				/>
			</el-select>
		</template>
		<template #smsContent>
			<el-input
				v-model="detail.smsContent"
				type="textarea"
				:rows="4"
				placeholder="请输入事务类型"
				clearable
			/>
		</template>
	</checkDetail> -->
	<chart />
</template>
<script>
	import { affairColsLast } from './static';
	// import checkDetail from './check-detail.vue';
	// import checkDetail from './check-detailLast.vue'
	import chart from './chart.vue'
	export default {
		name: 'check--test',
		components: {
			// checkDetail,
			chart
		},
		props: {
			
		},
		data() {
			return {
				detail: {
					creatorName: '',
					createTime: '',
					affairType: '',
					remindSize: '',
					remindTime: '',
					isEffect: '',
					remindObject: '',
					smsContent: '',
					sub1: '',
					sub2: '',
				},
				remindSizeOps: [
					{ label: 'max', value: 'max' },
					{ label: 'min', value: 'min' },
				],
				columns: affairColsLast,
			};
		},
		mounted() {
			this.getDetails();
		},
		methods: {
			getDetails() {},
			checkRecords() {},
		},
	};
</script>

<style lang="less" scoped>
	/* .check-detail {
		height: 500px;
		border-collapse: collapse;
	} */
</style>
