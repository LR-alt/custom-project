<!-- 区域对选择、省/市/县组件 -->
<template>
  <div class="areaPair-select">
    <div class="areaPair-select__source">
      <subAreaSelect :areaType="areaType" :panelLevels="mapPanelLevels[areaType]" :title="`源${areaType}`" isVertical />
    </div>
    <div class="areaPair-select__target">
      <subAreaSelect :areaType="areaType" :panelLevels="mapPanelLevels[areaType]" :title="`目的${areaType}`" isVertical />
    </div>
  </div>
</template>

<script>
import subAreaSelect from './subAreaSelect.vue';
export default {
  name: 'areaPair-select',
  props: {
    areaType: {
      type: String,
      default: '',
    },
  },
  components: {
    subAreaSelect,
  },
  data() {
    return {
      mapPanelLevels: {
        '省份': 1,
        '城市': 2,
        '区县': 3,
      }
    };
  },
  mounted() {},
  watch: {},
  methods: {
   
  },
};
</script>
<style lang="less" scoped>
.areaPair-select {
  display: flex;
  width: 100%;
  &__source {
    margin-right: 6px;
  }
}
</style>
