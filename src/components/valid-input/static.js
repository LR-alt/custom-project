/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-05-08 21:26:38
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-05-31 22:53:59
 * @FilePath: \mtex-static-evase:\componyProject\element-comps\elementui-common-comps\src\components\valid-input\static.js
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */

const affairColsLast = [
  [
    { prop: 'creatorName', label: '创建人', span: 2 },
    { prop: 'createTime', label: '创建时间' },
    { prop: 'creator', label: 'creator' },
  ],
  [
    { prop: 'affairType', label: '事物类型' },
  ],
  [
    { prop: 'isEffect', label: '是否立即失效' }
  ],
  [
    { prop: 'remindObject', label: '提醒对象' }
  ],
  [
    {
      label: '是否立即生效',
      grids: 5,
      children: [
        { prop: 'sub1' },
        {
          label: '子详情2',
          children: [
            { label: '孙详情1', prop: 'tub1', colspan: 2},
            { label: '孙详情2', prop: 'tub2', colspan: 2},
          ]
        },
        { label: '子详情3 ', prop: 'sub3' },
      ]
    },
    {
      label: '列阵',
      rowspan: 4,
      grids: 3,
      children: [
        {label: '列2', prop: 'col2', rowspan: 2, colspan: 1},
        {label: '列2.2', prop: 'col2.2', rowspan: 2, colspan: 1},
      ]
    },
  ],
  [
    { prop: 'smsContent', label: '短信内容' }
  ],
]
export {
  affairColsLast,
}