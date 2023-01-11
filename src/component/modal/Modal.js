import { useForm } from 'react-hook-form';
import './style.scss'
import { AiFillCloseCircle } from "react-icons/ai";
import { useEffect } from 'react';
import { todoApi } from '../../assest/api';
const Modal = ({ setToggle }) => {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({
        mode: 'onClick',
    });
    const onSubmit = (data) => {
        todoApi.postTodo(data)
        // console.log(data)
    }

    return (
        <div className='modal'>
            <form className="modal__form" onSubmit={handleSubmit(onSubmit)}>
                <div className="modal__form-top">
                    <h2>Задачка</h2>
                    <AiFillCloseCircle className='modal__close' onClick={() => setToggle(false)} />
                </div>
                <div className="modal__item">
                    <label htmlFor="title" className="modal__label lable__title">Title</label>
                    <input type="text" className="modal__input input__title" {...register('title', { required: 'это поле обязательна', maxLength: { value: 55, message: 'максимум 55 символов' } })} />
                    {errors?.title?.message && <p className="form__error">{errors?.title.message}</p>}
                </div>
                <div className="modal__item">
                    <label htmlFor="description" className="modal__label lable__description">Description</label>
                    <textarea type="text" className="modal__input textarea__description" {...register('description')} />
                </div>
                <div className="modal__btn">
                    <button type='submit'>Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Modal