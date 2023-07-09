<template>
    <div class="popular-document">
        <div class="popular-document__content">
            <ul class="popular-document__list">
                <li v-for="(item, inx) in list" class="item" :key="inx">
                    <div class="document">
                        <span class="order" :class="mapOrderStyle[inx]">{{ inx + 1 }}</span>
                        <span class="name">{{ item.title }}</span>
                    </div>
                    <div class="account">
                        <i class="el-icon-chat-line-round"></i>
                        <span class="count">{{ item.count }}</span>
                    </div>
                </li>
            </ul>
        </div>
        <div class="popular-document__more">
            <el-button class="more-btn" @click="checkMore" size="mini">更多 》</el-button>
        </div>
    </div>
</template>
<script>
export default {
    name: 'popular-document',
    props: {
        docList: {
            type: Array,
            default: () => ([])
        }
    },
    data() {
        return {
            list: [
                { title: '文档1.doc', count: 100 },
                { title: '文档1.doc'.repeat(20), count: 100 },
                { title: '文档1.doc', count: 100 },
                { title: '文档1.doc', count: 100 },
                { title: '文档1.doc', count: 100 },
                { title: '文档1.doc', count: 100 },
                { title: '文档1.doc', count: 100 },
            ],
            mapOrderStyle: ['bg-red','bg-purple','bg-green']
        }
    },
    created() {},
    methods: {
        checkMore() {

        }
    }
};
</script>
<style lang="less" scoped>
.popular-document {
    display: flex;
    flex-direction: column;
    height: 100%;
    &__content {
        padding-bottom: 10px;
        flex: 1;
        height: 0;
    }
    &__list {
        margin: 0;
        padding: 0;
        height: 100%;
        list-style: none;
        overflow: auto;
        .item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            line-height: 32px;
            font-size: 14px;
            .document {
                flex: 1;
                display: flex;
                align-items: center;
                .order {
                    display: inline-block;
                    margin-right: 8px;
                    height: 22px;
                    width: 22px;
                    line-height: 22px;
                    text-align: center;
                    border-radius: 4px;
                    border: 1px solid #ddd;
                    box-sizing: border-box;
                }
                .name {
                    flex: 1;
                    line-height: 22px;
                    &:hover {
                        color: #409EFF;
                        cursor: pointer;
                    }
                }
                
            }
            .account {
                text-align: right;
                flex-basis: 100px;
                .count {
                    margin-left: 3px;
                }
            }
        }
    }
    &__more {
        height: 32px;
    }
}
.bg-red {
    background-color: #b00419;
}
.bg-purple {
    background-color: #6969ce;
}
.bg-green {
    background-color: green;
}
</style>