import React, { useContext, useState } from "react";
import noteContext from '../context/notess/NoteContext';


const Addnotes = () => {
    const  context=useContext(noteContext);
    const{addNote}=context; 

    const[note,setNote]=useState({title:"",description:"",tag:""})
    const hc=(e)=>{
        e.preventDefault();    //no relode
     addNote(note.title,note.description,note.tag);
    setNote({title:"",description:"",tag:""})   
    }
    const oc=(e)=>{                                
    setNote({...note,[e.target.name]:e.target.value}) 
    }

    
  return (
    <div>
      <div className="container my-3">
        <h2>ADD A NOTE</h2>
        <form>

          <div className="mb-3">
            <label htmlFor=" title" className="form-label">title</label>
            <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={note.title}  onChange={oc} minLength={5} required/>
          </div>


          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={oc} minLength={5} required/>

          </div>


          <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={oc}/>

          </div>



          <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={hc}>
            Addnote
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addnotes;
