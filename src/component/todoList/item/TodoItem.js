import './style.scss'
import React from 'react'
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { todoApi } from '../../../assest/api';
import { default as Modal } from 'sweetalert2';

const TodoItem = ({ id, title, description, getTodos }) => {
    const delTodo = (e) => {
        todoApi.delTodo(id)
            .then(() => {
                getTodos()
                Modal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Успешно удалено',
                    timer: 1500,
                    showConfirmButton: false
                })
            })
        e.stopPropagation()
    }
    const edit = (e) => {
        e.stopPropagation()
        console.log('edit')
    }
    const card = () => {
        console.log('card')
    }
    return (
        <div className="todo" onClick={card}>
            <div className="todo__top">
                <div className="todo__title">{title}</div>
                <div className="todo__btns">
                    <button className="todo__del" onClick={delTodo}>
                        <AiFillDelete className='del-icon' />
                    </button>
                    <button className="todo__change" onClick={edit}>
                        {/* AiFillDelete */}
                        <AiFillEdit className='edit-icon' />
                    </button>
                </div>
            </div>
            <div className="todo__text">
                {description}
            </div>
        </div>
    )
}

export default TodoItem