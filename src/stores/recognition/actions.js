import * as Kairos from 'src/lib/Kairos'

export const types = {}

types.ENROLL_BEGIN = 'ENROLL_BEGIN'
types.ENROLL_SUCCESS = 'ENROLL_SUCCESS'
types.ENROLL_FAIL = 'ENROLL_FAIL'

types.RECOGNIZE_BEGIN = 'RECOGNIZE_BEGIN'
types.RECOGNIZE_SUCCESS = 'RECOGNIZE_SUCCESS'
types.RECOGNIZE_FAIL = 'RECOGNIZE_FAIL'

export function enrollBegin () {
  return {
    type: types.ENROLL_BEGIN
  }
}
export function enrollFail (error) {
  return {
    type: types.ENROLL_FAIL,
    error
  }
}
export function enrollSuccess () {
  return {
    type: types.ENROLL_SUCCESS
  }
}
export function enroll ({ image, subjectId }) {
  return function (dispatch) {
    dispatch(enrollBegin())
    return Kairos.enroll({ image, subjectId })
      .then(response => {
        if (response.Errors) {
          dispatch(enrollFail(response.Errors[0]))
        } else {
          dispatch(enrollSuccess())
        }
        return response
      })
  }
}

export function recognizeBegin () {
  return {
    type: types.RECOGNIZE_BEGIN
  }
}
export function recognizeFail (error) {
  return {
    type: types.RECOGNIZE_FAIL,
    error
  }
}
export function recognizeSuccess (recognizeResult) {
  return {
    type: types.RECOGNIZE_SUCCESS,
    payload: recognizeResult
  }
}
export function recognize ({ image }) {
  return function (dispatch) {
    dispatch(recognizeBegin())
    return Kairos.recognize({ image })
      .then(response => {
        if (response.Errors) {
          dispatch(recognizeFail(response.Errors[0]))
        } else {
          dispatch(recognizeSuccess())
        }
        return response
      })
  }
}
