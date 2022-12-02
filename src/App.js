import React, { useState } from "react";
import TodoList from "./components/TodoList";
import DehazeIcon from '@mui/icons-material/Dehaze';


function App() {
  const [openTodoList, setOpenTodoList] = useState(false);

  
  return (
    <div style={{display:'grid', justifyContent: 'center'}}>
      <header >
        <div style={{display: 'flex',justifyContent: 'start', width:800, backgroundColor: '#800080', color: '#FFFFFF' }}>
          <div style={{marginLeft: 50, paddingTop: 25}}>
          <DehazeIcon onClick={() => setOpenTodoList(!openTodoList)}  />
          </div>
          <div style={{marginLeft: 200}}>
          <h1>Motoff To-do List</h1>
          </div>
        </div>
      </header>
      {openTodoList === true ?
          <TodoList /> 
          : ''
      }
    </div>
  );
}

export default App;
