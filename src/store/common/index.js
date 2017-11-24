
const USER_INFO = '';

const initialState = {};

const Common = function (state = initialState, action) {
  switch (action.type) {
    case USER_INFO:
      return action.data
    default:
      return state
  }
};

export default Common