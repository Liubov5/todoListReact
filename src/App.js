import { Provider } from 'react-redux';
import './App.css';
import {TodoWrapper}  from './Components/TodoWrapper';
import { store } from './store';

function App() {
  return (
    <div className="App">
        {/* <ShoppingList/> */}
        <Provider store={store}>
          <TodoWrapper/>
        </Provider>
    </div>
  );
}

export default App;
