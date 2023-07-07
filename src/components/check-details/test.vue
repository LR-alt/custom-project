<!-- 测试组件 -->
<template>
	<checkDetail class="check-detail" :detail="detail" :columns="columns">
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
	</checkDetail>
	<!-- <chart /> -->
</template>
<script>
	import { affairColsLast } from './static';
	// import checkDetail from './check-detail.vue';
	import checkDetail from './check-detailLast.vue'
	// import chart from './chart.vue'
	export default {
		name: 'check--test',
		components: {
			checkDetail,
			// chart
		},
		props: {
			
		},
		data() {
			return {
				detail: {
					creatorName: '张三',
					createTime: '2012-12-12',
					affairType: '日报',
					remindSize: '月粒度',
					remindTime: '2023-12-10',
					isEffect: '是',
					remindObject: 'stack',
					smsContent: 'sms',
					sub1: 'val',
					sub2: '详情2',
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
