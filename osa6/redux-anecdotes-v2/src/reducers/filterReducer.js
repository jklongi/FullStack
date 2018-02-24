const initialState = {
  rule: ''
}

const reducer = (state = initialState, action) => {
  switch(action.type){
  case 'SET_FILTER':
    return { ...state, rule: action.payload }
  default:
    return state
  }
}

export const filterSet = payload => ({
  type: 'SET_FILTER',
  payload
})

export default reducer
