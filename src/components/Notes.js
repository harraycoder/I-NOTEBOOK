import noteContext from "../context/notess/NoteContext";
import React, { useContext, useEffect,useRef,useState } from "react";
import Noteitem from "./Noteitem";
import Addnotes from "./Addnotes";
import { useNavigate } from 'react-router-dom';


//edite the note
const Notes = () => {
    
  const context = useContext(noteContext);
  let navigate=useNavigate();
  const { notes, getNotes,editNote } = context;
  useEffect(()=>{
    if (localStorage.getItem('token')){  
    getNotes()
    }
    else{
     navigate("/login");

    }
  },[])
  

  const ref=useRef(null)
  const refClose=useRef(null)  
  const[note,setNote]=useState({id:"",etitle:"",edescription:"",etag:"default"})

 const updateNote=(currentNote)=>{
    ref.current.click();
   
    setNote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag})   


 const hc=(e)=>{
    e.preventDefault();    
    editNote(note.id,note.etitle,note.edescription,note.etag);
    refClose.current.click();        

 console.log(note)
}
const oc=(e)=>{                            
setNote({...note,[e.target.name]:e.target.value})   
}


  return (
    <>
      <Addnotes />
      <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" ref={ref}>
     Launch demo modal
</button>
<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Edite Note</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
     
        <form>

<div className="mb-3">
  <label htmlFor=" title" className="form-label">title</label>
  <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" value={note.etitle} onChange={oc} minLength={5} required/>
</div>


<div className="mb-3">
  <label htmlFor="description" className="form-label">Description</label>
  <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={oc} minLength={5} required/>

</div>


<div className="mb-3">
  <label htmlFor="tag" className="form-label">Tag</label>
  <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={oc}/>

</div>
</form>


      </div>
      <div className="modal-footer">
        <button  type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={refClose}>Close</button>
        <button disabled={note.etitle.length<5 || note.edescription.length<5}  type="button" className="btn btn-primary" onClick={hc}>Update Note</button>
      </div>
    </div>
  </div>
</div>
      <div className="row my-3">
        <h2>YOUR NOTE</h2>
        {/* <div className="container">
        {notes.length===0 && 'No notes to display'}
        </div> */}
        {notes.map((note) => {
          return <Noteitem key={note._id}  note={note} updateNote={updateNote}/>; 
        })}
      </div>
    </>
  );
};

export default Notes;
