import React, { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import { Checkbox } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { TextField } from "@mui/material";
import styled from 'styled-components';

const Mydiv = styled.div`
display: flex ;
justify-content: space-between;
padding-left: 50px;
padding-right: 50px;
`;
const DeleteBox = styled.div`
width: 150px;
height: 50px;
background-color: white;
position: absolute;
margin-left: 620px;
margin-top: 30px;
border-style: groove;
border-radius: 10px;
display: grid;
justify-content: center;
`;
const DeleteConfermationBox = styled.div`
display: flex;
justify-content: space-between;
`;

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
    const handleClosePopup = e => {
        setEditPopupOpen(false);
        setInput('');
    }

    return (
        <div>
            {todos.map((todo, index) => (
                <Mydiv key={index}>
                    {todo.id !== editPopupOpen ?
                        <div key={todo.id}>
                                <Checkbox onClick={() => completeTodo(todo.id)} checked={todo.isComplete} />
                        </div>
                        : ''
                    }
                    <div style={{width: '100%'}}>
                        {todo.id === editPopupOpen ?
                            <div style={{display: 'flex', justifyContent: 'center'}}>
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
                                <div style={{ paddingTop: 10, paddingLeft: 30}}>
                                    <CheckIcon style={{paddingRight: 10}} onClick={() => handleSubmit()} />
                                    <CloseIcon onClick={() => handleClosePopup()} />
                                </div>
                            </div> 
                            :
                            <div style={{display: 'flex', justifyContent: 'center'}}>
                                <p key={todo.id}>{todo.title}</p>
                            </div>
                        }
                    </div>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        {editPopupOpen === false ?
                            <EditIcon onClick={() => {
                                setEditPopupOpen(todo.id);
                                setInput(todo.title);
                            }} />
                            : ''
                        }
                        {editPopupOpen !== todo.id ?
                        <DeleteIcon style={{paddingLeft: 15}} onClick={() => setDeletePopupOpen(todo.id)} />
                        : ''
                        }
                    </div>
                    {todo.id === deletePopupOpen ?
                    <DeleteBox>
                        <div>
                                Are You Sure?
                        </div>
                        <DeleteConfermationBox>
                            <div onClick={() => removeTodo(todo.id)}>
                                Yes
                            </div>
                            <div onClick={() => setDeletePopupOpen(false)}>
                                No
                            </div>
                        </DeleteConfermationBox>
                    </DeleteBox> : '' }
                </Mydiv>
            ))}
        </div>
    )
}

export default Todo;