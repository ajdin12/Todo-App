import React, { useState } from "react";
import { TextField } from "@mui/material";
import styled from 'styled-components';

const Mydiv = styled.div`
        margin-bottom: 30px;
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

function AddTodo(props) {
    const [input, setInput] = useState('');

    const handleChange = e => {
        setInput(e.target.value);
    };

    const handleSubmit = () => {
         props.onSubmit({
             id: Math.floor(Math.random() * 10000),
             title: input
         });
        setInput('');
    };

    return (
        <div>
            <Mydiv onSubmit={handleSubmit}>
                <TextField 
                    fullWidth
                    type="text" 
                    value={input} 
                    name="text" 
                    onChange={handleChange}
                    variant="outlined"
                />
            </Mydiv>
            <div>
                <Button onClick={handleSubmit}>+ Add Todo</Button>
            </div>
       </div>
    );
} 

export default AddTodo;