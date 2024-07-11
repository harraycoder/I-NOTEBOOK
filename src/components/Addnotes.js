import React, { useContext, useState } from "react";
import noteContext from '../context/notess/NoteContext';


const Addnotes = () => {
    const  context=useContext(noteContext);
    const{addNote}=context; 

    const[note,setNote]=useState({title:"",description:"",tag:""})
    const hc=(e)=>{
        e.preventDefault();    //no relode
     addNote(note.title,note.description,note.tag);
    setNote({title:"",description:"",tag:""})   //if i can add not and click add note button  after that all note from title,dis,tag box are clean
    }
    const oc=(e)=>{                                 //(e) is the parameter of the arrow function,
    setNote({...note,[e.target.name]:e.target.value})   //Spread Operator (...):...note spreads the current state (note object) into a new object. This is done to ensure that the existing key-value pairs in the state are retained.
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
