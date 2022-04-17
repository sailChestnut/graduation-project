// import request from '../utils/request'
// import axios from 'axios';

// export function findCourse(params) {
//   return axios.post('/findAll/course', params).then((res) => {
//     return res.data.result
//   }).catch((err) => console.log(err))
// }
// return request('/findAll/course', {
//   params,
//   ...options,
// })


export function findCourse() {
  return new Promise((res) => {
    res({
      code: 200,
      result: [{
        courseName: '高数',
        courseNature: '选修',
        courseTeacher: '杨老师',
        courseTime: 11,
        courseStart: '2022-01-02',
        courseStatus: '未开课',
      }],
    })
  })
}