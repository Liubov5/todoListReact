import {v4 as uuidv4} from 'uuid';

uuidv4();
const ADD_TODO = "ADD_TODO";
const TOGGLE_COMPLETE = "TOGGLE_COMPLETE";
const DELETE_TODO = "DELETE_TODO";
const  TOGGLE_COMPLETE_SUBTASK = "TOGGLE_COMPLETE_SUBTASK";
const EDIT_TASK = "EDIT_TASK";
const EDIT_TODO = "EDIT_TODO";

const defaultState = {
    todos:[{id: uuidv4(), task:"Читать книгу", completed: false, isEditing: false, date: '4 июня 2023г', subTasks:[] }, 
    {id: uuidv4(), task:"Сделать тренировку", completed: false, isEditing: false, date: '3 июня 2023г', subTasks:[]}]
}

export const taskReducer = (state=defaultState, action) => {
    switch(action.type){
        case  ADD_TODO: 
            return {...state, todos:[...state.todos, action.payload]}
        case TOGGLE_COMPLETE:
            return {...state, todos: state.todos.map(todo=>todo.id === action.payload ? {...todo, completed: !todo.completed} : todo) };
        case DELETE_TODO:
            return {...state, todos: state.todos.filter(todo=>todo.id !== action.payload)};
        case TOGGLE_COMPLETE_SUBTASK:
            state.todos.map(todo => todo.id === action.payload.taskId ? todo.subTasks[action.payload.subtaskId].completed = !todo.subTasks[action.payload.subtaskId].completed : todo );
            
            return {...state, todos: [...state.todos] } //вот тут работает, но непонятно, что происходит вообще такое?
        case EDIT_TASK:
            let task = action.payload.task;
            let subTasks = action.payload.subTasks
            return {...state, todos: state.todos.map(todo=>todo.id === action.payload.id ? {...todo, task, subTasks, isEditing: !todo.isEditing} : todo)}
        case EDIT_TODO:
            return {...state, todos: state.todos.map(todo=> todo.id === action.payload? {...todo, isEditing: !todo.isEditing} : todo)}
        default:
            return state;
    }
}

export const addTodoAction = (payload) => ({type: ADD_TODO, payload});
export const toggleCompleteAction = (payload) => ({type: TOGGLE_COMPLETE, payload})
export const deleteTodoAction = (payload) => ({type: DELETE_TODO, payload})
export const toggleCompleteSubTaskAction = (payload) => ({type:TOGGLE_COMPLETE_SUBTASK, payload })
export const editTaskAction = (payload) => ({type: EDIT_TASK, payload})
export const editTodoAction = (payload)=>({type:EDIT_TODO, payload})