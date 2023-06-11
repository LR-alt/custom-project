<template>
	<div id="container" class="lineage-diagram" :class="{ 'overflow-auto': isOverflowAuto }"></div>
</template>
<script>
import G6 from '@antv/g6';
export default {
	name: 'lineage-diagram',
	data() {
		return {
			isOverflowAuto: false,
		};
	},
	mounted() {
		const container = document.getElementById('container');
		const width = container.scrollWidth;
		const height = container.scrollHeight || 500;
		this.$nextTick(() => {
			const graph = new G6.Graph({
				container: 'container', // String | HTMLElement，必须，在 Step 1 中创建的容器 id 或容器本身
				width, // Number，必须，图的宽度
				height, // Number，必须，图的高度
				// fitView: true,
				fitCenter: true,
				defaultNode: {
					type: 'rect',
				},
				defaultEdge: {
					type: 'polyline',
					style: {
						endArrow: {
							path: G6.Arrow.triangle(8, 10, 0),
							fill: '#000',
							opacity: 0.5,
						},
					},
				},
				layout: {
					type: 'dagre',
					rankdir: 'LR', // 可选，默认为图的中心
					nodesep: 30, // 可选
					ranksep: 50, // 可选
					// controlPoints: true,
					preventOverlap: true, // 防止节点重叠
					// 防碰撞必须设置nodeSize或size,否则不生效，由于节点的size设置了40，虽然节点不碰撞了，但是节点之间的距离很近，label几乎都挤在一起，所以又重新设置了大一点的nodeSize,这样效果会好很多
					nodeSize: 120,
					// linkDistance: 160, // 指定边距离为150
				},
				defaultCombo: {
					type: 'rect',
					labelCfg: {
						refY: -20,
						refX: 0,
						style: {
							fontSize: 14,
						},
						position: 'top',
					},
				},
				groupByTypes: false,
			});
			// 注册新节点
			G6.registerNode(
				'card-node',
				{
					drawShape: function drawShape(cfg, group) {
						const color = cfg.error ? '#F4664A' : '#30BF78';
						const r = 2;
						/* 	const labelObj = group.addShape(text, {

							}) */
						const shape = group.addShape('rect', {
							attrs: {
								x: -70,
								y: 0,
								width: 140,
								height: 140,
								stroke: color,
								radius: r,
							},
							name: 'main-box',
							draggable: true,
						});

						group.addShape('rect', {
							attrs: {
								x: -70,
								y: 0,
								width: 140,
								height: 20,
								fill: color,
								radius: [r, r, 0, 0],
							},
							// must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
							name: 'title-box',
							draggable: true,
						});

						// title text
						group.addShape('text', {
							attrs: {
								textBaseline: 'top',
								y: 5,
								x: -60,
								lineHeight: 20,
								text: cfg.title,
								fill: '#fff',
							},
							// must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
							name: 'title',
						});

						// The content list
						cfg.panels.forEach((item, index) => {
							// name text
							group.addShape('text', {
								attrs: {
									textBaseline: 'top',
									y: 25 + index * 20,
									x: -60,
									lineHeight: 20,
									text: item,
									fill: 'rgba(0,0,0, 0.4)',
									fontSize: 10,
								},
								// must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
								name: `index-title-${index}`,
							});
						});
						return shape;
					},
				},
				'single-node'
			);
			// 定义边
			G6.registerEdge('hvh', {
				draw(cfg, group) {
					const startPoint = cfg.startPoint;
					const endPoint = cfg.endPoint;
					const shape = group.addShape('path', {
						attrs: {
							stroke: '#ccc',
							path: [
								['M', startPoint.x, startPoint.y],
								['L', endPoint.x / 4 + (2.4 / 3) * startPoint.x, startPoint.y], // 三分之一处
								['L', endPoint.x / 4 + (2.4 / 3) * startPoint.x, endPoint.y], // 三分之二处
								['L', endPoint.x, endPoint.y]
							],
							endArrow: {
								path: G6.Arrow.triangle(5, 5, 0), // 使用内置箭头路径函数，参数为箭头的 宽度、长度、偏移量（默认为 0，与 d 对应）
								d: 0,
								fill: '#000',
								opacity: 0.5,
								lineWidth: 1,
							},
						},
						// must be assigned in G6 3.3 and later versions. it can be any value you want
						name: 'path-shape',
					});
					return shape;
				},
			});
			// 注册数据
			const customData = {
				// 点集
				nodes: [
					{
						id: 'system1',
						title: '集中故障管理系统',
						comboId: 'combo-sys',
						type: 'card-node',
						anchorPoints: [
							[0, 0.5],
							[1, 0.5],
						],
						panels: ['无线优化中心', 'TCL', '张三', '李斯'],
					},
					{
						id: 'system2',
						title: 'xx系统',
						comboId: 'combo-sys',
						type: 'card-node',
						anchorPoints: [
							[0, 0.5],
							[1, 0.5],
						],
						panels: ['无线优化中心', 'TCL', '张三', '李斯'],
					},
					{
						id: 'platform1',
						title: '采集平台1',
						comboId: 'combo-sys',
						type: 'card-node',
						anchorPoints: [
							[0, 0.5],
							[1, 0.5],
						],
						panels: ['无线优化中心', 'TCL', '张三', '李斯'],
					},
					{
						id: 'platform2',
						title: '采集平台2',
						comboId: 'combo-sys',
						type: 'card-node',
						anchorPoints: [
							[0, 0.5],
							[1, 0.5],
						],
						panels: ['无线优化中心', 'TCL', '张三', '李斯'],
					},
					{
						id: 'node1', // String，该节点存在则必须，节点的唯一标识
						label: '指标1',
						comboId: 'combo-index',
						level: 2,
						anchorPoints: [
							[0, 0.5],
							[1, 0.5],
						],
					},
					{
						id: 'node2', // String，该节点存在则必须，节点的唯一标识
						label: '指标2',
						comboId: 'combo-index',
						level: 2,
						anchorPoints: [
							[0, 0.5],
							[1, 0.5],
						],
					},
					{
						id: 'node3', // String，该节点存在则必须，节点的唯一标识
						label: '指标3',
						comboId: 'combo-index',
						level: 2,
						anchorPoints: [
							[0, 0.5],
							[1, 0.5],
						],
					},
					{
						id: 'node4', // String，该节点存在则必须，节点的唯一标识
						label: '指标4',
						comboId: 'combo-index',
						level: 2,
						anchorPoints: [
							[0, 0.5],
							[1, 0.5],
						],
					},
					{
						id: 'node5', // String，该节点存在则必须，节点的唯一标识
						label: '指标5',
						comboId: 'combo-index',
						level: 2,
						anchorPoints: [
							[0, 0.5],
							[1, 0.5],
						],
					},
					{
						id: 'composeNode', // String，该节点存在则必须，节点的唯一标识
						label: '聚合指标',
						comboId: 'combo-index',
						level: 2,
						anchorPoints: [
							[0, 0.5],
							[1, 0.5],
						],
					},
					{
						id: 'sys1',
						label: '评估体系1',
						comboId: 'combo-eva',
						level: 3,
						anchorPoints: [
							[0, 0.5],
							[1, 0.5],
						],
					},
					{
						id: 'sys2',
						label: '评估体系2',
						comboId: 'combo-eva',
						level: 3,
						anchorPoints: [
							[0, 0.5],
							[1, 0.5],
						],
					},
					{
						id: 'sys3',
						label: '评估体系3',
						comboId: 'combo-eva',
						level: 3,
						anchorPoints: [
							[0, 0.5],
							[1, 0.5],
						],
					},
					{
						id: 'sys4',
						label: '评估体系4',
						comboId: 'combo-eva',
						level: 3,
						anchorPoints: [
							[0, 0.5],
							[1, 0.5],
						],
					},
					{
						id: 'sys5',
						label: '评估体系5',
						comboId: 'combo-eva',
						level: 3,
						anchorPoints: [
							[0, 0.5],
							[1, 0.5],
						],
					},
					{
						id: 'sys6',
						label: '评估体系6',
						comboId: 'combo-eva',
						level: 3,
						anchorPoints: [
							[0, 0.5],
							[1, 0.5],
						],
					},
					{
						id: 'sys7',
						label: '评估体系5',
						comboId: 'combo-eva',
						level: 3,
						anchorPoints: [
							[0, 0.5],
							[1, 0.5],
						],
					},
					{
						id: 'sys8',
						label: '评估体系6',
						comboId: 'combo-eva',
						level: 3,
						anchorPoints: [
							[0, 0.5],
							[1, 0.5],
						],
					},
				],
				// 边集
				edges: [
					{
						source: 'system1',
						target: 'platform1',
						type: 'hvh',
					},
					{
						source: 'system1',
						target: 'node1',
						type: 'hvh',
						style: {
							lineDash: [5],
						},
					},
					{
						source: 'system2',
						target: 'platform2',
						type: 'hvh',
					},
					{
						source: 'system2',
						target: 'node2',
						type: 'hvh',
						style: {
							lineDash: [5],
						},
					},
					{
						source: 'system2',
						target: 'node4',
						type: 'hvh',
						style: {
							lineDash: [5],
						},
					},
					{
						source: 'platform1',
						target: 'node1',
						type: 'hvh',
					},
					{
						source: 'platform2',
						target: 'node2',
						type: 'hvh',
					},
					{
						source: 'platform2',
						target: 'node4',
						type: 'hvh',
					},
					{
						source: 'node1', // String，必须，起始点 id
						target: 'node3', // String，必须，目标点 id
					},
					{
						source: 'node2', // String，必须，起始点 id
						target: 'node3', // String，必须，目标点 id
					},
					{
						source: 'node3',
						target: 'composeNode',
					},
					{
						source: 'node4',
						target: 'composeNode',
					},
					{
						source: 'node5',
						target: 'composeNode',
					},
					{
						source: 'composeNode',
						target: 'sys1',
					},
					{
						source: 'composeNode',
						target: 'sys2',
					},
					{
						source: 'composeNode',
						target: 'sys3',
					},
					{
						source: 'composeNode',
						target: 'sys4',
					},
					{
						source: 'composeNode',
						target: 'sys5',
					},
					{
						source: 'composeNode',
						target: 'sys6',
					},
					{
						source: 'composeNode',
						target: 'sys7',
					},
					{
						source: 'composeNode',
						target: 'sys8',
					},
				],
				combos: [
					{
						// 定义 comboA
						id: 'combo-sys',
						label: '数据来源',
						// size: [null,500]
					},
					{
						// 定义 comboB
						id: 'combo-index',
						label: '指标层',
						// size: [null,400]
					},
					{
						// 定义 comboC，这是一个空的 combo
						id: 'combo-eva',
						label: '评估体系',
						// size: [null,400]
					},
					// ...
				],
			};
			graph.data(customData); // 读取 Step 2 中的数据源到图上
			graph.render(); // 渲染图

			console.log(customData.combos)

			// 控制溢出隐藏
			const canvasHeight = Math.max(...customData.nodes.map(node => node.y)) || 0;
			const diffHeight = canvasHeight - height;
			if (diffHeight > 0) {
				let padding = 0;
				if (diffHeight < 30) {
					padding = 30;
				}
				graph.changeSize(width, canvasHeight + padding) //重新设置高度
				graph.render();
				this.isOverflowAuto = true;
			}

			// 
			if (typeof window !== 'undefined')
				window.onresize = () => {
					if (!graph || graph.get('destroyed')) return;
					if (!container || !container.scrollWidth || !container.scrollHeight)
						return;
					graph.changeSize(container.scrollWidth, container.scrollHeight);
				};
		});
	},
	methods: {
		
	}
};
</script>

<style lang="less" scoped>
.lineage-diagram {
	height: 650px;
	width: 100%;
	box-sizing: border-box;
	border: 1px solid #ccc;
}
.overflow-auto {
	overflow: auto;
}
</style>
<style lang="less">
body {
	margin: 0;
	padding: 0;
}

html,
body {
	height: 100%;
}
</style>
