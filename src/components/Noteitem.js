import React, { useContext } from 'react'
import noteContext from "../context/notess/NoteContext";

const Noteitem = (props) => {
    const context=useContext(noteContext);
    const {deleteNote}=context;
  const  {note,updateNote}=props;
  return (
    <div className="col-md-3 my-2 ">
      
      
      <div className="card" >
  <div className="card-body">
    <h5 className="card-title">{note.title}</h5>
    <p className="card-text">{note.description}</p>
    <p className="card-text">{note.tag}</p>
    <i className="fa-solid fa-delete-left mx-2" onClick={()=>{deleteNote(note._id)}}></i>
    <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}}></i>
   
  </div>
</div>
    </div>
  )
}

export default Noteitem
