import React, { useState } from "react";
import { useContext } from "react";
import NoteContext from "../context/notes/NoteContext";


const AddNote = () => {
    const context = useContext(NoteContext)
  const {addNote} = context;
  const [note, setNote] = useState({title:"", description:"", tag:""})

  const handleClick = (e) => {
    e.preventDefault()
    addNote(note.title, note.description, note.tag)
    setNote({title:"", description:"", tag:""})
  }
  const onChange = (e)=>{
    setNote({...note, [e.target.name]: e.target.value})
  }
  return (
    <div>
      <div className="container my-3">
        <h2>Add a Note</h2>
        <form className="my-3">
          <div className="mb-3">
            <label htmlFor="title"  className="form-label">Title</label>
            <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp"  value={note.title} onChange={onChange}/>
          </div>
          <div className="mb-3">
         <label htmlFor="description" className="form-label">Description</label>
            <input type="text" className="form-control" id="description" name="description" value={note.description}  onChange={onChange}/>
          </div>
          <div className="mb-3">
         <label htmlFor="tag" className="form-label">Tag</label>
            <input type="text" className="form-control" id="tag" name="tag" value={note.tag}  onChange={onChange}/>
          </div>
        
          <button type="submit" disabled={note.title.length<5 || note.description.length<7} className="btn btn-primary" onClick={handleClick}>Add a note</button>
        </form>
      </div>
    </div>
  );
};

export default AddNote;
