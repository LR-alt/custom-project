<template>
    <el-tabs class="custom-tabs" v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="用户管理" name="first">
            <el-select v-model="value1" multiple collapse-tags placeholder="请选择" @change="handleSelect">
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                >
                </el-option>
            </el-select>
        </el-tab-pane>
        <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
        <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
        <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
    </el-tabs>
</template>
<script>
export default {
    name: 'test-comp',
    data() {
        return {
            activeName: 'first',
            value1: [],
            options: [
                {
                    value: '全部',
                    label: '全部',
                },
                {
                    value: '黄金糕',
                    label: '黄金糕',
                },
                {
                    value: '双皮奶',
                    label: '双皮奶',
                },
                {
                    value: '蚵仔煎',
                    label: '蚵仔煎',
                },
                {
                    value: '龙须面',
                    label: '龙须面',
                },
                {
                    value: '北京烤鸭',
                    label: '北京烤鸭',
                },
            ],
        };
    },
    watch: {
        value1(curValues, oldValues) {
            const [isAdd, curSelectVal] = this.diffSelectValues(curValues, oldValues);
            if (isAdd) {
                if (curSelectVal === '全部') {
                    this.value1 = [curSelectVal]
                } else if (this.value1.includes('全部')) {
                    this.value1 = this.value1.filter(val => val !== '全部')
                }
            }
        }
    },
    methods: {
        handleClick(tab, event) {
            console.log(tab, event);
        },
        handleSelect(value) {
            value
            // console.log(value)
        },
        diffSelectValues(newValues, oldValues) {
            let status;
            let curSelectVal;
            if (newValues.length > oldValues.length) {
                curSelectVal = newValues[newValues.length - 1];
                status = true;
            } else {
                curSelectVal = oldValues[oldValues.length - 1];
                status = false;
            }
            return [status, curSelectVal]
        }
    },
};
</script>

<style lang="less">
.custom-tabs {
    .el-tabs__header .el-tabs__nav {
        height: 28px;
        border-top: none !important;
        border-right: none !important;
        border-bottom: none;
        .el-tabs__item {
            margin-right: 10px;
            height: 28px;
            line-height: 28px;
            border: 1px solid #cdcdcd;
            background-color: #f4f4f4;
            &.is-active {
                background-color: transparent;
            }
        }
    }
}
</style>
