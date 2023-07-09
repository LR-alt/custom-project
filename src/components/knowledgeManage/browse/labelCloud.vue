<template>
   <div class="label-cloud">
        <div class="label-cloud__tags">
            <el-tag v-for="(tag, inx) in tags" :key="inx">{{ tag }}</el-tag> 
        </div>
   </div>
</template>

<script>
export default {
    name: 'label-cloud',
    props: {
        tags: {
            type: Array,
            default: () => (new Array(69).fill('经典案例'))
        }
    },
    data() {
        return {}
    }
}
</script>

<style lang="less" scoped>
.label-cloud {
    padding-bottom: 6px;
    height: 100%;
    box-sizing: border-box;
    overflow: auto;
    &__tags {
        display: flex;
        flex-wrap: wrap;
        .el-tag {
            margin: 12px 0px 0px 12px;
        }
    }
}
</style>