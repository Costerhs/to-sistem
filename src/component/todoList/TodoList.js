import { useEffect, useState } from 'react'
import { todoApi } from '../../assest/api';
import TodoItem from './item/TodoItem'
import './style.scss'

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const getTodos = () => {
        todoApi.getTodos()
            .then(res => {
                setTodos(res)
            })
    }
    useEffect(() => {
        getTodos()
    }, [])

    return (
        <div className='todo__list'>
            {todos && todos.length > 0 ? todos.map((el, ind) => {
                return <TodoItem getTodos={getTodos} id={el.id} title={el.title} description={el.description} key={ind} />
            }) : null}
        </div>
    )
}

export default TodoList