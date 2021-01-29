import { createStore } from 'redux';

// made store using the reducers to place components in the global state
const reducer = (state = initialState, action) => {
    switch (action.type) {

  
      default:
        return state;
    }
  };

const store = createStore(reducer);
export default store;