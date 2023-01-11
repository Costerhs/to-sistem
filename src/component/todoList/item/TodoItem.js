import './style.scss'
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { todoApi } from '../../../assest/api';
import { default as modal } from 'sweetalert2';
import { BiShowAlt } from "react-icons/bi";

const TodoItem = ({ id, title, description, getTodos, setToggle }) => {
    const delTodo = (e) => {
        modal.fire({
            title: 'Вы уверены?',
            text: "Вы не сможете вернуть данные!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Да, удалить!'
        }).then((result) => {
            if (result.isConfirmed) {
                todoApi.delTodo(id)
                    .then(() => {
                        getTodos()
                        modal.fire(
                            'Удалено!',
                            'Данные успешно удалены.',
                            'success'
                        )
                    })
            }
        })
        e.stopPropagation()
    }
    const edit = (e) => {
        setToggle(id)
        e.stopPropagation()
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