import { types } from './actions'

const initialState = {
  _enrolling: false,
  _recognizing: false
}

function reducer (state = initialState, action) {
  switch (action.type) {
    case types.RECOGNIZE_BEGIN:
      return {
        ...state,
        _recognizing: true
      }
    case types.RECOGNIZE_SUCCESS:
    case types.RECOGNIZE_FAIL:
      return {
        ...state,
        _recognizing: false
      }

    case types.ENROLL_BEGIN:
      return {
        ...state,
        _enrolling: true
      }
    case types.ENROLL_SUCCESS:
    case types.ENROLL_FAIL:
      return {
        ...state,
        _enrolling: false
      }
    default:
      return state
  }
}

export default reducer
