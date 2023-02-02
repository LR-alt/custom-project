<!-- 组合 -->
<template>
  <div class="area-select">
    <selectArea
      :checkedData="checkedData"
      :selectOps="selectOps"
      @selectOption="handleSelect"
      @updateList="updateCheckedList"
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
        { label: '地市', value: 1 },
        { label: '区县', value: 2 },
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
    handleSelect(value, label) {
      console.log(value, label);
    }
  },
};
</script>
<style lang="less" scoped>
.area-select {
  display: flex;
  width: 100%;
}
</style>
