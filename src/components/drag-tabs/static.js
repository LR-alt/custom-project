const options = {
  '时间点-年份': {
    type: 'year',
    label: '选择年份',
    placeholder: '选择年份',
    valueFormat: 'yyyy',
  },
  '时间点-月份': {
    type: 'month',
    label: '选择月份',
    placeholder: '选择月份',
    valueFormat: 'yyyy-MM',
  },
  '时间点-日期': {
    type: 'date',
    label: '选择日期',
    placeholder: '选择日期',
    valueFormat: 'yyyy-MM-dd',
  },
  '时间点-时间段': {
    type: 'datetime',
    label: '选择时间',
    placeholder: '选择时间段',
    valueFormat: 'yyyy-MM-dd HH:mm:ss',
  },
  '时间范围-年份': {
    type: 'year',
    label: '起止年份',
    placeholder: '开始年份',
    endHolder: '结束年份',
    valueFormat: 'yyyy',
  },
  '时间范围-月份': {
    type: 'month',
    label: '起止月份',
    placeholder: '开始月份',
    endHolder: '结束月份',
    valueFormat: 'yyyy-MM',
  },
  '时间范围-日期': {
    type: 'date',
    label: '起止日期',
    placeholder: '开始日期',
    endHolder: '结束日期',
    valueFormat: 'yyyy-MM-dd',
  },
  '时间范围-时间段': {
    type: 'datetime',
    label: '起止时间',
    placeholder: '开始时间',
    endHolder: '结束时间',
    valueFormat: 'yyyy-MM-dd HH:mm:ss',
  },
};
const tree = [
  {
    label: '广东省',
    value: '10',
    children: [
      {
        label: '广州市',
        value: '100',
        children: [
          {
            label: '天河区',
            value: '1001',
            checked: false,
          },
        ],
      },
      {
        label: '深圳市',
        value: '101',
        children: [
          { label: '宝安区',value: '1011',checked: false },
          { label: '南山区',value: '1012',checked: false },
          { label: '东莞区',value: '1013',checked: false },
          { label: '惠州区',value: '1014',checked: false },
        ],
      },
    ],
  },
  {
    label: '浙江省',
    value: '20',
    children: [
      {
        label: '杭州市',
        value: '200',
        children: [
          {
            label: '五菱区',
            value: '2001',
            checked: false,
          },
        ],
      },
    ],
  },
  {
    label: '江西省',
    value: '30',
    indeterminate: false,
    children: [
      {
        label: '九江市',
        value: '300',
        children: [
          {
            label: '濂溪区',
            value: '3001',
            checked: false,
          },
          {
            label: '柴桑区',
            value: '3002',
            checked: false,
          },
          {
            label: '八里湖区',
            value: '3003',
            checked: false,
          },
        ],
      },
      {
        label: '南昌市',
        value: '301',
        indeterminate: false,
        children: [
          {
            label: '新建区',
            value: '3011',
            checked: false,
          },
          {
            label: '高健区',
            value: '3012',
            checked: false,
          },
          {
            label: '红谷区',
            value: '3013',
            checked: false,
          },
        ],
      },
      {
        label: '吉安市',
        value: '302',
        indeterminate: false,
        children: [
          {
            label: '吉州区',
            value: '3021',
            checked: false,
          },
          {
            label: '清远区',
            value: '3022',
            checked: false,
          },
        ],
      },
    ],
  },
  {
    label: '湖北省',
    value: '40',
    indeterminate: false,
    children: [
      {
        label: '武汉市',
        value: '401',
        children: [
          {
            label: '江岸区',
            value: '4011',
            checked: false,
          },
          {
            label: '江汉区',
            value: '4012',
            checked: false,
          },
          {
            label: '汉阳区',
            value: '4013',
            checked: false,
          },
        ],
      },
    ],
  },
];
const twoTree = [
  {
    label: '广东省',
    value: '1000',
    children: [
      {
        label: '广州市',
        value: '1000',
      },
      {
        label: '深圳市',
        value: '1000',
      },
    ],
  },
  {
    label: '浙江省',
    value: '1000',
    children: [
      {
        label: '杭州市',
        value: '1000',
      },
    ],
  },
  {
    label: '江西省',
    value: '1000',
    children: [
      {
        value: '1000',
        label: '九江市',
      },
      {
        value: '1000',
        label: '南昌市',
      },
      {
        value: '1000',
        label: '吉安市',
      },
    ],
  },
  {
    label: '湖北省',
    value: '1000',
    children: [
      {
        value: '1000',
        label: '武汉市',
      },
    ],
  },
];
const oneTree = [
  {
    label: '广东省',
  },
  {
    label: '浙江省',
  },
  {
    label: '江西省',
  },
  {
    label: '湖北省',
  },
];
const mallTree = [
  {
    label: '商场',
    children: [
      {
        label: '全部',
      },
      {
        label: '南方基地',
      },
      {
        label: '天汇创意园',
      },
      {
        label: '天河智慧城',
      },
      {
        label: '智慧中心',
      },
    ],
  },
  {
    label: '园区',
    children: [
      {
        label: '南山科技园',
      },
      {
        label: '天安云谷',
      },
      {
        label: '金荣达工业园',
      },
      {
        label: '科兴科学园',
      },
    ],
  },
  {
    label: '学校',
    children: [
      {
        label: '宝安中学',
      },
      {
        label: '育才学校',
      },
      {
        label: '博文学校',
      },
    ],
  },
  {
    label: '景区',
    children: [
      {
        label: '世界之窗',
      },
      {
        label: '仙湖植物园',
      },
      {
        label: '大千世界',
      },
    ],
  },
  {
    label: '机场',
    children: [
      {
        label: '宝安国际机场',
      },
      {
        label: '虹桥国际机场',
      },
    ],
  },
  {
    label: '高铁站',
    children: [
      {
        label: '深圳北站',
      },
      {
        label: '光明城站',
      },
    ],
  },
]
export { options, tree, twoTree, oneTree, mallTree };
