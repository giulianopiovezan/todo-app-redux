import React from 'react'
import IconButton from '../template/iconButton'
import { connect } from 'react-redux'

import { markAsDone, markAsPending, deleteTodo } from './todoActions'

export const todoList = props => {

    const renderRows = () =>{
        const list = props.todos || []
        return list.map(todo => (
                <tr key={todo._id}>
                    <td className={todo.done ? 'markedAsDone' : ''}>{todo.description}</td>
                    <td>
                        <IconButton hide={todo.done} style='success' icon='check'
                            onClick={() => props.markAsDone(todo)}>
                        </IconButton>
                        <IconButton hide={!todo.done} style='warning' icon='undo'
                            onClick={() => props.markAsPending(todo)}>
                        </IconButton>
                        <IconButton style='danger' icon='trash-o' hide={!todo.done}
                            onClick={() => props.deleteTodo(todo)}>
                        </IconButton>
                    </td>
                </tr>
        ))
    }

    return(
        <div className="row">
            <table className="table table-stripped">
                <thead>
                    <tr>
                        <th>Descrição</th>
                        <th className="tableActions">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {renderRows()}
                </tbody>
            </table>
        </div>
    )
}

const mapStateToProps = state => ({todos: state.todo.list})

export default connect(mapStateToProps, { markAsDone, markAsPending, deleteTodo })(todoList)