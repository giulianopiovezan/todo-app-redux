import axios from 'axios'

const API_URL = `http://localhost:3003/api/todos`

export function handleChanged(e){
    return{
        type: 'VALUE_CHANGED',
        payload: e.target.value
    }
}

export const search = () => {
    return (dispatch, getState) => {
        const description = getState().todo.description
        const searchTerm = description ? `&description__regex=/${ description }/` : ''
        axios.get(`${API_URL}?sort=-createdAt${ searchTerm }`)
                            .then(resp => dispatch({type: 'TODO_SEARCHED', payload: resp.data}))    
    }
}

export const add = (description) => {
    return dispatch => {
        axios.post(API_URL, { description })
            .then(resp => dispatch(clear()))
    }
}

export const markAsDone = (todo) => {
    return dispatch => {
        axios.put(`${ API_URL }/${ todo._id }`, {done: true})
        .then(resp => dispatch(search()))
    }
}

export const markAsPending = (todo) => {
    return dispatch => {
        axios.put(`${ API_URL }/${ todo._id} `, { ...todo, done: false })
            .then(resp => dispatch(search()))
    }
}

export const deleteTodo = (todo) => {
    return dispatch => {
        axios.delete(`${ API_URL }/${ todo._id }`)
            .then(resp => dispatch(search()))
    }
}

export const clear = () => {
    return [
        {type: 'CLEAR_DESCRIPTION'},
        search()
    ]
}