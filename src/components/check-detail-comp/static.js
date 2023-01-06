/*
 * @Date: 2022-10-28 11:11:45
 * @LastEditors: 刘荣 liurong@mastercom.cn
 * @LastEditTime: 2022-11-28 20:25:36
 * @FilePath: \common-project\elementui-component\src\components\check-detail-comp\static.js
 */
const columns = [
  {
    prop: 'name',
    width: 110,
  },
  {
    prop: 'content1',
    width: 110,
  },
  {
    prop: 'content2',
  },
];

const tableData = [
  {
    name: '标题',
    content1: 'title',
    content2: '',
  },
  {
    name: '值班人员',
    content1: 'dutyOfficer',
    content2: '',
  },
  {
    name: '交班人',
    content1: 'shift',
    content2: '',
  },
  {
    name: '值班时间',
    content1: 'dutyDate',
    content2: '',
  },
  {
    name: '本班级内容',
    content1: '已完成事件',
    content2: 'alreadyEvent',
  },
  {
    name: '本班级内容',
    content1: '综合监控一组',
    content2: 'monitorGroupOne',
  },
  {
    name: '本班级内容',
    content1: '综合监控2组',
    content2: 'monitorGroupTwo',
  },
  {
    name: '本班级内容',
    content1: '综合监控3组',
    content2: 'monitorGroupThree',
  },
  {
    name: '本班级内容',
    content1: '综合监控4组',
    content2: 'monitorGroupFourth',
  },
  {
    name: '总结',
    content1: 'summary',
    content2: '',
  },
];

const requestData = {
  title: '交换班2022-10-11',
  dutyOfficer: '宋玉'.repeat(26),
  shift: '景荣', // 3，1
  dutyDate: '2022-02-03', // 0， 1
  alreadyEvent: '1.发士大夫电风扇犯得上发<br/>'.repeat(4),
  monitorGroupOne: 'null',
  monitorGroupTwo: null,
  monitorGroupThree: '★★',
  monitorGroupFourth: '0',
  summary: '10月11日09:20，昆明本地网OTN平面寻甸县清水海（备用）一平面环4--寻甸县马街-一平面环4(市县波分)中断；',
};
// 将 requestData 数据映射到 tableData 中
tableData.forEach(item => {
  if (item.name === '本班级内容') {
    item.content2 = requestData[item.content2];
  } else {
    item.content1 = requestData[item.content1];
  }
})

export { columns, tableData };
