import { useForm } from 'react-hook-form';
import './style.scss'
import { AiFillCloseCircle } from "react-icons/ai";
import { todoApi } from '../../assest/api';
import { useEffect, useState } from 'react';
import { getFilled } from '../../assest/defFunction';
import { default as modal } from 'sweetalert2';
import { useLocation } from 'react-router-dom';

const Modal = ({ setToggle, getTodos, toggle, setIsLoad }) => {
    const [todo, setTodo] = useState();
    const isNumber = typeof toggle === 'number';
    const isAdmin = useLocation().pathname.indexOf('admin');

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({
        mode: 'onClick',
    });
    const closeAndShowModal = (title) => {
        setToggle(false)
        modal.fire({
            position: 'center',
            icon: 'success',
            title: `Успешно ${title}.`,
            showConfirmButton: false,
            timer: 1000
        })
    }
    const onSubmit = (data) => {
        setIsLoad(true)
        if (isNumber) {
            todoApi.editTodo(getFilled(data), toggle, getTodos)
                .then(async () => {
                    await getTodos()
                    closeAndShowModal('изменено')
                })
        } else {
            todoApi.postTodo(data, getTodos).then(() => {
                closeAndShowModal('добавлено')
            })
        }
    }
    useEffect(() => {
        if (isNumber) {
            setIsLoad(true)
            todoApi.getTodo(toggle)
                .then(res => setTodo(res))
            setIsLoad(false)
        }
        console.log(isAdmin)
    }, [])
    return (
        <div className='modal'>
            <form className="modal__form" onSubmit={handleSubmit(onSubmit)}>
                <div className="modal__form-top">
                    <h2>Задачка</h2>
                    <AiFillCloseCircle className='modal__close' onClick={() => setToggle(false)} />
                </div>
                <div className="modal__item">
                    <label htmlFor="title" className="modal__label lable__title">Title</label>
                    <input type="text" value={isAdmin <= 0 && todo?.title ? todo.title : ''} placeholder={todo?.title && todo.title} className="modal__input input__title" {...register('title', { required: 'это поле обязательна', maxLength: { value: 55, message: 'максимум 55 символов' } })} />
                    {errors?.title?.message && <p className="form__error">{errors?.title.message}</p>}
                </div>
                <div className="modal__item">
                    <label htmlFor="description" className="modal__label lable__description">Description</label>
                    <textarea type="text" value={isAdmin <= 0 && todo?.description ? todo.description : ''} placeholder={todo?.description && todo.description} className="modal__input textarea__description" {...register('description')} />
                </div>
                {isAdmin <= 0 && <p className='modal__isAdmin'>Чтобы изменить у вас должен быть статус администратора</p>}
                {isAdmin > 0 && <div className="modal__btn">
                    <button type='submit'>Submit</button>
                </div>}
            </form>
        </div>
    )
}

export default Modal