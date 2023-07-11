const treeData = [
    {
        label: '规章制度',
        account: 23,
        id: 1,
        children: [
            {
                label: '监控大值班管理规范',
                id: 2,
                children: [
                    { label: '文档1', id: 4 },
                    { label: '文档2', id: 5 },
                    { label: '文档3', id: 6 },
                    { label: '文档4', id: 7 },
                    { label: '文档5', id: 8 },
                    { label: '文档6', id: 9 },
                    { label: '文档7', id: 10 },
                    { label: '文档8', id: 11 },
                ],
            },
            {
                label: '监控大值班1',
                id: 3,
                children: [
                    { label: '文档1', id: 4 },
                    { label: '文档2', id: 5 },
                    { label: '文档3', id: 6 },
                ],
            },
            {
                label: '文档1',
                id: 90,
                children: [],
            },
        ],
    },
    {
        label: '规章报告',
        account: 23,
        id: 2,
        children: [
            {
                label: '报告流程',
                id: 21,
                children: [
                    { label: '规章1', id: 24 },
                    { label: '规章2', id: 25 },
                    { label: '规章3', id: 26 },
                ],
            },
        ],
    },
]

export {
    treeData,
}