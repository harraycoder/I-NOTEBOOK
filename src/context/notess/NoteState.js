import React, { useState } from "react";

import NoteContext from "./NoteContext";


const NoteState = (props) => {
  const host = "http://localhost:5000";
  const noteIn = [];
  const [notes, setNotes] = useState(noteIn);

  //get all  notes
  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token'),
      },
    });
    const json = await response.json();
    console.log(json);
    setNotes(json);
  };

  //add notes
  const addNote = async ( title, description, tag) => {
    //API call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token'),
      },

      body: JSON.stringify({ title, description, tag }),  // stringify:-converts a JavaScript value (object or array) into a JSON string
    });

    //final title,discription,tag are passed ave from other side

    const note =await response.json();
    setNotes(notes.concat(note)); //noteIn.map is not given array but noteIn.concet is given new array

  
  };

  //Delete notes
  const deleteNote = async(id) => {
    //API call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "delete",

      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token'),
      }
    });
    const json = response.json(); // parses JSON response into native JavaScript objects
    console.log(json)

    const newNote = notes.filter((note) => {
      return note._id !== id;
    }); //if note._id is not equval to id so note is show other wise mote is delete
    setNotes(newNote);
  };

  //Edit notes
  const editNote = async (id, title, description, tag) => {
      //API call
    // Default options are marked with *
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token'),
      },
      
      body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
    });
    const json = response.json(); // parses JSON response into native JavaScript objects
    console.log(json);

    let newNotes=JSON.parse(JSON.stringify(notes))  //update note pass copy pased in for loop Notes.js
    for (let index = 0; index < notes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
      
    }
    setNotes(newNotes)
  };


  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
