// credentials from https://cameria.herokuapp.com/
// {app_id:"18cac37a",app_key:"b6cd34e621dd6c06efde7e5a82419d68"}
export const APP_ID = '82fcd8fd'
export const APP_KEY = 'ffe68b916e42ac50cda93e9e6bcbbd6d'
export const GALLERY_NAME = 'phunsukhwangdu'

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
    return fetch('https://api.kairos.com/enroll', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        app_id: APP_ID,
        app_key: APP_KEY
      },
      body: JSON.stringify({
        image,
        subject_id: subjectId,
        gallery_name: GALLERY_NAME
      })
    }).then(response => response.json())
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

//
//
//

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
    return fetch('https://api.kairos.com/recognize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        app_id: APP_ID,
        app_key: APP_KEY
      },
      body: JSON.stringify({
        image,
        gallery_name: GALLERY_NAME
      })
    }).then(response => response.json())
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
