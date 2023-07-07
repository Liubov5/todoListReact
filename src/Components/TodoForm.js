import React, {useEffect, useState} from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';
import 'moment/locale/ru';
import { SubInput } from './SubInput';
import {v4 as uuidv4} from 'uuid';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import "bootstrap/dist/css/bootstrap.min.css";
import { InputGroup } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

export const TodoForm = ({addTodo}) => {
    const [inputvalue, setValue] = useState("");
    const [date, setData] = useState(moment());   
    const [subInputs, setSubInputs] = useState([])

    const [subTasks, setSubTasks] = useState([]);  

    //это штука удаляет лишний элемент в массиве
    useEffect(()=>{
            setSubTasks(arr=>arr.filter(item => item.subTask != "" ))
    }, [subTasks])

    const handleSubmit = (e) => {
        e.preventDefault();   
        addTodo(inputvalue,  date == "" ? moment().format("LL") : date.format("LL"), subTasks ); //если форма даты пустая
         //надо удалить пустые инпуты хз пока не работает, вот эту штук внизу не работает;
        setValue("");
        setData("");
        setSubInputs([]);
        setSubTasks([]);
    }
    
    const showSubInput = () => {
        setSubInputs( (subInput) => {   
            let index = uuidv4();     
            return [...subInput, <SubInput key={index} id={index} changeRemovedTask={changeRemovedTask} addSubTask={addSubTask} close={closeSubInput}  />] 
        });  
        //показываем кучу инпутов для подзадач 
        //вот как можно сделать добавление в массив через usestate
    }

    const closeSubInput = (id, currentTask) => {
        setSubInputs( arr => arr.filter(item=> {
            return item.key != id;
         }) ) //удаление инпутов из массива
         
         setSubTasks( arr => arr.filter(item => {
            return item.subTask != currentTask;
         } ) )//удаление таска из массива тасков    
    }

    const changeRemovedTask = (id) =>{
        setSubTasks( arr => arr.filter(item => {
            return item.id != id;
         } ) )//удаление таска из массива тасков, когда инпут пустой )))   
    }

    const addSubTask = (task, id) =>{   
        
        setSubTasks((arr)=>[...arr, {
            subTask:task, completed: false, id:id
        }]);      
        //добавляем подзадачу в массив
        
    }

  return (
    <Container className='py-3'>        
        <form onSubmit={handleSubmit}> 
            <Row>
                <Col >
                    <InputGroup  > 
                        
                        <Form.Control
                       
                        placeholder="Что вам надо сделать? "
                        value={inputvalue}
                        required  
                        type='text' 
                        onChange={(e)=>{
                            setValue(e.target.value)
                        }}
                        />
                    
                    </InputGroup>
                    
                </Col>
                <Col>
                
                    {subInputs} {/*тут разворачивается массив подинпутов */}
                    
                    <Button   variant="primary" onClick = { showSubInput }>Подзадачи +</Button>
                </Col> 
                <Col>
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                    <DatePicker value={date}  onChange={(e)=>{
                        setData(e)
                    }}/>
                    </LocalizationProvider>
                    <Button className='ms-3' variant="success" type="submit">Добавить</Button> {' '}
                </Col>
            </Row>
        </form>
      </Container>
  )
}
