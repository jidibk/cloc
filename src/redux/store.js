import { createStore, combineReducers, applyMiddleware } from 'redux'


// const store = createStore(
//     rootReducer,
//     applyMiddleware(thunk)
//   );

const timeState = {
  breakTime: 5,
  sessionTime: 25
};

const breakReducer = (state = timeState, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {...state,
        breakTime: Math.min(state.breakTime + action.payload, 60),
      };
    case 'DECREMENT':
      return {
        ...state,
        breakTime: Math.max(state.breakTime - action.payload, 1),
      };

    default:
      return state;
  }
};
 
const store = createStore(breakReducer);


// store.subscribe(() => {
//   console.log('current state', store.getState());
// });  



store.dispatch({
  type: 'INCREMENT',
  payload: 1
});

store.dispatch({
  type: 'DECREMENT',
  payload: 1
});

export default store;

  