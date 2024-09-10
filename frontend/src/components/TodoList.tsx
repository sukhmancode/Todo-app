import React from 'react';
import { Todo } from '../model';
import SingleTodo from './SingleTodo';

type Props = {
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
  filteredTodos: Todo[]
};

const TodoList: React.FC<Props> = ({ todos, setTodos, filteredTodos }: Props) => {
  console.log("Filtered Todos:", filteredTodos);

  return (
    <div>
      {filteredTodos.length > 0 ? (
        filteredTodos.map((todo) => {
          
          if (todo  ) {
            return (
              <SingleTodo
                todo={todo}
                setTodos={setTodos}
                todos={todos}
                key={todo.id}
              />
            );
          } else {
            console.warn('Skipping undefined or incomplete todo:', todo);
           
          }
        })
      ) : (
        <p>No todos available</p>
      )}
    </div>
  );
};

export default TodoList;
