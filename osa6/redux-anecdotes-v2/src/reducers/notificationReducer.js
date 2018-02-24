const initialState = {
  message: 'Initial message'
}

const reducer = (state = initialState, action) => {
  switch(action.type){
  case 'CREATE_NOTIFICATION':
    return { ...state, message: action.message }
  case 'CLEAR_NOTIFICATION':
    return { ...state, message: '' }
  default:
    return state
  }
}

export const notificationCreation = message => ({
  type: 'CREATE_NOTIFICATION',
  message
})

export const notificationClear = () => ({
  type: 'CLEAR_NOTIFICATION'
})

export const notify = (message, timeInSeconds) => {
  return (dispatch) => {
    dispatch({
      type: 'CREATE_NOTIFICATION',
      message
    })
    setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION'
      })
    }, timeInSeconds * 1000)
  }
}

export default reducer
