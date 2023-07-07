import { legacy_createStore } from "redux";
import { taskReducer } from "./taskReducer";


export const store = legacy_createStore(taskReducer);