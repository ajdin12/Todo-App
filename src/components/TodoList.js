import React, { useEffect } from 'react';
import { useState } from 'react';
import AddTodo from './AddTodo';
import Todo from './Todo';
import { Button } from '@mui/material';
import Axios from "axios";

function TodoList() {
    const [todos, setTodos] = useState([]);
    const [showInput, setShowInput] = useState(false);

    const addTodo = todo => {
        if(!todo.text) {
            return;
        }
        const newTodos = [todo, ...todos];
        setTodos(newTodos);
        console.log(...todos);
    };

    const editTodo = (editPopupOpen, input) => {
        setTodos(prev => {
            const mutatedState = [...prev]
            const index = mutatedState.map(todo => todo.id).indexOf(editPopupOpen)
            mutatedState[index].title = input;
            console.log(mutatedState,'ajdin')
            return mutatedState;
        })
    };

    const completeTodo = id => {
        let updatedTodos = todos.map(todo => {
            if (todo.id === id) {
                todo.isComplete = !todo.isComplete
            }
            return todo;
        });
        setTodos(updatedTodos);
    };

    const removeTodo = id => {
        const removedTodo = [...todos].filter(todo => todo.id !== id);
        setTodos(removedTodo);
    }

    const fetchTodos = async () => {
        const {data} = await Axios.get(
            "https://jsonplaceholder.typicode.com/todos?_limit=20"
        );
        const todos = data;
        setTodos(todos);
    };

    useEffect(() => {
        fetchTodos();
    }, []);

  const handleClick = e => {
    setShowInput(true);
  };

    return (
        <div style={{backgroundColor: '#ffff', marginTop: 20, paddingTop: 20, marginBottom: 50}}>
            <div style={{marginBottom: 30}}>
                <Todo 
                  todos={todos}
                  removeTodo={removeTodo}
                  completeTodo={completeTodo}
                  editTodo={editTodo}
                />
            </div>
            <div style={{paddingLeft: 50, paddingRight: 50}}>
                {showInput === false ?
                  <Button onClick={handleClick} variant="contained" style={{borderRadius: 50, backgroundColor: '#800080', position: 'absolute', marginTop: -17, marginLeft: 300}}>
                  + New Task
                 </Button>
                 : ''
                }
                {showInput && <AddTodo onSubmit={addTodo} />}
            </div>
        </div>  
    );
}

export default TodoList;