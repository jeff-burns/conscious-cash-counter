import { createStore, applyMiddleware, combineReducers } from "redux";
// import { reducer as formReducer } from 'redux-form';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';

// const allReducers = {
//   reducers,
//   form: formReducer
// }
// const reducer = combineReducers(allReducers)

export default function configureStore(initialState) {
    const store = createStore(reducers, initialState, applyMiddleware(ReduxThunk))
  
    if (module.hot) {
      // Enable Webpack hot module replacement for reducers
      module.hot.accept('./reducers', () => {
        const nextRootReducer = require('./reducers/index');
        store.replaceReducer(nextRootReducer);
      });
    }
  
    return store;
  }