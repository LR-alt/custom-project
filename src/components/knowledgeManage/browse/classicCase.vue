<template>
    <div class="classic-case">
        <div class="classic-case__content">
            <ul class="classic-case__list">
                <li v-for="(item, inx) in list" class="item" :key="inx">
                    <div class="document">
                        <span class="dot">●</span>
                        <span class="title">{{ item.title }}</span>
                    </div>
                    <div class="account">
                        <span class="nm">{{ item.name }}</span>
                        <span class="count">{{ item.createDate }}</span>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    name: 'classic-case',
    props: {
        docList: {
            type: Array,
            default: () => ([])
        }
    },
    data() {
        return {
            list: [
                { title: '文档1.doc', name: '张三' ,createDate: '2012-12-12 00:00:00' },
                { title: '文档1.doc', name: '张三',createDate: '2012-12-12 00:00:00' },
                { title: '文档1.doc', name: '张三',createDate: '2012-12-12 00:00:00' },
                { title: '文档1.doc', name: '张三',createDate: '2012-12-12 00:00:00' },
                { title: '文档1.doc', name: '张三',createDate: '2012-12-12 00:00:00' },
                { title: '文档1.doc', name: '张三',createDate: '2012-12-12 00:00:00' },
                { title: '文档1.doc', name: '张三',createDate: '2012-12-12 00:00:00' },
                 { title: '文档1.doc', name: '张三' ,createDate: '2012-12-12 00:00:00' },
                { title: '文档1.doc', name: '张三',createDate: '2012-12-12 00:00:00' },
                { title: '文档1.doc', name: '张三',createDate: '2012-12-12 00:00:00' },
                { title: '文档1.doc', name: '张三',createDate: '2012-12-12 00:00:00' },
                { title: '文档1.doc', name: '张三',createDate: '2012-12-12 00:00:00' },
                { title: '文档1.doc', name: '张三',createDate: '2012-12-12 00:00:00' },
                { title: '文档1.doc', name: '张三',createDate: '2012-12-12 00:00:00' },
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
.classic-case {
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
                .dot {
                    line-height: 20px;
                    height: 22px;
                }
                .title {
                    margin-left: 4px;
                    flex: 1;
                    line-height: 22px;
                }
                &:hover {
                    color: #409EFF;
                    cursor: pointer;
                }
            }
            .account {
                padding-left: 10px;
                text-align: right;
                color: #474892;
                
                flex-basis: 200px;
                .count {
                    margin-left: 12px;
                }
            }
        }
    }
}

</style>