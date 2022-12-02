import React, { useState } from "react";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";

function AddTodo(props) {
    const [input, setInput] = useState('');

    const handleChange = e => {
        setInput(e.target.value);
    };

    const handleSubmit = e => {
        e.preventDefault();
         props.onSubmit({
             id: Math.floor(Math.random() * 10000),
             text: input
         });
        setInput('');
    };

    return (
        <div>
            <div onSubmit={handleSubmit} style={{marginBottom: 30}}>
                <TextField 
                    fullWidth
                    type="text" 
                    value={input} 
                    name="text" 
                    onChange={handleChange}
                    variant="outlined"
                />
            </div>
            <div>
                <Button onClick={handleSubmit} variant="contained" style={{borderRadius: 50, backgroundColor: '#800080', position: 'absolute', marginTop: -17, marginLeft: 300}}>+ Add Todo</Button>
            </div>
       </div>
    );
} 

export default AddTodo;