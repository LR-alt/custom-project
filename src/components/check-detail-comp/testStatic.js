/*
 * @Date: 2022-10-28 11:11:45
 * @LastEditors: 刘荣 liurong@mastercom.cn
 * @LastEditTime: 2022-11-29 08:17:50
 * @FilePath: \common-project\elementui-component\src\components\check-detail-comp\testStatic.js
 */
const columns = [
  {
    prop: 'label',
    width: 110,
  },
  {
    prop: 'subLabel',
    width: 110,
  },
  {
    prop: 'value',
  },
];

const tableData = [
  { 
    prop: 'title',
    label: '标题',
    value: ''
  },
  {
    prop: 'dutyOfficer',
    label: '值班人员',
    value: '',
  },
  {
    prop: 'shift',
    label: '交班人',
    value: '',
  },
  {
    prop: 'dutyDate',
    label: '值班时间',
    value: '',
  },
  {
    prop: 'monitorGroupOne',
    label: '本班级内容',
    subLabel: '综合监控1组',
    value: '',
  },
  {
    prop: 'monitorGroupTwo',
    label: '本班级内容',
    subLabel: '综合监控2组',
    value: '',
  },
  {
    prop: 'monitorGroupThree',
    label: '本班级内容',
    subLabel: '综合监控3组',
    value: '',
  },
  {
    prop: 'monitorGroupFourth',
    label: '本班级内容',
    subLabel: '综合监控4组',
    value: '',
  },
  {
    prop: 'summary',
    label: '总结',
    value: '',
  },
]
const requestData = {
  title: '交换班2022-10-11',
  dutyOfficer: '宋玉'.repeat(26),
  shift: '景荣', // 3，1
  dutyDate: '2022-02-03', // 0， 1
  alreadyEvent: '1.发士大夫电风扇犯得上发<br/>'.repeat(4),
  monitorGroupOne: 'one',
  monitorGroupTwo: 'two',
  monitorGroupThree: '★★★',
  monitorGroupFourth: '★★★★',
  summary: '10月11日09:20，昆明本地网OTN平面寻甸县清水海（备用）一平面环4--寻甸县马街-一平面环4(市县波分)中断；',
};
// 将 requestData 数据映射到 tableData 中
tableData.forEach(item => {
  item.value = requestData[item.prop];
})

export { columns, tableData };
