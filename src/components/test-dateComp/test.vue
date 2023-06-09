<template>
    <div>
        <el-select
            class="custom-month-picker"
            ref="selectRef"
            v-model="checkMonths"
            placeholder="请选择"
            :popper-append-to-body="false"
            size="small"
            collapse-tags
            multiple
            @visible-change="handleVisible"
        >
            <el-option value="" style="display: none" />
            <el-date-picker
                ref="pickerRef"
                class="custom-picker"
                type="months"
                size="mini"
                v-model="checkMonths"
                :popper-append-to-body="false"
                placeholder="选择一个或多个年"
                value-format="yyyy-MM"
            />
        </el-select>
        <el-tooltip popper-class="custom-area-tooltip" effect="dark" :content="'Top Left 提示文字'.repeat(100)" placement="top-start">
            <h2>上左</h2>
        </el-tooltip>
    </div>
</template>

<script>
export default {
    name: 'DateTimePicker',
    model: {
        prop: 'value',
        event: 'change',
    },
    props: {
        value: {
            type: Array,
            default: () => [],
            require: true,
        },
    },
    data() {
        return {
            time: [], // 时间范围是数组
        };
    },
    computed: {
        checkMonths: {
            get() {
                return this.value;
            },
            set(newMonth) {
                this.$emit('change', newMonth);
            },
        },
    },
    mounted() {
        this.$nextTick(() => {});
    },
    methods: {
        handleVisible(value) {
            if (value) {
                this.$nextTick(() => {
                    this.$refs.pickerRef.focus();
                });
            }
        },
    },
};
</script>

<style lang="less" scoped>
.custom-month-picker {
    /deep/ & > .el-select-dropdown {
        height: 0;
        overflow: hidden;
        margin: 0;
        z-index: 100;
    }
}
</style>
<style lang="less">
.custom-area-tooltip {
  width: 80%;
}
</style>