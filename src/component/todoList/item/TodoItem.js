import './style.scss'
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { todoApi } from '../../../assest/api';
import { default as modal } from 'sweetalert2';
import { BiShowAlt } from "react-icons/bi";

const TodoItem = ({ getTodos, setToggle, admin, data }) => {
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
                todoApi.delTodo(data.id)
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
        setToggle(data.id)
        e.stopPropagation()
    }

    return (
        <div className="todo" >
            <div className="todo__top">
                <div className="todo__title">{data.title}</div>
                <div className="todo__btns">
                    {admin && <><button className="todo__del" onClick={delTodo}>
                        <AiFillDelete className='del-icon' />
                    </button>
                        <button className="todo__change" onClick={edit}>
                            <AiFillEdit className='edit-icon' />
                        </button></>}
                    <button className="todo__show" onClick={edit}>
                        <BiShowAlt className='show-icon' />
                    </button>
                </div>
            </div>
            <div className="todo__text">
                <div className="todo__description">
                    {data.description}
                </div>
                <div className="todo__date">
                    {data.date}
                </div>
            </div>
        </div>
    )
}

export default TodoItem