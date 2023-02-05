<!-- 区域对选择、省/市/县组件 -->
<template>
  <div class="multiArea-select">
    <div class="multiArea-select__area">
      <selectArea
        v-model="checkedList"
        :selectOps="selectOps"
        :treeData="JSON.parse(JSON.stringify(tree))"
        @updateList="updateCheckedList"
      />
    </div>
   <!--  <div class="multiArea-select__mall">
      <selectArea 
        :checkedData="checkedMallData"
        :panelLevels="2"
        :treeData="JSON.parse(JSON.stringify(mallTree))"
        @updateList="updateCheckedMallList" />
    </div> -->
    <div class="multiArea-select__selected">
      <!-- <selectedLabels v-bind="$attrs" :tagData="checkedData" @deleteTag="deleteTag" /> -->
    </div>
  </div>
</template>

<script>
import selectArea from '../selectArea2.vue';
import selectedLabels from '../selectedLabels.vue';
export default {
  name: 'multiArea-select',
  inject: ['tree', 'mallTree'],
  props: {
    areaType: {
      type: String,
      default: '',
    },
  },
  components: {
    selectArea,
    selectedLabels,
  },
  data() {
    return {
      mapPanelLevels: {
        省份: 1,
        城市: 2,
        区县: 3,
      },
      selectOps: [
        { label: '地市', value: 1 },
        { label: '区县', value: 2 },
      ],
      // 默认回显数据
      checkedList: [],
      tags: [],
      checkedMallData: {
        prefix: '',
        list: [{ label: '' }, { label: '' }],
      },
    };
  },
  mounted() {},
  watch: {},
  methods: {
    updateCheckedList(prefix, newCheckedList) {
      if (this.checkedList.prefix && this.checkedData.prefix !== prefix) {
        this.checkedData.list.forEach((item) => {
          item.checked = false;
        });
      }
      this.checkedData.prefix = prefix;
      this.checkedData.list = newCheckedList;
    },
    updateCheckedMallList(prefix, newCheckedList) {
      if (this.checkedMallData.prefix && this.checkedMallData.prefix !== prefix) {
        this.checkedMallData.list.forEach((item) => {
          item.checked = false;
        });
      }
      this.checkedMallData.prefix = prefix;
      this.checkedMallData.list = newCheckedList;
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
.multiArea-select {
  display: inline-flex;
  &__mall {
    margin-right: 6px;
  }
  &__selected {
    min-width: 300px;
  }
}
</style>
