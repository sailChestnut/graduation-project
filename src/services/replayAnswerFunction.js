export function findReplayAnswer() {
  return new Promise((res) => {
    res({
      code: 200,
      result: [
        {
          id: 1,
          title: '计算机操作系统',
          question: '一个进程完成其任务并退出，需要何种基本操作来清除它并继续另一个进程',
          answer: 'hhhhhhh',
        },
        {
          id: 2,
          title: '计算机操作系统',
          question: '证明baker算法和peterson算法并不依赖于存储器访问一级的互斥执行',
          answer: '',
        },
        {
          id: 3,
          title: '计算机操作系统',
          question: '什么叫重定位？区分静态重定位和动态重定位的根据是什么？',
          answer: '',

        },
        {
          id: 4,
          title: '计算机操作系统',
          question: '什么是虚拟存储器？它有哪些基本特征？',
          answer: 'hhhhhhh',

        },
        {
          id: 5,
          title: '计算机操作系统',
          question: '简要概述物理地址、逻辑地址、逻辑地址空间、内存空间',
          answer: '',

        },
        {
          id: 6,
          title: '数据结构',
          question: '字符串是一种特殊的线性表，其特殊性体现在什么地方？',
          answer: '',

        },
        {
          id: 7,
          title: '数据结构',
          question: '将数组称为随机存储结构的原因是什么？',
          answer: '',

        },
        {
          id: 8,
          title: '数据结构',
          question: '设计算法求二叉树的节点个数',
          answer: '',

        },
      ],
    })
  })
}