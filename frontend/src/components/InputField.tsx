import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Todo } from '../model';

type Props = {  
    todo: string,
    setTodo: React.Dispatch<React.SetStateAction<string>>,
    todos: Todo[],
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
};

const InputField: React.FC<Props> = ({ todo, setTodo, todos, setTodos }: Props) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!todo.trim()) {
            toast.error("Please enter a todo");
            return;
        }
        setLoading(true);
        setError(null);

        try {
            const token = localStorage.getItem('authToken'); // Retrieve token from local storage
            if (!token) {
                throw new Error('No token found');
            }

            const response = await axios.post(
                "http://localhost:5000/api/v1/todo/createTodo",
                { todo: todo, isDone: false },
                {
                    headers: {
                        Authorization: `Bearer ${token}` // Include token in headers
                    }
                }
            );
            const newTodo = response.data.todo;
            setTodos([...todos, newTodo]);
            setTodo("");
            toast.success("Todo created successfully");
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                toast.error(error.response.data.msg || "Failed to create todo");
            } else {
                toast.error("Failed to create todo");
            }
            console.error("Error creating todo:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className='input-field' onSubmit={handleAdd}>
            <div className='input-before'></div>
            <input style={{padding:"20px 30px"}}
                value={todo} 
                disabled={loading} 
                type="text" 
                placeholder='Create a new todo...'
                onChange={(e) => setTodo(e.target.value)} 
                aria-label="New todo"
            />
            {error && <p>{error}</p>}
        </form>
    );
};

export default InputField;
