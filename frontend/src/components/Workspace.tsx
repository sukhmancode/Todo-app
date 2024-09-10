import { useState,useEffect } from 'react'

import '../App.css'
import Header from '../components/Header'
import InputField from '../components/InputField'
import axios from 'axios'

import Information from '../components/Information'
import TodoList from '../components/TodoList'
import { Todo } from '../model'

const Workspace = () => {
    const [lightmode,setLightmode]=useState<boolean>(false)
    const [todo,setTodo]=useState<string>("")
    const [todos,setTodos]=useState<Todo[]>([]) 
    const [filterStatus, setFilterStatus] = useState("all");
    const [filteredTodos, setFilteredTodos] = useState(todos);

        // Fetch todos from backend
        useEffect(() => {
          const fetchTodos = async () => {
            try {
              const response = await axios.get('http://localhost:5000/api/v1/todo/allTodos', {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                },
              });
              
              
              if (response.data && response.data.todos) {
                setTodos(response.data.todos); 
              } else {
                console.error('Invalid response structure:', response.data);
              }
            } catch (error) {
              console.error('Error fetching todos:', error);
            }
          };
      
          fetchTodos();
        }, []);
      
  
  
    useEffect(() => {
      const handleFilter = () => {
        if(todos && Array.isArray(todos) ){
        switch (filterStatus) {
          case "active":
            return setFilteredTodos(todos.filter((todo) => !todo.isDone));
  
          case "completed":
            return setFilteredTodos(todos.filter((todo) => todo.isDone));
  
          default:
            return setFilteredTodos(todos);
        }
        }
      };
      handleFilter();
    }, [todos, filterStatus]);
    return (
      <>
        <div className="main-root">
          <Header lightmode={lightmode} setLightmode={setLightmode}/>
          <InputField todo={todo} setTodo={setTodo} todos={todos} setTodos={setTodos}/>
          <TodoList todos={todos} setTodos={setTodos} filteredTodos={filteredTodos}/>
          <Information todos={todos} setTodos={setTodos} 
          filterStatus={filterStatus} setFilterStatus={setFilterStatus}
         />
        </div>
      </>
    )
}

export default Workspace