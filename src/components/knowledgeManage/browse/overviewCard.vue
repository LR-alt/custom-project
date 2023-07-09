<template>
    <div class="overview-card">
        <div class="overview-card__head">
            <span class="title">{{ title }}</span>
            <span class="icon">
                <slot name="icon"></slot>
            </span>
        </div>
        <div class="overview-card__main">
            <slot name="content"></slot>
        </div>
    </div>
</template>
<script>
export default {
    name: 'overview-card',
    props: {
        title: {
            type: String,
            default: '标题',
        },
    },
    data() {
        return {};
    },
    created() {},
};
</script>
<style lang="less" scoped>
.overview-card {
    display: flex;
    padding: 0 15px;
    height: 100%;
    flex-direction: column;
    border: 1px solid #ccc;
    &__head {
        display: flex;
        height: 56px;
        align-items: center;
        justify-content: space-between;
        .title {
            display: inline-block;
            width: 100px;
            height: 32px;
            text-align: center;
            line-height: 32px;
            border-radius: 4px;
            border: 1px solid #ccc;
            font-size: 16px;
            letter-spacing: 2px;
            font-weight: bold;
            background-color: #90bef3;
        }
        .icon {
            display: flex;
            font-size: 30px;
            color: #5cb6ff;
        }
    }
    &__main {
        flex: 1;
        padding-bottom: 10px;
        height: 0;
    }
}
</style>
