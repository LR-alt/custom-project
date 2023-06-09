<template>
    <div class="tree-drag">
        <el-tree 
            ref="tree1"
            class="tree" 
            :data="treeData1"
            node-key="id"
            draggable
            default-expand-all
            :allow-drop="returnFalse"
            @node-drag-start="handleDragstart"
            @node-drag-end="handleDragend"
        ></el-tree>
        <el-tree 
            ref="tree2"
            class="tree" 
            node-key="id"
            draggable
            default-expand-all
            :data="treeData2"
            :allow-drop="returnTrue"
        ></el-tree>
    </div>
</template>

<script>
export default {
    name: "HelloWorld",
    data() {
        return {
            treeData1: [
                {
                    id: 1,
                    label: "一级 1",
                    children: [
                        {
                            id: 4,
                            label: "二级 1-1",
                            children: [
                                {
                                    id: 9,
                                    label: "三级 1-1-1",
                                }
                            ],
                        },
                    ],
                }
            ],
            treeData2: [
                {
                    id: 2,
                    label: "一级 1",
                    children: [
                        {
                            id: 5,
                            label: "二级 1-1",
                            children: [
                                {
                                    id: 8,
                                    label: "三级 1-1-1",
                                }
                            ],
                        },
                    ],
                }
            ],
        };
    },
    methods: {
        handleDragstart (node, event) {
            this.$refs.tree2.$emit('tree-node-drag-start', event, {node: node});
        },
        handleDragend (draggingNode, endNode, position, event) {
            // 插入一个空节点用于占位
            let emptyData = {id: (+new Date), children: []};
            this.$refs.tree1.insertBefore(emptyData, draggingNode);

            this.$refs.tree2.$emit('tree-node-drag-end', event);
            this.$nextTick(() => {
                // 如果是移动到了当前树上，需要清掉空节点
                if (this.$refs.tree1.getNode(draggingNode.data)) {
                    this.$refs.tree1.remove(emptyData);
                } else {
                    // 如果移动到了别的树上，需要恢复该节点，并清掉空节点
                    let data = JSON.parse(JSON.stringify(draggingNode.data));
                    this.$refs.tree1.insertAfter(data, this.$refs.tree1.getNode(emptyData));
                    this.$refs.tree1.remove(emptyData);
                }
            })
        },
        returnTrue () {
            return true;
        },
        returnFalse () {
            return false;
        }
    },
};
</script>

<style scoped>
.tree {
    display: inline-block;
    vertical-align: top;
    width: 30%;
    height: 400px;
    border: 1px solid #999;
}
</style>