
const musciReducer = (state = {}, action) => {
  switch (action.type) {
    case "SEARCH":
      return {...state, data: action.payload};
    default:
      return state;
  }
}

export default musciReducer;