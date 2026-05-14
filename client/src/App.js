
import React from 'react'
import './App.css';
import Landing from './pages/Landing/Landing'
import ToDoList from './pages/ToDo/ToDoList'
import Login  from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import {Routes,Route} from 'react-router-dom';
import 'antd/dist/reset.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/to-do-list" element={<ToDoList/>}/>
    </Routes>
  )
}

export default App




/*import { useEffect, useState } from 'react';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { BsCheckLg } from 'react-icons/bs';  
import './App.css';
import { BiBorderAll } from 'react-icons/bi';
import { FaBeer } from "react-icons/fa";


function App() 
{

  const [isCompletedScreen,setIsCompletedScreen]  = useState(false);
  const[allTodos,setAllTodos] = useState([]);  //Array of objects
  const[newtitle,setNewTitle] = useState("");
  const[description,setDescription] = useState("");
  const[completedTodos,setCompletedTodos] = useState([]);
  const[currentEdit,setCurrentEdit] = useState("");
  const[currentEditedItem,setCurrentEditedItem] = useState("");



  const handleEdit = (ind,item) =>
  {
    setCurrentEdit(ind);
    setCurrentEditedItem(item);
  }


  const  handleUpdateTitle = (value) =>
  {
             setCurrentEditedItem((prev)=>
             {
               return {...prev,title:value}
             })
  }

  const handleUpdateDescription = (value) =>
  {
    
    setCurrentEditedItem((prev)=>
      {
        return {...prev,description:value}
      })

  }


  const handleUpdateToDo = () => 
  {
          let newToDo = [...allTodos];
          newToDo[currentEdit] = currentEditedItem;
          setAllTodos(newToDo);
          localStorage.setItem('todolist', JSON.stringify(newToDo));
          setCurrentEdit(null);
  }

  const handleTodo = () =>
  {

    let newTodoItem = 
    {
        title:         newtitle,
        description:   description
    }

    let updatedToDolist = [...allTodos];  //spread operator
     updatedToDolist.push(newTodoItem);
     setAllTodos(updatedToDolist);   
     localStorage.setItem('todolist',JSON.stringify(updatedToDolist));

     setNewTitle('');
     setDescription('');
  }


  const handleComplete = (index) =>
  {
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth();
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let e = now.getMinutes();
    let s = now.getSeconds();
    let completedOn = dd + "-" + mm + "-" + yyyy + " at " + h + ":" + e + ":" + s;

    let filteredItem = 
    {
      ...allTodos[index],
      completedOn:completedOn

    }
    let updatedCompletedArr = [...completedTodos];
    updatedCompletedArr.push(filteredItem);
    setCompletedTodos(updatedCompletedArr);

    localStorage.setItem('completedtodolist', JSON.stringify(updatedCompletedArr));
    handleDelete(index);


  }

  
  
  const handleDelete = (index) =>
  {
        let reducedtodo = [...allTodos];
        reducedtodo.splice(index,1);

        localStorage.setItem('todolist',JSON.stringify(reducedtodo));
        setAllTodos(reducedtodo);
  }


  const handleDeleteCompletedTodo = (index) =>
  {
    let reducedtodo = [...completedTodos];
    reducedtodo.splice(index,1);
    localStorage.setItem('completedtodolist',JSON.stringify(reducedtodo));
    setCompletedTodos(reducedtodo);
  }


  useEffect(()=>
  {
    let savedtodos = JSON.parse(localStorage.getItem('todolist'));
    let savedcompletedtodos = JSON.parse(localStorage.getItem('completedtodolist'));

    if(savedtodos)
    {
      setAllTodos(savedtodos);
    }

    if(savedcompletedtodos)
    {
          setCompletedTodos(savedcompletedtodos);
    
    }   

   
  },[])  //For Initial rendering.




  return (
   <>
   <h1 style={{ color: '#D5006D' }}>My Todos</h1>

    <div className='todo-wrapper'>

      <div className="todo-input">
        <div className="todo-input-item">
          <label style={{ color: '#D5006D' }}>Title</label>
          <input type="text"  value = {newtitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="What is the task title ?"/>
        </div>
        <div className="todo-input-item">
          <label style={{ color: '#D5006D' }}>Description</label>
          <input type="text" value = {description} onChange={(e) => setDescription(e.target.value)}  placeholder="What is the task description ?"/>
        </div>
        <div className="todo-input-item">
          <button type="button"  onClick={handleTodo} className="primary-Btn">Add</button>
        </div>
      </div>


      <div className="btn-area">
          <button 
            className={`secondary-Btn ${isCompletedScreen===false && 'active'}`} 
            onClick={()=>setIsCompletedScreen(false)}>
            ToDo
          </button>
          <button 
            className={`secondary-Btn ${isCompletedScreen===true && 'active'}`} 
            onClick={()=>setIsCompletedScreen(true)}>
            Completed
          </button>
      </div>


      <div className="todo-list">

        {
          isCompletedScreen === false && allTodos.map((item,index) =>
          {
            if(currentEdit === index)
            {
              return(
                <div className='edit_wrapper' key={index}>

                    <input type="text" 
                    placeholder='Updated title'
                    value = {currentEditedItem.title}
                    onChange={(e)=>{ handleUpdateTitle(e.target.value)}}/>

                    <input type="textarea"  placeholder='Title Description'
                    value = {currentEditedItem.description}
                    rows={4}
                    onChange={(e)=>{handleUpdateDescription(e.target.value)}}/>
                    <br></br>
                    

                    <button className='primary-Btn' onClick={handleUpdateToDo}>Update</button>
                       
               </div>
              )
             
            }
            else
            {
              return(
                <div className="todo-list-item" key={index}>
                    <div>
                        <h3 style={{ color: '#830c4a'}}>{item.title}</h3>
                        <p style={{ color: 'black'}}> {item.description}  </p>
                    </div>
                    <div className="one">
                        <AiOutlineDelete className='icon' onClick={()=>handleDelete(index)}/>
                        <BsCheckLg className='check-icon' onClick={()=>handleComplete(index) }/>
                        <AiOutlineEdit className='check-icon' onClick={()=>handleEdit(index,item) }/>
                    </div>
                </div>
  

              )
            }
           
            
          })
      }

        {
          isCompletedScreen === true && completedTodos.map((item,index) =>
          {
            return(
              <div className="todo-list-item" key={index}>
                  <div>
                      <h3>{item.title}</h3>
                      <p>
                        <small style={{color:'#D5006D', fontSize: '12px'}}>   Completed On:  {item.completedOn}  </small>
                         <br></br><br></br>
                         <span style={{ color: 'black'} }>{item.description}</span>

                      </p>
                  </div>
                  <div className="one">
                      <AiOutlineDelete className='icon' onClick={()=>handleDeleteCompletedTodo(index)}/>
                  </div>
              </div>
            )
            
          })
        }
       

      </div>


    </div>
   </>
  );
}

export default App;*/
