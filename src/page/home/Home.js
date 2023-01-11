import { getCookie } from '../../assest/defFunction'
import TodoItem from '../../component/todoList/item/TodoItem'
import TodoList from '../../component/todoList/TodoList'
import './style.scss'

const Home = () => {
    console.log(getCookie('user'))
    console.log(getCookie('token'))
    console.log(getCookie('password'))
    return (
        <div className='home'>
            <div className="container">
                <TodoList />
            </div>
        </div>
    )
}

export default Home