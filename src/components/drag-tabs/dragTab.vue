<template>
  <div class="write-task">
    <el-tabs
      class="write-task__tabs"
      v-model="curTabValue"
      type="border-card"
      @keydown.native.capture.stop
    >
      <el-tab-pane v-for="item in editTabs" :name="item.name" :key="item.name">
        <!-- 动态tab页签 -->
        <span slot="label">
          <!-- 文本 -->
          <div class="wrap">
            <el-input
              v-if="item.isEdit"
              v-focus
              class="edit-label"
              v-model="item.title"
              size="mini"
              @blur="handleBlur(item)"
            />
            <span class="text" :style="{ visibility: !item.isEdit ? 'visible' : 'hidden' }">
              {{ item.title }}
            </span>
          </div>
          <!-- 下拉菜单 -->
          <el-dropdown size="small" @command="(command) => handleCommand(command, item)">
            <span class="el-dropdown-link">
              <i class="el-icon-edit edit-icon"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="rename">重命名</el-dropdown-item>
              <el-dropdown-item command="copy">复制</el-dropdown-item>
              <el-dropdown-item command="delete">删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </span>
        <!-- 页签主体 -->
        <conditionSetting :taskData="item.taskData" />
      </el-tab-pane>
      <!-- 添加功能 -->
      <el-tab-pane class="add-plus-plus-plus" name="add" disabled>
        <span slot="label">
          <i class="el-icon-circle-plus-outline" @click="handleAdd"></i>
        </span>
      </el-tab-pane>
    </el-tabs>
    <!-- 复制子任务弹窗 -->
    <el-dialog
      class="write-task__copyTask"
      title="复制子任务"
      :visible.sync="dialogVisible"
      width="30%"
      destroy-on-close
    >
      <el-form :model="subTaskForm" size="small" inline>
        <el-form-item label="可选择复制子任务：">
          <el-select v-model="subTaskForm.taskName">
            <el-option v-for="(item, inx) in subTaskOps" :key="inx" :value="item.value" />
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="copyTask">确 定</el-button>
      </span>
    </el-dialog>
    <!-- test component -->
    <testCheckedBox />
  </div>
</template>
<script>
import conditionSetting from './conditionSetting.vue';
import testCheckedBox from './testCheckedBox.vue';
export default {
  name: 'write-task',
  components: {
    conditionSetting,
    testCheckedBox
  },
  data() {
    return {
      curTabValue: '1',
      editTabs: [
        {
          title: '长途司机驻停统计',
          name: '0',
          order: 0,
          taskData: [],
          isEdit: false,
        },
        {
          title: '子任务1',
          name: '1',
          order: 1,
          taskData: [],
          isEdit: false,
        },
      ],
      dialogVisible: false,
      subTaskForm: {
        taskName: '',
      },
      subTaskOps: [],
    };
  },
  computed: {
    maxIndex() {
      return Math.max(...this.editTabs.map((item) => item.order));
    },
  },
  directives: {
    focus: {
      // 指令的定义
      inserted(el) {
        el.querySelector('.el-input__inner').focus();
      },
    },
  },
  methods: {
    handleEdit(item) {
      item.isEdit = true;
    },
    handleBlur(item) {
      item.isEdit = false;
    },
    handleAdd() {
      const lastInx = String(this.maxIndex + 1);
      this.editTabs.push({
        title: `子任务${lastInx}`,
        name: lastInx,
        order: +lastInx,
        isEdit: false,
      });
      this.curTabValue = String(lastInx);
    },
    removeTab(targetName) {
      let tabs = this.editTabs;
      let activeName = this.curTabValue;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      }
      this.curTabValue = activeName;
      this.editTabs = tabs.filter((tab) => tab.name !== targetName);
    },
    handleCommand(command, item) {
      if (command === 'rename') {
        item.isEdit = true;
      } else if (command === 'copy') {
        this.subTaskOps = this.editTabs
          .filter((tab) => !['0', item.name].includes(tab.name))
          .map((tab) => ({ label: tab.title, value: tab.title }));
        this.subTaskForm.taskName = this.subTaskOps[0] && this.subTaskOps[0].value;
        this.dialogVisible = true;
      } else {
        this.removeTab(item.name);
      }
    },
    copyTask() {},
  },
};
</script>

<style lang="less" scoped>
.write-task {
  height: 100%;
  padding: 12px;
  &__tabs {
    height: 100%;
    border: 1px solid #ccc;
    .el-tab-pane {
      height: 100%;
    }
    /deep/ & > .el-tabs__header {
      margin-bottom: 0;
      .el-tabs__item {
        height: 40px;
        line-height: 40px;
        &:last-of-type {
          padding: 0 10px;
          color: #909399;
          font-size: 16px;
          border-left-color: #dcdfe6;
          border-right-color: transparent;
          &:hover {
            color: #3978fb;
            cursor: pointer;
          }
        }
        &.is-active {
          border-bottom: 2px solid #3978fb;
        }
        .wrap {
          display: inline-block;
          position: relative;
          .edit-label {
            position: absolute;
            /deep/ .el-input__inner {
              padding: 0 2px 0 4px;
              min-width: 40px;
            }
          }
          .text {
            display: inline-block;
            min-width: 40px;
          }
        }
      }
      .edit-icon {
        margin-left: 6px;
      }
    }
    /deep/ & > .el-tabs__content {
      padding: 0px !important;
      height: calc(100% - 39px);
    }
  }
  &__copyTask {
    /deep/ .el-dialog__header {
      padding-top: 10px;
      border-bottom: 1px solid #ccc;
      .el-dialog__title {
        font-size: 16px;
        font-weight: bold;
      }
      .el-dialog__headerbtn {
        top: 14px;
      }
    }
    /deep/ .el-dialog__body {
      .el-form {
        .el-form-item {
          display: flex;
          margin: 0;
          &__content {
            flex: 1;
            .el-select {
              width: 100%;
            }
          }
        }
      }
    }
    /deep/ .el-dialog__footer {
      padding-bottom: 10px;
      border-top: 1px solid #ccc;
    }
  }
}
.w-70 {
  width: 70%;
}
</style>
