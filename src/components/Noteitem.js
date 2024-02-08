import React, { useContext } from "react";
import NoteContext from "../context/notes/NoteContext";


const Noteitem = (props) => {
  const context = useContext(NoteContext);
  const { deleteNote } = context;
  // const {editNote} = context
  const { note, updateNote } = props;
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body"> 
          <div className="d-flex align-items-center">
            <h5 className="card-title">{note.title}</h5>
            <i className="fa-solid fa-trash mx-2" onClick={()=>{deleteNote(note._id)}}></i>
            <i className="fa-regular fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}}></i>
          </div>
          <p className="card-text">
            {note.description}
          </p>
          <h6 className="card-title">{note.tag}</h6>

        </div>
      </div>
    </div>
  );
};

export default Noteitem;
// import React, { useContext } from "react";
// import NoteContext from "../context/notes/NoteContext";

// const Noteitem = (props) => {
//   const { deleteNote } = useContext(NoteContext);
//   // const { editNote } = useContext(NoteContext);
//   const { note } = props;

//   return (
//     <div className="col-md-3">
//       <div className="card my-3">
//         <div className="card-body">
//           <div className="d-flex align-items-center">
//             <h5 className="card-title">{note.title}</h5>
//             <i className="fa-solid fa-trash mx-2" onClick={() => { deleteNote(note._id) }}></i>
//             <i className="fa-regular fa-pen-to-square mx-2"></i>
//           </div>
//           <p className="card-text">
//             {note.description}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Noteitem;

