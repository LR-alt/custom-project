<template>
    <div class="knowledge-classify">
        <div class="knowledge-classify__planes">
            <div class="mainPlane">
                <el-radio-group v-model="mainCategory">
                    <el-radio
                        v-for="(item, inx) in treeData"
                        class="mainLevel"
                        :key="inx"
                        :label="item.label"
                        @click.native.prevent="() => handleMainCategory(item)"
                    >
                        <span>{{ item.label }}{{ formatData(item.account) }}</span>
                        <i class="el-icon-arrow-right"></i>
                    </el-radio>
                </el-radio-group>
            </div>
            <div class="secondPlane">
                <el-radio-group v-model="category">
                    <el-radio
                        v-for="(item, inx) in secondList"
                        class="level"
                        :label="item.label"
                        :title="item.label"
                        :key="`${item.label}${inx}`"
                        @click.native.prevent="() => handleCategory(item)"
                    >
                        <span class="secondLabel">{{ item.label }}{{ formatData(item.account) }}</span>
                        <el-checkbox-group class="subLevel" v-model="mapSubCategory[item.label]">
                            <el-checkbox
                                v-for="(it, i) in item.children"
                                :label="it.label"
                                :title="it.label"
                                :key="`${it.label}${i}`"
                                @click.native.stop
                                @change="(val) => handleSubCategory(val, item)"
                            >
                                <span>{{ it.label }}{{ formatData(it.account) }}</span>
                            </el-checkbox>
                        </el-checkbox-group>
                    </el-radio>
                </el-radio-group>
            </div>
        </div>
    </div>
</template>

<script>
import { treeData } from './test.js';
export default {
    name: 'knowledge-classify',
    data() {
        return {
            treeData,
            secondList: [],
            defMainCategory: '',
            mainCategory: '',
            category: '',
            mapSubCategory: {},
        };
    },
    created() {
        this.setSecondList(this.treeData[0]);
    },
    computed: {
        subCategory() {
            return this.mapSubCategory[this.category];
        },
    },
    methods: {
        formatData(val) {
            if (!val) {
                return '';
            }
            return `（${val}）`;
        },
        setSecondList(curItem) {
            const children = curItem.children;
            const mapSubCategory = {};
            children.forEach((item) => {
                mapSubCategory[item.label] = [];
            });
            this.defMainCategory = curItem.label;
            this.secondList = children;
            this.mapSubCategory = mapSubCategory;
        },
        handleMainCategory(curItem) {
            const label = curItem.label;
            if (this.mainCategory === label) {
                // 取消选中
                this.mainCategory = '';
            } else {
                this.mainCategory = label;
                this.setSecondList(curItem);
            }
            this.mapSubCategory[this.category] = [];
            this.category = '';
        },
        handleCategory(curItem) {
            const label = curItem.label;
            if (!this.mainCategory) {
                this.mainCategory = this.defMainCategory;
            }
            if (this.category === label) {
                this.category = '';
                this.mapSubCategory[label] = [];
            } else {
                this.mapSubCategory[this.category] = [];
                this.category = label;
            }
        },
        handleSubCategory(checked, pItem) {
            if (!checked) return;
            if (!this.mainCategory) {
                this.mainCategory = this.defMainCategory;
            }
            if (!this.category) {
                this.category = pItem.label;
            } else if (this.category !== pItem.label) {
                this.mapSubCategory[this.category] = [];
                this.category = pItem.label;
            }
        },
    },
};
</script>

<style lang="less" scoped>
.knowledge-classify {
    margin: 60px auto;
    width: 900px;
    height: 230px;
    &__planes {
        display: flex;
        .mainPlane {
            padding: 6px 0;
            flex-basis: 200px;
            height: 200px;
            border: 1px solid #ddd;
            .el-radio-group {
                width: 100%;
            }
            .mainLevel {
                display: flex;
                margin: 0;
                padding-right: 6px;
                width: 100%;
                height: 28px;
                justify-content: space-between;
                align-items: center;
                box-sizing: border-box;
                /deep/ .el-radio__input {
                    display: none !important;
                }
            }
        }
        .secondPlane {
            flex: 1;
            display: flex;
            border: 1px solid #ddd;
            border-left: none;
            .level {
                margin-right: 0;
                padding: 6px 0;
                width: 100%;
                line-height: 28px;
                border-bottom: 1px solid #ccc;
                .secondLabel {
                    display: block;
                    width: 200px;
                }
                /deep/ .el-radio__input {
                    display: none !important;
                }
                /deep/ .el-radio__label {
                    display: flex !important;
                }
            }
            .subLevel {
                flex: 1;
                display: flex;
                flex-wrap: wrap;
                .el-checkbox {
                    margin: 0;
                    padding: 0 12px;
                    &::before {
                        content: "|";
                        position: relative;
                            left: -10px;
                            top: -1px;
                            color: #e2e2e2;
                    }
                }
                /deep/ .el-checkbox__label {
                    padding-left: 0;
                }
                /deep/ .el-checkbox__input {
                    display: none !important;
                }
            }
        }
    }
}
</style>
