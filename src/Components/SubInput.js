import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCircleXmark, faSquareCheck} from '@fortawesome/free-solid-svg-icons';
import "bootstrap/dist/css/bootstrap.min.css";

export const SubInput = (props) => {
    const [inputvalue, setValue] = useState("");
    //const [test, setTest] = useState([]) //блять создаются разные для каждого инпута, не один для всех, а сука разные!
      //тут надо создать массив, а не там( p.s. не надо уже)

    const addSubTask = () => {
       props.addSubTask(inputvalue, props.id);
       //когда удаляю текст внутри инпута, который уже отправился в массив в TodoFormб он оттуда не удаляется и плюс добавдяется пустой инпут

    }

    const closeSubInput = () =>{
        props.close(props.id, inputvalue);      
    }

    return (
        <div className='mb-3'>
            <FontAwesomeIcon onClick={closeSubInput} icon={faCircleXmark} />
             <input key={props.id} onBlur={addSubTask} onChange={ (e)=>{
                if(e.target.value == ""){
                    props.changeRemovedTask(props.id);
                }
                //при изменении он должен вызывать добавленный в сабТаск значение и менять его.
                setValue(e.target.value);
            }} value={inputvalue} />  
            {/* можно было инпут просто сделать required loool */}
        </div>
    )
}

//когда должен инпут добавляться? 