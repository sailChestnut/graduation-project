export function findExam() {
  return new Promise((res) => {
    res({
      code: 200,
      total: 2,
      result: [
        {
          examContent: '高数第一章',
          subject: '高数',
          examTime: '2022-01-03',
          proctor: '李立',
          examLocation: '明德楼2103',
          examTypes: ['填空题', '计算题', '客观题'],
        },
      ],
    })
  })
}