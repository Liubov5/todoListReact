import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPenToSquare, faTrash} from '@fortawesome/free-solid-svg-icons';


export const Todo = ({task, toggleComplete, deleteTodo, editTodo, toggleCompleteSubTask}) => {
  return (
    <div className='Todo'>
      
          {task != null &&
              <div style={{border: "1px solid gray", padding: "10px", marginBottom: "10px"}}>
                  <h4>Задача: </h4>
                  <p onClick={()=>{ toggleComplete(task.id) }} className={`${task.completed ? 'completed' : "" }`}>{task.task}</p>  

                  <h5>Подзадачи: </h5>
                  { task.subTasks.map((subTask,index)=> <p onClick={ ()=> { toggleCompleteSubTask(task.id, index) } } style={{color: "gray"}} className={`${subTask.completed ? 'completed' : "" }`} >{subTask.subTask}</p> ) }         
                  <p>{task.date}</p>

                  <div>
                      <FontAwesomeIcon icon={faPenToSquare} onClick={()=>{editTodo(task.id)}}/>
                      <FontAwesomeIcon onClick={ ()=>{deleteTodo(task.id)}} icon={faTrash} />
                  </div>
            </div>
          }
      
    </div>
  )
}
