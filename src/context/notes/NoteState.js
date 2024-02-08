import NoteContext from "./NoteContext";
import React, { useState } from "react";
 


const NoteState = (props) => {
    const host = "http://localhost:5000"

    const notesInitial=[]
    const [notes, setNotes] = useState(notesInitial)

     // Get all note
    
     const getNotes = async () => {
      // API call
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: 'GET',
        headers:{
          'content-type':'application/json',
        "auth-token":localStorage.getItem('token')
      }
      });
    const json = await response.json()
    setNotes(json)
    
  }

    // Add a note
    
      const addNote = async (title, description, tag) => {
          // API call
          const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers:{
              'content-type':'application/json',
            "auth-token":localStorage.getItem('token'),
          }, 
            body:JSON.stringify({title, description, tag})
          });
          const note = await response.json()
          setNotes(notes.concat(note))
    props.showAlert("Note has been added sucessfully", "success")

      }
    // Delete a note
    
      const deleteNote = async (id) => {
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
          method: 'DELETE',
          headers:{
            'content-type':'application/json',
          "auth-token":localStorage.getItem('token'),
        }
        });
        const json = await response.json()
        console.log(json)
        const newNotes = notes.filter((note)=>{return note._id!==id})
        setNotes(newNotes)
    props.showAlert("Note has been deleted sucessfully", "success")

      }
    // Edit a note
      const editNote = async (id , title, description, tag) => {
        // API call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
          method: 'PUT',
          headers:{
            'content-type':'application/json',
          "auth-token":localStorage.getItem('token')
        }, 
          body:JSON.stringify({title,description,tag})
        });
        const json = await response.json()
        console.log(json)
        
      
      // Logic to edit in client
      let NewNotes = JSON.parse(JSON.stringify(notes))
        for (let index = 0; index < NewNotes.length; index++) {
          const element = NewNotes[index];
          if (element._id===id) {
            NewNotes[index].title = title;
            NewNotes[index].description = description;
            NewNotes[index].tag = tag;
          break;
          }
        }
        setNotes(NewNotes)
    props.showAlert("Note has been updated sucessfully", "success")

      }

    return (
        <NoteContext.Provider value={{notes, addNote, deleteNote, editNote, getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
    }


export default NoteState;