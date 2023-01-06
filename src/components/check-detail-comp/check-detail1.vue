<template>
  <div class="check-detail el-table__body-wrapper">
    <table class="check-detail__table el-table__body" border cellpadding="0" cellspacing="0">
      <colgroup>
        <col width="100">
        <col width="100">
        <col width="400">
      </colgroup>
      <tbody>
        <tr class="el-table__row" v-for="(item, inx) in srcData" :key="inx">
          <template v-for="it in item">
            <template v-if="it.label">
              <th :colspan="it.lColspan || 0" :key="it.label + 'th'" :rowspan="it.rRowspan || 1">
                <div class="cell">
                  {{ it.label }}
                </div>
              </th>
            </template>
            <template v-if="it.subLabel">
              <th
                :colspan="it.subLabelColspan || 0"
                :rowspan="it.subLabelRowspan || 1"
                :key="it.subLabel + 'subTh'">
                <div class="cell">
                  {{ it.subLabel }}
                </div>
              </th>
            </template>
            <template v-if="it.value">
              <td :colspan="it.vColspan || 0" :key="it.value + 'td'">
                <div class="cell">
                  {{ it.value }}
                </div>
              </td>
            </template>
          </template>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
// import checkTableColumn from './check-table-column.vue';
export default {
  name: 'check-detail',
  props: {
    srcData: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    // checkTableColumn,
  },
  data() {
    return {
      /* srcData: [
        [
          {
            label: '用户号码',
            value: '187****1472',
          },
          {
            label: '姓名',
            value: '李敏',
          },
            {
            label: '身份证号',
            value: '360****6979',
          },
        ],
        [
          {
            label: '流调发起时间',
            value: '2022-12-08 09:17:48',
          },
          {
            label: '短信发送时间',
            value: '2022-11-22 10:28:55',
          },
          {
            label: '流调反馈时间',
            value: '2022-11-18 15:19:08',
          },
        ],
      ], */
    };
  },
};
</script>

<style lang="less" scoped>
.check-detail {
  &__table {
    border-color: #ebeef5;
    font-size: 12px;
    th,
    td {
      display: table-cell;
      padding: 8px 0;
      border-color: #ebeef5;
      min-width: 0;
      box-sizing: border-box;
      text-overflow: ellipsis;
      vertical-align: middle;
      position: relative;
      text-align: left;
    }
    th {
      font-size: 13px;
      font-weight: bold;
      background-color: #f5f7fa;
    }
    .cell {
      box-sizing: border-box;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: normal;
      word-break: break-all;
      line-height: 23px;
      padding-right: 10px;
      padding-left: 10px;
    }
  }
}
</style>
