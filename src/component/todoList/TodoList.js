import { useEffect } from 'react'
import TodoItem from './item/TodoItem'
import './style.scss'

const TodoList = ({ getTodos, todos, setToggle, admin }) => {
    useEffect(() => {
        getTodos()
    }, [])

    return (
        <div className='todo__list'>
            {todos && todos.length > 0 ? todos.map((el, ind) => {
                return <TodoItem admin={admin} setToggle={setToggle} getTodos={getTodos} data={el} key={ind} />
            }) : <h1>Задачи отсутствуют</h1>}
        </div>
    )
}

export default TodoList