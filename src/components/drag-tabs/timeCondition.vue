<!-- 时间条件 -->
<template>
  <div class="time-condition">
    <div class="time-condition__title">
      <h3 style="padding-left: 18px">第1步：输入时间条件配置</h3>
    </div>
    <div class="time-condition__body">
      <el-form ref="form" :model="form" label-width="90px" size="small">
        <el-form-item label="时间类型:">
          <el-radio-group v-model="form.timeType">
            <el-radio label="时间范围">时间范围</el-radio>
            <el-radio label="时间点">时间点</el-radio>
            <el-radio label="无时间">无时间</el-radio>
          </el-radio-group>
        </el-form-item>
        <template v-if="form.timeType !== '无时间'">
          <el-form-item label="区域设置:">
            <el-radio-group v-model="form.areaSetting">
              <el-radio label="年份">年份</el-radio>
              <el-radio label="月份">月份</el-radio>
              <el-radio label="日期">日期</el-radio>
              <el-radio label="时间段">时间段</el-radio>
            </el-radio-group>
          </el-form-item>
          <!-- 动态 -->
          <el-form-item :label="curOption.label">
            <el-date-picker
              v-model="form.startDate"
              :type="curOption.type"
              :placeholder="curOption.placeholder"
              :value-format="curOption.valueFormat"
            />
            <template v-if="curOption.endHolder">
              <span> ~ </span>
              <el-date-picker
                v-model="form.endDate"
                :type="curOption.type"
                :placeholder="curOption.endHolder"
                :value-format="curOption.valueFormat"
              />
            </template>
          </el-form-item>
        </template>
        <el-form-item v-else label="">
          <div class="noTime">
            <i class="el-icon-warning" style="color: #faad14"></i>
            无需输入时间维度信息，默认取最新的数据，如画像信息、职业标签等。
          </div>
        </el-form-item>
        <el-form-item label="">
          <div class="result">已输入时间条件：{{ result }}</div>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary">下一步</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { options } from './static';
export default {
  name: 'time-condition',
  components: {},
  data() {
    return {
      form: {
        timeType: '时间范围',
        areaSetting: '月份',
        startDate: '',
        endDate: '',
      },

      pickerOptions: options,
    };
  },
  computed: {
    selectTime() {
      const { startDate, endDate } = this.form;
      if (!endDate) {
        return startDate;
      }
      return `${startDate},${endDate}`;
    },
    result() {
      const { timeType, areaSetting } = this.form;
      return `${timeType}、${areaSetting}、${this.selectTime}`;
    },
    curOption() {
      const { timeType, areaSetting } = this.form;
      return this.pickerOptions[`${timeType}-${areaSetting}`];
    },
  },
  watch: {
    curOption() {
      Object.assign(this.form, {
        startDate: '',
        endDate: '',
      });
    },
  },
};
</script>

<style lang="less" scoped>
.time-condition {
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
