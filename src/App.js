
import './App.css';
import { useState,useEffect } from 'react';
import {io} from 'socket.io-client'
let  socket=io('http://localhost:5000/');
function App() { 
  useEffect(()=>{
    // socket.on("Message",(info)=>{
    //   console.log(info)
    // })
    socket.on("roomjoined",(info)=>{
      console.log(info)
    })
    socket.on("roomMsg",(bdata)=>{
      console.log(bdata);
            }) 
  },[])
  const [data,setData]=useState('');
  const handleChange=(e)=>{
    e.preventDefault();
 setData(e.target.value)
  }
  const handleMessage=()=>{
    let obj={
      msg:data,
      name:"mahesh"
    }
socket.emit("sendroomMsg",obj)
  } 
  const joinroom=()=>{
   let group= prompt("enter groupname")
   let obj={
    name:"mahesh",
    group:group
   }
    socket.emit("JOINROOM",obj);
      } 
  return (
    <div className="App">
      <input type='text'name='message' value={data} onChange={handleChange}/><br></br>
      <button onClick={handleMessage}>send room message</button><br></br>
      <button onClick={joinroom}>join room</button>
    </div>
  );
}

export default App;
