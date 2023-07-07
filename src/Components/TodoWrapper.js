 import React, {useState} from 'react'
 import { TodoForm } from './TodoForm'
import {v4 as uuidv4} from 'uuid';
import { Todo } from './Todo';
import { EditTodoForm } from './EditTodoForm';
import moment from 'moment';
import 'moment/locale/ru';
import { Container } from '@mui/material';
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addTodoAction, deleteTodoAction, toggleCompleteAction, toggleCompleteSubTaskAction, editTaskAction, editTodoAction } from '../store/taskReducer';

uuidv4();

export const TodoWrapper = () => {
    moment.locale('ru')
    const dispatch = useDispatch(); //сократили
    const todos = useSelector(state=>state.todos);

    const addTodo = (todo, date, subTasks) => {
        dispatch(addTodoAction({id: uuidv4(), task:todo, completed: false, isEditing: false, date:date, subTasks: subTasks}))
    }
    const toggleComplete = (id) => {
        dispatch(toggleCompleteAction(id)) 
    }

    const toggleCompleteSubTask = (taskId, subtaskId)=> {
        dispatch(toggleCompleteSubTaskAction({taskId, subtaskId}))
    }

    const deleteTodo = (id) => {
        dispatch(deleteTodoAction(id))
    }

    const editTodo = (id)=> {
        dispatch(editTodoAction(id))
    }
    const editTask = (task, id, subTasks) => {
        dispatch(editTaskAction({task, id, subTasks}))
    }
    
    //почему блять два edit?

    return (
    <div className='TodoWrapper'>
        <TodoForm addTodo={addTodo}/>
        <Container>
            <Row>
                
                    {todos.map((todo, index)=>
                     
                        todo.isEditing ? <Col xs lg="2"><EditTodoForm editTodo={editTask} task={todo}/> </Col> : <Col xs lg="2"><Todo toggleCompleteSubTask={toggleCompleteSubTask}  task={todo} key={index} toggleComplete={toggleComplete} deleteTodo = {deleteTodo} editTodo={editTodo}/></Col> 
                  
                    //false
                    )}
                
            </Row>
       </Container>
    </div>
  )
}


// const productsLol = [
//   { title: 'Cabbage', isFruit: false, id: 1 },
//   { title: 'Garlic', isFruit: false, id: 2 },
//   { title: 'Apple', isFruit: true, id: 3 },
// ];

// let test = ["kek", "lol", "cheburek"]; //react раскукоживает массив внутри jsx-элемента
// let kek = [<TodoForm/>, <TodoForm/>, <TodoForm/>]; //так тоже работает, но только в react
// let lol = [<h1>lol</h1>,<h1>lol</h1>,<h1>lol</h1> ]; //так тоже работает, но только в react

// export default function ShoppingList() {
//   const [products,setProducts] = useState([
//       { title: 'Cabbage', isFruit: false, id: 1 },
//       { title: 'Garlic', isFruit: false, id: 2 },
//       { title: 'Apple', isFruit: true, id: 3 },
//   ]);






//   return (
//   <ul>
//       <li>{ listItems }</li>
//   </ul>
//   );
// }

