import React, { Component } from 'react'
import { connect } from 'react-redux'

import Grid from '../template/grid'
import IconButton from '../template/iconButton'
import { handleChanged, search, add, clear } from './todoActions'

class TodoForm extends Component{
    constructor(props){
        super(props)
        this.keyHandler = this.keyHandler.bind(this)
    }

    componentWillMount(){
        this.props.search()
    }

    keyHandler(e){
        const { add, search, clear, description} = this.props
        if(e.key === 'Enter'){
            e.shiftKey ? search() : add(description)
        }else if (e.key === 'Escape'){
            clear();
        }
    }

    render(){
        const { add, search, handleChanged, clear, description } = this.props
        return(
            <div role="form" className="todoForm">
                <Grid cols="12 9 10">
                    <input autoFocus id="description" className="form-control"
                        placeholder="Adicione uma tarefa"
                        value={description} 
                        onChange={handleChanged}
                        onKeyUp={this.keyHandler} />
                </Grid>

                <Grid cols="12 3 2">
                    <IconButton style="primary" icon="plus"
                        onClick={() => add(description)}>
                    </IconButton>
                    <IconButton style='info' icon='search'
                        onClick={() => search(description)}>
                    </IconButton>
                    <IconButton style='defaul' icon='close'
                        onClick={clear}>
                    </IconButton>
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = state => ({description: state.todo.description})

export default connect(mapStateToProps, { handleChanged, search, add, clear })(TodoForm)