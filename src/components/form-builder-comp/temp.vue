<template>
    <el-form class="search-bar" :model="form" label-width="70px" size="small" inline>
        <el-row v-for="(cols, inx) in formCols" :key="inx" :gutter="8">
            <el-col v-for="item in cols" :key="item.prop" :span="item.grid">
                <el-form-item :label="item.label" :prop="item.prop" :label-width="item.labelWidth">
                    <!--  <template v-if="item.type === 'select'">
                        <el-select
                            v-model="form[item.prop]"
                            class="w-full"
                            placeholder="请选择"
                            clearable
                        >
                            <el-option
                                v-for="it in item.opts"
                                :key="it.value"
                                :label="it.label"
                                :value="it.value"
                            />
                        </el-select>
                    </template>
                    <template v-else-if="item.type === 'input'">
                        <el-input
                            v-model="form[item.prop]"
                            type="text"
                            placeholder="请输入"
                            clearable
                        />
                    </template> -->
                    <component
                        v-if="item.type !== 'tool-btn'"
                        :is="item.tag"
                        v-model="form[item.prop]"
                        :type="item.type"
                        placeholder="请输入"
                        clearable
                    >
                        <el-option
                            v-for="it in item.opts"
                            :key="it.value"
                            :label="it.label"
                            :value="it.value"
                        />
                    </component>
                    <template v-else>
                        <el-button @click="() => {}">重置</el-button>
                        <el-button type="primary" @click="() => {}">查询</el-button>
                    </template>
                </el-form-item>
            </el-col>
        </el-row>
    </el-form>
</template>

<script>
import { getFormCols } from './static';
export default {
    name: 'search-bar',
    components: {},
    props: {
        tabData: {
            type: Object,
            default: () => ({}),
        },
        userNumber: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            formCols: [],
            form: {
                name: '',
                level: '',
                major: '',
                certify_level: '',
                certify_position: '',
                status: '',
                is_availability: '',
                certify_type: '',
                certify_status: '',
                is_expired: '',
            },
        };
    },
    computed: {
        userInfo() {
            return this.$store.getters.user;
        },
    },
    async created() {
        this.formCols = getFormCols('declared');
    },
    methods: {},
};
</script>

<style lang="less" scoped>
.search-bar {
    width: 100%;
    .el-row {
        .el-col:last-of-type .el-form-item {
            margin-right: 0;
        }
    }
    .el-form-item {
        display: flex;
        margin-bottom: 12px;
    }
    /deep/ .el-form-item__label {
        margin-bottom: 0;
        padding-right: 0px;
    }
    /deep/ .el-form-item__content {
        position: relative;
        flex: 1;
    }
}
.w-full {
    width: 100%;
}
</style>
