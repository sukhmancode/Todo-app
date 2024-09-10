import React from 'react';
import { Todo } from '../model';

type Props = {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  setFilterStatus:React.Dispatch<React.SetStateAction<string>>,
  filterStatus:string

};

const Information: React.FC<Props> = ({ todos, setTodos,filterStatus,setFilterStatus}) => {
  const deleteCompleted = () => {
    setTodos(todos.filter((todo) => !todo.isDone));
  };


  const handleClick = (status:string) => {
    setFilterStatus(status);
  };
  return (
    <div className='information'>
      <div>{todos.length} items left</div>
      <div className='sub-info'>
        <p className={filterStatus==="all" ? "active-status":""}
         onClick={() => handleClick("all")}>All</p>

        <p className={filterStatus==="active" ? "active-status":""}
        onClick={() => handleClick("active")}>Active</p>
        
        <p className={filterStatus=== "completed" ? "active-status" : ""} 
        onClick={() => handleClick("completed")}>Completed</p>
      </div>
      <div className='completed-txt' onClick={deleteCompleted}>
        Clear Completed
      </div>
      
    </div>
  );
};

export default Information;