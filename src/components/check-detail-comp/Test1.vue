<template>
  <div>
    <checkDetail :srcData="srcData"/>
  </div>
</template>

<script>
import checkDetail from './check-detail1.vue';
export default {
  name: 'test-comp',
  components: {
    checkDetail,
  },
  data() {
    return {
      srcData: [
        [
          {
            label: '标题',
            prop: 'name',
            value: '交接班 2022-09-23 (夜班)',
          },
        ],
        [
          {
            label: '值班人员',
            prop: 'dutyUser',
            value: '丁鸣宇 '.repeat(23),
          },
        ],
        [
          {
            label: '交班人',
            prop: 'dutyClass',
            value: '陈宏(安全监控岗)',
          },
        ],
        [
          {
            label: '值班时间',
            prop: 'dutyDate',
            value: '2022-09-22 17:30:00 至 2022-09-23 09:00:00',
          },
        ],
        [
          {
            label: 'Groups',
            subLabel: '组1',
            prop: 'group1',
            value: 'group one',
            rRowspan: 4 
          },
        ],
        [
          {
            subLabel: '组2',
            prop: 'group2',
            value: 'group two',
          },
        ],
        [
          {
            subLabel: '组3',
            prop: 'group3',
            value: 'group three',
          },
        ],
        [
          {
            subLabel: '组4',
            prop: 'group4',
            value: 'group four',
          },
        ],
        [
          {
            label: 'TOTAL',
            prop: 'total',
            value: '',
          },
        ],
      ],
    };
  },
  methods: {},
};
</script>

<style lang="less" scoped></style>
