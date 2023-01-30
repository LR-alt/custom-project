<!-- 时间条件配置组件 -->
<template>
  <div class="position-condition">
    <div class="position-condition__title">
      <h3 class="title">第2步：输入地理条件配置</h3>
    </div>
    <div class="position-condition__body">
      <el-form ref="form" :model="form" label-width="90px" size="small">
        <el-form-item label="区域类型:">
          <el-radio-group v-model="form.areaType">
            <el-radio label="区域">区域</el-radio>
            <el-radio label="区域对">区域对</el-radio>
            <el-radio label="区域绘制">区域绘制</el-radio>
          </el-radio-group>
        </el-form-item>
        <template v-if="form.areaType !== '区域绘制'">
          <el-form-item label="区域设置:">
            <el-radio-group v-model="form.areaSetting">
              <el-radio label="省份">省份</el-radio>
              <el-radio label="城市">城市</el-radio>
              <el-radio label="区县">区县</el-radio>
              <el-radio label="多边形区域">多边形区域</el-radio>
              <el-radio label="位置点">位置点</el-radio>
              <el-radio label="无范围">无范围</el-radio>
            </el-radio-group>
          </el-form-item>
          <!-- 动态 -->
          <el-form-item v-if="form.areaSetting !== '无范围'" label="选择区域">
            <selectArea />
            <selectedLabels />
          </el-form-item>
          <el-form-item v-else label="">
            <div class="noTime">
              <i class="el-icon-warning" style="color: #faad14"></i>
              无需输入地理维度信息，默认取最新的数据，如画像信息、职业标签等。
            </div>
          </el-form-item>
        </template>
        <!-- 区域绘制 -->
        <div v-else>
          地图绘制
        </div>
        <!-- 结果 -->
        <el-form-item label="">
          <div class="result">已输入地理条件：{{ result }}</div>
        </el-form-item>
        <!-- 下一步 -->
        <el-form-item label="">
          <el-button type="primary">下一步</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import selectArea from './selectArea.vue';
import selectedLabels from './selectedLabels.vue';
export default {
  name: 'position-condition',
  components: {
    selectArea,
    selectedLabels,
  },
  data() {
    return {
      form: {
        areaType: '区域',
        areaSetting: '省份',
      },
    };
  },
  computed: {
    result() {
      const { areaType, areaSetting } = this.form;
      return `${areaType}、${areaSetting}`;
    },
  },
  watch: {
   
  },
};
</script>

<style lang="less" scoped>
.position-condition {
  &__title {
    .title {
      margin-bottom: 16px;
      padding-left: 18px;
      font-size: 20px;
      font-weight: bold;
    }
  }
  &__body {
    .el-form {
      .el-radio-group {
        display: inline-flex;
        padding: 0 10px;
        align-items: center;
        height: 32px;
        border: 1px solid #dedede;
        .el-radio {
          margin-bottom: 0;
        }
      }
      .el-date-editor {
        width: 190px;
      }
      .noTime {
        display: inline-block;
        padding: 0 12px;
        border: 1px solid #ffe58f;
        background-color: #fffbe6;
      }
      .result {
        display: inline-block;
        padding: 0 12px;
        border: 1px solid #8db2fe;
        background-color: #edf3ff;
      }
    }
  }
}
</style>
