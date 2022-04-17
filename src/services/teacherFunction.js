export function findTeacher() {
  return new Promise((res) => {
    res({
      code: 200,
      total: 2,
      result: [{
        key: 1,
        teacherID: 1234567,
        teacherName: '李四',
        teacherStatus: '选修',
        biography: '南昌大学，商学院',
        teacherSubjects: '税法',
        affiliation: '商学院学院',
        teaTelephone: 123456878,
        teaAddress: '青山湖区双港东大街66号',
      }, {
        key: 2,
        teacherID: 56556558,
        teacherName: '张三',
        teacherStatus: '必修',
        biography: '南昌大学，软件学院，哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈',
        teacherSubjects: 'JAVA',
        affiliation: '软件工程学院',
        teaTelephone: 13636363663,
        teaAddress: '红谷滩新区34号',
      }],
    })
  })
}