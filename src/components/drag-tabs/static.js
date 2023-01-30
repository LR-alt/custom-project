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
    checked: false,
    children: [
      {
        label: '广州市',
        checked: false,
        children: [
          {
            label: '天河区',
            checked: false,
          },
        ],
      },
      {
        label: '深圳市',
        checked: false,
        children: [
          { label: '宝安区', checked: false },
          { label: '南山区', checked: false },
          { label: '东莞区', checked: false },
          { label: '惠州区', checked: false },
        ],
      },
    ],
  },
  {
    label: '浙江省',
    checked: false,
    children: [
      {
        label: '杭州市',
        checked: false,
        children: [
          {
            label: '五菱区',
            checked: false,
          },
        ],
      },
    ],
  },
  {
    label: '浙江省',
    checked: false,
    children: [
      {
        label: '杭州市',
        checked: false,
        children: [
          {
            label: '五菱区',
            checked: false,
          },
        ],
      },
    ],
  },
  {
    label: '浙江省',
    checked: false,
    children: [
      {
        label: '杭州市',
        checked: false,
        children: [
          {
            label: '五菱区',
            checked: false,
          },
        ],
      },
    ],
  },
  {
    label: '浙江省',
    checked: false,
    children: [
      {
        label: '杭州市',
        checked: false,
        children: [
          {
            label: '五菱区',
            checked: false,
          },
        ],
      },
    ],
  },
  {
    label: '浙江省',
    checked: false,
    children: [
      {
        label: '杭州市',
        checked: false,
        children: [
          {
            label: '五菱区',
            checked: false,
          },
        ],
      },
    ],
  },
  {
    label: '浙江省',
    checked: false,
    children: [
      {
        label: '杭州市',
        checked: false,
        children: [
          {
            label: '五菱区',
            checked: false,
          },
        ],
      },
    ],
  },
];

export { options, tree };
