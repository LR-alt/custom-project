<!--
待定：将使用jsx去封装
-->
<template>
  <div class="task-info">
    <el-form :model="form" :rules="rules" size="small" inline>
      <el-row v-for="(row, inx) in formOptions" :key="inx">
        <el-col v-for="item in row" :key="item.prop" :span="item.span">
          <el-form-item :label="item.label" :prop="item.prop">
            <el-input
              v-if="item.tag === 'input'"
              v-model="form[item.prop]"
              type="text"
              :maxlength="item.maxLength"
              placeholder=""
              show-word-limit
            />
            <el-cascader
              v-else-if="item.tag === 'cascader'"
              v-model="form[item.prop]"
              class="w-full"
              :options="item.options"
              :props="{ multiple: true }"
              collapse-tags
              clearable
            />
            <el-select v-else-if="item.tag === 'select'" v-model="form[item.prop]" class="w-full">
              <el-option
                v-for="op in item.options"
                :key="op.value"
                :label="op.label"
                :value="op.value"
              />
            </el-select>
            <customCategory
              v-else-if="item.tag === 'custom'"
              v-model="form[item.prop]"
              class="w-full"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import customCategory from './customCategory.vue';
import { formOptions } from './static';
export default {
  name: 'task-info',
  components: {
    customCategory,
  },
  props: {
    taskType: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      form: {
        taskName: '',
        classify: [],
        templateVisible: '',
        customCategory: [
          'type one',
          'type two',
          'type three',
          'type four',
          'type five',
          'type six',
          'type seven',
          'type eight',
        ],
        description: '',
      },
      rules: {
        taskName: [{ required: true, message: '请输入', trigger: 'blur' }],
      },
    };
  },
  computed: {
    formOptions() {
      if (this.taskType === 'taskCreate') {
        return formOptions.filter((item) => item.prop !== 'templateVisible');
      }

      return formOptions;
    },
  },
};
</script>

<style lang="less" scoped>
.task-info {
  padding-left: 5px;
  padding-top: 12px;
  display: flex;
  align-items: center;
  // height: 54px;
  box-sizing: border-box;
  border-bottom: 1px solid #ccc;
  border-top: 1px solid #ccc;
  .el-form {
    width: 100%;
    .el-form-item {
      display: flex;
      margin-bottom: 12;
    }
    /deep/ .el-form-item__label {
      margin-bottom: 0;
    }
    /deep/ .el-form-item__content {
      flex: 1;
    }
  }
}
.w-full {
  width: 100%;
}
</style>
