const getFormCols = (type) => {
    return [
        [
            {
                tag: 'el-input',
                label: '考试名称：',
                prop: 'name',
                type: 'text',
                grid: 6,
            },
            {
                tag: 'el-select',
                label: '考试等级：',
                prop: 'level',
                opts: [
                    { label: 'L1', value: 'L1' },
                    { label: 'L2', value: 'L2' },
                    { label: 'L3', value: 'L3' },
                ],
                grid: 6,
            },
            {
                tag: 'el-select',
                label: '考试专业：',
                prop: 'major',
                opts: [],
                grid: 6,
            },
            {
                tag: 'el-select',
                label: '认证级别：',
                prop: 'certify_level',
                opts: new Array(9).fill('级').map((val, inx) => ({ label: `${inx + 1}${val}`, value: `${inx + 1}${val}` })),
                grid: 6,
                hidden: type === 'all'
            },
            {
                tag: 'el-select',
                label: '是否已使用：',
                prop: 'is_availability',
                labelWidth: '90px',
                opts: [
                    { label: '是', value: '是' },
                    { label: '否', value: '否' },
                ],
                grid: 6,
                hidden: type === 'declared'
            },
        ].filter(item => !item.hidden),
        [
            {
                tag: 'el-select',
                label: '是否过期：',
                prop: 'is_expired',
                opts: [
                    { label: '已过期', value: '已过期' },
                    { label: '未过期', value: '未过期' },
                ],
                grid: 6,
                hidden: type === 'declared'
            },
             {
                tag: 'el-select',
                label: '认证专业：',
                prop: 'certify_position',
                opts: [],
                grid: 6,
                hidden: type === 'all'
            },
            {
                tag: 'el-select',
                label: '认证类型：',
                prop: 'certify_type',
                opts: [],
                grid: 6,
                hidden: type === 'all'
            },
            {
                tag: 'el-select',
                label: '报名状态：',
                prop: 'certify_status',
                opts: [
                    { label: '待上传', value: '待上传' },
                    { label: '已上传', value: '已上传' },
                ],
                grid: 6,
                hidden: true || type === 'all'
            },
            {
                type: 'tool-btn',
                grid: 6,
            }
        ].filter(item => !item.hidden),
    ];
};

export {
    getFormCols,
}