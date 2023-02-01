<!--
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-02-01 20:56:57
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-02-01 23:16:45
 * @FilePath: \.leetcodee:\componyProject\element-comps\elementui-common-comps\src\components\drag-tabs\areaCompose.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<template>
  <div class="area-select">
    <selectArea
      :checkedData="checkedData"
      :selectOps="selectOps"
      @updateList="updateCheckedList"
      style="margin-right: 8px"
    />
    <selectedLabels :tagData="checkedData" @deleteTag="deleteTag" />
  </div>
</template>

<script>
import selectArea from './selectArea1.vue';
// import selectArea from './testcascader.vue';
import selectedLabels from './selectedLabels.vue';
export default {
  name: 'area-select',
  props: {
    selectList: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    selectArea,
    selectedLabels,
    
  },
  data() {
    return {
      checkedData: {
        prefix: '',
        list: [{ label: '' }, { label: '' }],
      },
      selectOps: [
        { label: '地市', value: 0 },
        { label: '区县', value: 1 },
      ],
    };
  },
  mounted() {},
  watch: {},
  methods: {
    updateCheckedList(prefix, newCheckedList) {
      if (this.checkedData.prefix && this.checkedData.prefix !== prefix) {
        this.checkedData.list.forEach((item) => {
          item.checked = false;
        });
      }
      this.checkedData.prefix = prefix;
      this.checkedData.list = newCheckedList;
    },
    deleteTag(tag) {
      const prefix = this.checkedData.prefix.replace(/\//g, '');
      const curItem = this.checkedData.list.find((item) => tag === `${prefix}${item.label}`);
      curItem.checked = false;
    },
  },
};
</script>
<style lang="less" scoped>
.area-select {
  display: flex;
  width: 100%;
}
</style>
