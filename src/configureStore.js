import { createStore, applyMiddleware } from "redux";
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';

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