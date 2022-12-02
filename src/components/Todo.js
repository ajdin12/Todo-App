import React, { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import { Checkbox } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { TextField } from "@mui/material";


const Todo = ({todos, removeTodo, completeTodo, editTodo}) => {
    const [deletePopupOpen, setDeletePopupOpen] = useState(false);
    const [editPopupOpen, setEditPopupOpen] = useState(false);
    const [input, setInput] = useState('');
    const handleChange = e => {
        setInput(e.target.value);
    };
    const handleSubmit = e => {
        editTodo(editPopupOpen, input);
        setEditPopupOpen(false);
        setInput('');
    }

    return (
        <div>
            {todos.map((todo, index) => (
                <div key={index} style={{display:'flex', justifyContent: 'space-between', paddingLeft: 50, paddingRight: 50}}>
                    <div key={todo.id}>
                        <Checkbox onClick={() => completeTodo(todo.id)} />
                    </div>
                    {todo.id === editPopupOpen ?
                        <div>
                            <TextField 
                                style={{paddingTop: 9, paddingBottom: 9}}
                                fullWidth
                                type="text" 
                                value={input} 
                                name="text" 
                                onChange={handleChange}
                                variant="standard"
                            />
                        </div> 
                        :
                        <div>
                            <p key={todo.id}>{todo.title}{todo.text}</p>
                        </div>
                    }
                    {todo.id === deletePopupOpen ?
                    <div style={{width: 150, height: 50, backgroundColor: 'white', position: 'absolute', marginLeft: 620, marginTop: 30, borderStyle: "groove", borderRadius: 10, display: 'grid', justifyContent: 'center'}}>
                        <div>
                                Are You Sure?
                        </div>
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                <div onClick={() => removeTodo(todo.id)}>
                                    Yes
                                </div>
                                <div onClick={() => setDeletePopupOpen(false)}>
                                    No
                                </div>
                        </div>
                    </div> : '' }
                    <div>
                        {editPopupOpen === false ?
                            <EditIcon onClick={() => setEditPopupOpen(todo.id)} />
                            :
                            todo.id === editPopupOpen ?
                            <div style={{position: 'absolute', marginLeft: -200, paddingTop: 10}}>
                                <CheckIcon style={{paddingRight: 10}} onClick={() => handleSubmit()} />
                                <CloseIcon onClick={() => setEditPopupOpen(false)} />
                            </div>
                            : ''
                        }
                        {editPopupOpen !== todo.id ?
                        <DeleteIcon style={{paddingLeft: 15}} onClick={() => setDeletePopupOpen(todo.id)} />
                        : ''
                        }
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Todo;