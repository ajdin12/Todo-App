import React, { useEffect } from 'react';
import { useState } from 'react';
import AddTodo from './AddTodo';
import Todo from './Todo';
import styled from 'styled-components';
import FetchTodos from './service';

const Mydiv = styled.div`
        background-color: #ffff;
        margin-top: 20px;
        padding-top: 20px;
        margin-bottom: 50px;
    `;
    const Divone = styled.div`
        margin-bottom: 30px;
    `;
    const Divtwo = styled.div`
        padding-left: 50px;
        padding-right: 50px;
    `;
    const Button = styled.button`
        border-radius: 50px;
        background-color: #800080;
        color: white;
        position: absolute;
        margin-top: -17px;
        margin-left: 300px;
        padding: 0.50em 1.5em;
    `;

function TodoList() {
    const [todos, setTodos] = useState([]);
    const [showInput, setShowInput] = useState(false);
    const [error, setError] = useState(null);
        
    const addTodo = todo => {
        if (!todo.title) {
            return;
        }
        setTodos(prev => {
            const newTodos = [...prev, todo];

            const localStoragedData = window.localStorage.getItem('todo_save');
            let newLocalStorageData;
            if (localStoragedData) {
                 const parsedData = JSON.parse(localStoragedData);
                 parsedData.push(todo);
                 newLocalStorageData = parsedData;
            } else {
                  newLocalStorageData = [todo];
            }
           window.localStorage.setItem('todo_save', JSON.stringify(newLocalStorageData));
            return newTodos;
        })
    }

    const editTodo = (editPopupOpen, input) => {
        setTodos(prev => {
            const mutatedState = [...prev]
            const index = mutatedState.map(todo => todo.id).indexOf(editPopupOpen)
            mutatedState[index].title = input;

            const localStoragedData = window.localStorage.getItem('todo_save');
            let newLocalStorageData;
            if (localStoragedData) {
                 const parsedData = JSON.parse(localStoragedData);
                 const index = parsedData.map(todo => todo.id).indexOf(editPopupOpen);
                 if(parsedData[index]) {
                    parsedData[index].title = input;
                    newLocalStorageData = parsedData;
                 } else {
                     newLocalStorageData = parsedData;
                 }
            } else {
            newLocalStorageData = [];
            }    
            window.localStorage.setItem('todo_save', JSON.stringify(newLocalStorageData));
            return mutatedState;
        })
    };

    const removeTodo = id => {
        setTodos(prev => {
            const removedTodo = [...prev].filter(todo => todo.id !== id);
            const localStoragedData = window.localStorage.getItem('todo_save');
            let newLocalStorageData;
            if (localStoragedData) {
            const parsedData = JSON.parse(localStoragedData);
            const removedNewTodo = parsedData.filter(todo => todo.id !== id);
            newLocalStorageData = removedNewTodo;
            } else {
            newLocalStorageData = [];
            }
            window.localStorage.setItem('todo_save', JSON.stringify(newLocalStorageData));
            return removedTodo;
        })
    }

    const completeTodo = id => {
        setTodos(prev => {
            const mutatedState = [...prev];
            const index = mutatedState.map(todo => {
                if (todo.id === id) {
                    todo.isComplete = !todo.isComplete
                }
                return todo;
            })
            const localStoragedData = window.localStorage.getItem('todo_save');
             let newLocalStorageData;
             if (localStoragedData) {
                const parsedData = JSON.parse(localStoragedData);
                const parsedDataIndex = parsedData.map(todo => {
                    if(todo.id === id) {
                        todo.isComplete = !todo.isComplete;
                    }
                    return todo;
                })
               newLocalStorageData = parsedDataIndex;
            } else {
            newLocalStorageData = [];
            }
            window.localStorage.setItem('todo_save', JSON.stringify(newLocalStorageData));
            return index;
        });
    };

    useEffect(() => {
        FetchTodos().then(res => {
        const todos = res.data;
        const localStoragedData = window.localStorage.getItem('todo_save');
        if (localStoragedData) {
            try {
                const parsedData = JSON.parse(localStoragedData);
                setTodos([...todos, ...parsedData]);
            } catch (e) {
                setTodos(todos);
            }    
        } else {
            setTodos(todos);
        }
    }).catch(err => {
        setError(err.message);
    })}, []);

    const handleClick = e => {
        setShowInput(true);
    };

    return (
        <Mydiv>
            {error ? <div>{error}</div> : ''}
            <Divone>
                <Todo 
                  todos={todos}
                  removeTodo={removeTodo}
                  completeTodo={completeTodo}
                  editTodo={editTodo}
                />
            </Divone>
            <Divtwo>
                {showInput === false ?
                  <Button onClick={handleClick}  >
                  + New Task
                 </Button>
                 : ''
                }
                {showInput && <AddTodo onSubmit={addTodo} />}
            </Divtwo>
        </Mydiv>  
    );
}

export default TodoList;