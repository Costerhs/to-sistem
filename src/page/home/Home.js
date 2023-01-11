import { useState } from 'react';
import { todoApi } from '../../assest/api';
import TodoList from '../../component/todoList/TodoList'
import './style.scss'

const Home = () => {
    const [todos, setTodos] = useState([]);
    const [isLoad, setIsLoad] = useState(false);

    const getTodos = async () => {
        // setIsLoad(true)
        await todoApi.getTodos()
            .then(res => setTodos(res))
        setIsLoad(false)
    }
    return (
        <div className='home'>
            <div className="container">
                <TodoList getTodos={getTodos} todos={todos} />
            </div>
        </div>
    )
}

export default Home