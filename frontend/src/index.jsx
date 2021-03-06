import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'

import promise from 'redux-promise'
import multi from 'redux-multi'
import thunk from 'redux-thunk'

import App from './main/app'
import reducers from './main/reducers'
const devTools = __REDUX_DEVTOOLS_EXTENSION__ 
            && __REDUX_DEVTOOLS_EXTENSION__()
const store = applyMiddleware(multi,promise, thunk)(createStore)(reducers, devTools)
ReactDOM.render(
    <Provider store={store}>
        <App/>  
    </Provider>
, document.getElementById('app'))