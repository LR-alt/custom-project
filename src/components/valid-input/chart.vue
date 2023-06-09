<template>
    <div id="legend" class="wrap">
        <!-- <svg id="svg" class="topo"></svg> -->
    </div>
</template>
<script>
import dagreD3 from 'dagre-d3';
import { select } from 'd3-selection';
export default {
    name: 'lineage-diagram',
    data() {
        return {};
    },
    mounted() {
        this.$nextTick(() => {});
        let dataset = {
            nodes: [
                { id: 0, label: '集中故障管理系统', shape: 'rect' },
                { id: 1, label: 'xxx系统', shape: 'rect' },
                { id: 2, label: '采集平台', shape: 'rect' },
                { id: 3, label: '采集平台2', shape: 'rect' },
                { id: 4, label: '子指标1', shape: 'rect' },
                { id: 5, label: '子指标2', shape: 'rect' },
                { id: 6, label: '聚合指标', shape: 'rect' },
                { id: 7, label: '评估体系1', shape: 'rect' },
                { id: 8, label: '评估体系2', shape: 'rect' },
                { id: 9, label: '评估体系3', shape: 'rect' },
				{ id: 10, label: '评估体系3', shape: 'rect' },
				{ id: 11, label: '评估体系3', shape: 'rect' },
				{ id: 12, label: '评估体系3', shape: 'rect' },
            ],
            edges: [
                { source: 0, target: 2 },
                { source: 0, target: 4 },
                { source: 1, target: 3 },
                { source: 1, target: 5 },
                { source: 2, target: 4 },
                { source: 3, target: 5 },
                { source: 4, target: 6 },
                { source: 5, target: 6 },
                { source: 6, target: 7 },
                { source: 6, target: 8 },
                { source: 6, target: 9 },
				{ source: 6, target: 10 },
				{ source: 6, target: 11 },
				{ source: 6, target: 12 },
            ],
        };
        // 创建graph对象
        let g = new dagreD3.graphlib.Graph();
        //设置图
        g.setGraph({
            rankdir: 'LR',
            nodesep: 60,
            edgesep: 100,
            ranksep: 80,
            marginx: 50,
            marginy: 100,
        });

        dataset.nodes.forEach((item) => {
            g.setNode(item.id, {
                //节点标签
                label: item.label,
                //节点形状
                shape: item.shape,
                //节点样式
                style: 'fill:#fff;stroke:#000',
            });
        });
        dataset.edges.forEach((item) => {
            g.setEdge(item.source, item.target, {
                //边标签
                label: item.label,
                //边样式
                style: 'fill:#fff;stroke:#333;stroke-width:1.5px',
            });
        });
        // 创建渲染器
        let render = new dagreD3.render();
        // 选择 svg 并添加一个g元素作为绘图容器.
        let svgGroup = select('#legend').append('svg').attr('width', 900).attr('height', 560)
        // 在绘图容器上运行渲染器生成流程图.
        render(svgGroup, g);
    },
};
</script>

<style lang="less" scoped>
.wrap {
	position: relative;
    margin: 40px auto;
    width: 900px;
    height: 500px;
    border: 1px solid #ccc;
	overflow-y: auto;
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
