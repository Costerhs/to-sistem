import { useState } from 'react'
import Modal from '../../component/modal/Modal'
import TodoList from '../../component/todoList/TodoList'
import './style.scss'

const Admin = () => {
    const [toggle, setToggle] = useState(false);
    return (
        <div className='admin'>
            {toggle && <Modal setToggle={setToggle} />}
            <div className="container">
                <TodoList />
                <div className="admin__add">
                    <button onClick={() => setToggle(true)}>
                        Добавить задачу
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Admin