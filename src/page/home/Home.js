import { useState } from 'react';
import { todoApi } from '../../assest/api';
import Modal from '../../component/modal/Modal';
import TodoList from '../../component/todoList/TodoList'
import './style.scss'

const Home = () => {
    const [todos, setTodos] = useState([]);
    const [isLoad, setIsLoad] = useState(false);
    const [toggle, setToggle] = useState(false);
    const getTodos = async () => {
        setIsLoad(true)
        await todoApi.getTodos()
            .then(res => setTodos(res))
        setIsLoad(false)
    }
    return (
        <div className='home'>
            {toggle && <Modal setIsLoad={setIsLoad} getTodos={getTodos} toggle={toggle} setToggle={setToggle} />}
            <div className="container">
                <TodoList setToggle={setToggle} getTodos={getTodos} todos={todos} />
            </div>
            {isLoad && <div className='load'>
                <p className='load__text'>...loading</p>
            </div>}
        </div>
    )
}

export default Home