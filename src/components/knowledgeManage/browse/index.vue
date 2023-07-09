<template>
    <div class="browse-home">
        <div class="browse-home__head">
            <searchKeywords class="search-keywords" />
        </div>
        <div class="browse-home__main">
            <el-row class="top" :gutter="8">
                <el-col :span="12">
                    <overviewCard title="公告">
                        <template #icon>
                            <i class="el-icon-message-solid"></i>
                        </template>
                        <template #content>
                            <div class="announcement">{{ announcement }}</div>
                        </template>
                    </overviewCard>
                </el-col>
                <el-col :span="12">
                    <overviewCard title="热门文档">
                        <template #icon><i class="el-icon-document"></i></template>
                        <template #content>
                            <popularDoc />
                        </template>
                    </overviewCard>
                </el-col>
            </el-row>
            <el-row class="bottom" :gutter="8">
                <el-col :span="12">
                    <overviewCard title="标签云">
                        <template #icon><i class="el-icon-collection-tag"></i></template>
                        <template #content>
                            <labelCloud />
                        </template>
                    </overviewCard>
                </el-col>
                <el-col :span="12">
                    <overviewCard title="经验案例">
                        <template #icon>
                            <el-button class="case-more" size="mini">更多 》</el-button>
                        </template>
                        <template #content>
                            <classicCase />
                        </template>
                    </overviewCard>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
import overviewCard from './overviewCard.vue';
import popularDoc from './popularDoc.vue';
import labelCloud from './labelCloud.vue';
import classicCase from './classicCase.vue'
import searchKeywords from '../common/components/searchKeywords.vue'
export default {
    name: 'browse-home',
    components: {
        overviewCard,
        popularDoc,
        labelCloud,
        classicCase,
        searchKeywords
    },
    data() {
        return {
            announcement: '公告内容'.repeat(100),
        };
    },
    created() {},
    methods: {},
};
</script>
<style lang="less" scoped>
.browse-home {
    display: flex;
    padding: 10px 30px !important;
    height: 100%;
    flex-direction: column;
    box-sizing: border-box;

    &__head {
        display: flex;
        height: 60px;
        align-items: center;
        justify-content: center;
    }
    &__main {
        flex: 1;
        .el-row {
            height: 49%;
            &:first-of-type {
                margin-bottom: 8px;
            }
            .el-col {
                height: 100%;
            }
        }
        .announcement {
            padding: 8px;
            height: 100%;
            border: 1px solid #dedede;
            border-radius: 6px;
            font-size: 14px;
            box-sizing: border-box;
            overflow: auto;
        }
    }
}
</style>
