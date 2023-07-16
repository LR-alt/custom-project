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
    { prop: 'creatorName', label: '创建人', colspan: 2 },
    { prop: 'createTime', label: '创建时间' },
    { prop: 'creator', label: 'creator' },
  ],
  [
    { prop: 'affairType', label: '事物类型', required: true },
  ],
  [
    { prop: 'isEffect', label: '是否立即失效' }
  ],
  [
    { prop: 'remindObject', label: '提醒对象' }
  ],
  [
    {
      label: '详情1',
      grids: 5,
      children: [
        {
          label: '详情1-2',
          children: [
            { label: '详情1-1-1', prop: 'tub1' },
            { label: '详情1-1-2', prop: 'tub2' },
          ]
        },
        { label: '详情1-3', prop: 'sub3' },
        { prop: 'sub1' },
      ]
    },
    {
      label: '详情2',
      grids: 3,
      children: [
        { label: '详情2-1', prop: 'sub4', rowspan: 2 },
        { label: '详情2-2', prop: 'sub5', rowspan: 2 },
      ]
    },
  ],
  [
    { prop: 'smsContent', label: '短信内容', required: true, customTip: '短信内容不能为空' }
  ],
]


export {
  affairColsLast,
}