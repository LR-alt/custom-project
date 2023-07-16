<template>
    <div class="manage-home">
        <knowledgeClassify />
    </div>
</template>
<script>
import knowledgeClassify from './knowledgeClassify.vue';
export default {
    name: 'manage-home',
    components: {
        knowledgeClassify,
    },
    data() {
        return {}
    },
    created() {},
};
</script>
<style lang="less" scoped>
.manage-home {
}
</style>