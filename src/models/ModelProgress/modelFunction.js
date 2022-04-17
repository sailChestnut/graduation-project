import { findCourse } from '../../services/courseFunction'
import { findExam } from '../../services/examFunction'
import { findPersonal } from '../../services/personalFunction'
import { findReplayAnswer } from '../../services/replayAnswerFunction'
import { findStudent } from '../../services/studentFunction'
import { findTeacher } from '../../services/teacherFunction'

export default {
  namespace: 'modelFunction',
  state: {
    personList: [],
  },
  effects: {
    // 课程表
    *findCourse({ payload }, { call }) {
      const data = yield call(findCourse, payload)
      return data;
    },

    // 考试安排
    *findExam({ payload }, { call }) {
      const data = yield call(findExam, payload)
      return data;
    },

    // 个人中心
    *findPersonal({ payload }, { call, put, select }) {
      const data = yield call(findPersonal, payload)
      const { code, result } = data;
      if (code === 200) {
        yield put({
          type: 'save',
          payload: {
            personList: result,
          },
        })
        // yield select
      } else {
        yield put({
          type: 'save',
          payload: {
            personList: [],
          },
        })
      }
      return data;
    },

    // 问题答疑
    *findReplayAnswer({ payload }, { call }) {
      const data = yield call(findReplayAnswer, payload)
      return data;
    },

    // 学生表
    *findStudent({ payload }, { call }) {
      const data = yield call(findStudent, payload)
      return data;
    },

    // 教师表
    *findTeacher({ payload }, { call }) {
      const data = yield call(findTeacher, payload)
      return data;
    },

  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
}