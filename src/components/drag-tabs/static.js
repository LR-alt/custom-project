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
    /*  checked: false,
    indeterminate: false,  */
    children: [
      {
        label: '广州市',
        /*  checked: false,
        indeterminate: false,  */
        children: [
          {
            label: '天河区',
            checked: false,
          },
        ],
      },
      {
        label: '深圳市',
        /* checked: false,
        indeterminate: false,  */
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
    /* checked: false,
    indeterminate: false,  */
    children: [
      {
        label: '杭州市',
        /*  checked: false,
        indeterminate: false, */
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
    label: '江西省',
    /* checked: false,
    indeterminate: false, */
    children: [
      {
        label: '九江市',
        /*  checked: false,
        indeterminate: false, */
        children: [
          {
            label: '濂溪区',
            checked: false,
          },
          {
            label: '柴桑区',
            checked: false,
          },
          {
            label: '八里湖区',
            checked: false,
          },
        ],
      },
      {
        label: '南昌市',
        /* checked: false,
        indeterminate: false, */
        children: [
          {
            label: '新建区',
            checked: false,
          },
          {
            label: '高健区',
            checked: false,
          },
          {
            label: '红谷区',
            checked: false,
          },
        ],
      },
      {
        label: '吉安市',
        /* checked: false,
        indeterminate: false, */
        children: [
          {
            label: '吉州区',
            checked: false,
          },
          {
            label: '清远区',
            checked: false,
          },
        ],
      },
    ],
  },
  {
    label: '湖北省',
    /* checked: false,
    indeterminate: false, */
    children: [
      {
        label: '武汉市',
        /*    checked: false,
        indeterminate: false, */
        children: [
          {
            label: '江岸区',
            checked: false,
          },
          {
            label: '江汉区',
            checked: false,
          },
          {
            label: '汉阳区',
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
    children: [
      {
        label: '广州市',
      },
      {
        label: '深圳市',
      },
    ],
  },
  {
    label: '浙江省',

    children: [
      {
        label: '杭州市',
      },
    ],
  },
  {
    label: '江西省',

    children: [
      {
        label: '九江市',
      },
      {
        label: '南昌市',
      },
      {
        label: '吉安市',
      },
    ],
  },
  {
    label: '湖北省',
    children: [
      {
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
export { options, tree, twoTree, oneTree };
