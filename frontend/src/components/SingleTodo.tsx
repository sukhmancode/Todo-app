import React, { useState } from 'react';
import { Todo } from '../model';

type Props = {
  todo: Todo;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  todos: Todo[];
};

const SingleTodo: React.FC<Props> = ({ todo, todos, setTodos }) => {
  const [focused, setFocused] = useState<boolean>(false);

  const setFocus = () => setFocused(true);
  const setBlur = () => setFocused(false);

  // Handle removing a todo
  const handleRemove = (id: number) => {
    setTodos(todos.filter((item) => item.id !== id));
  };

  // Toggle the completed state of a todo
  const toggleCompleted = (id: number) => {
    const updatedTodos = todos.map((item) =>
      item.id === id ? { ...item, isDone: !item.isDone } : item
    );
    setTodos(updatedTodos);
  };

  return (
    <form className="todo" onMouseEnter={setFocus} onMouseLeave={setBlur}>
      <div className="todo-wrap" onClick={() => toggleCompleted(todo.id)}>
        {todo.isDone ? (
          <div>
            <div className="input-after">
              <img
                src="icon-check.svg"
                alt="check"
                style={{ width: '15px', position: 'absolute', top: '3px' }}
              />
            </div>
            <s>{todo.todo}</s> {/* Strikethrough for completed tasks */}
          </div>
        ) : (
          <div>
            <div className="input-before"></div>
            <span>{todo.todo}</span> {/* No strikethrough for incomplete tasks */}
          </div>
        )}
      </div>
      {/* Display the cross icon when focused */}
      <img
        src={focused ? 'icon-cross.svg' : ''}
        alt="remove"
        onClick={() => handleRemove(todo.id)}
      />
    </form>
  );
};

export default SingleTodo;
