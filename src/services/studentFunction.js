export function findStudent() {
  return new Promise((res) => {
    res({
      code: 200,
      total: 2,
      result: [{
        key: 1,
        studentID: 1234567,
        studentName: '李四',
        gender: '男',
        class: '人力一班',
        affiliation: '商学院',
        enrollmentTime: '2022-09-9',
        stuTelephone: '16272377394',
        stuAddress: '双港东大街112号',
      }, {
        key: 2,
        studentID: 56556558,
        studentName: '张三',
        gender: '男',
        class: '人力二班',
        affiliation: '软件工程学院',
        enrollmentTime: '2019-09-09',
        stuTelephone: '12237862439',
        stuAddress: '红谷滩新区34号',
      }],
    })
  })
}