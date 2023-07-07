import { Button } from '@mui/material';
import React, {useState} from 'react'
import "bootstrap/dist/css/bootstrap.min.css";

export const EditTodoForm = ({editTodo, task}) => {
    const [inputvalue, setValue] = useState(task.task);
    const [subTasks, setSubTasks] = useState(task.subTasks);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        editTodo(inputvalue, task.id, subTasks);
        setValue("");
    }
    
  return (
    <form className='TodoForm' onSubmit={handleSubmit}>
        <input style={{marginBottom: "10px"}} value={inputvalue} className='todo-input' type='text' onChange={(e)=>{
            setValue(e.target.value)
        }}/>
       
        {
          subTasks.map((item, index)=> <input style={{marginBottom: "10px"}} id={index} value={item.subTask} onChange={(e)=>{
            let newArr = [...subTasks]; 
            newArr[index].subTask = e.target.value; 
            setSubTasks(newArr);
          }}/> )
        }
         <Button className='ms-3' variant="success" type="submit">Обновить</Button> {' '}
    </form>
  )
}
