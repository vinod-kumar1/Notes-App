import React, {
  isValidElement,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import "./App.css";

let defaultNote = {
  title: "",
  body: "",
};

export default function App() {
  let [notes, setNotes] = useState([]);
  let [editing, setIsEditing] = useState(false);
  let selectedExistingNote = useRef([false, null]);
  let toast = useRef();

  let mainTitle = useRef();
  let mainBody = useRef();

  function EditingArea() {
    let [title, setTitle] = useState();
    let [body, setBody] = useState();

    function saveNote() {
      if (!selectedExistingNote.current[0]) {
        setNotes((p) => [...p, { title: title, body: body, id: p.length }]);
      } else {
        setNotes((p) => {
          let res = structuredClone(p);
          res[selectedExistingNote.current[1]].title = mainTitle.current.value;
          console.log("fsef");
          res[selectedExistingNote.current[1]].body = mainBody.current.value;
          return res;
        });
      }
      emptyEditingArea();
      showToast();
      //   alert("Progress Saved and Emptying the Editing Area");
    }

    function showToast() {
      //   const toast = document.getElementById("toast");
      toast.current.classList.add("show");

      // Hide the toast after 1 second
      setTimeout(function () {
        toast.current.classList.remove("show");
      }, 2000); // The toast will disappear after 1 second
    }

    return (
      <div className="editingarea">
        <input
          type="text"
          ref={mainTitle}
          placeholder="Enter the Title here..."
          id="title"
          value={mainTitle.current?.value || title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <textarea
          onChange={(e) => setBody(e.target.value)}
          value={mainBody.current?.value || body}
          ref={mainBody}
          placeholder="Enter the Note Content here..."
          name="body"
          id="body"
          rows={15}
        ></textarea>
        <button onClick={saveNote}>Save</button>
      </div>
    );
  }

  function createNotes() {
    setIsEditing(true);
    selectedExistingNote.current = [false, null];
    emptyEditingArea();
  }

  useEffect(() => {
    console.log(mainTitle.current);
  }, [setIsEditing]);

  function emptyEditingArea() {
    if (mainTitle.current?.value) {
      mainTitle.current.value = "";
      mainBody.current.value = "";
    }
  }

  function showNote(note) {
    selectedExistingNote.current = [true, note.id];
    mainTitle.current.value = note.title;
    mainBody.current.value = note.body;
  }

  return (
    <>
      <h2 id="heading">Notes App</h2>
      <div className="container">
        <button onClick={createNotes} id="notes-btn">
          + New Notes
        </button>
        {notes.length > 0 && (
          <div className="notes-list">
            <h4>Notes List</h4>
            {notes.map((note, id) => {
              return (
                <>
                  <div
                    key={id}
                    className={`note`}
                    onClick={() => showNote(note)}
                  >
                    <h4>{note.title}</h4>
                    <p>{note.body.slice(0, 10)}</p>
                  </div>
                  <br />{" "}
                </>
              );
            })}
          </div>
        )}
        {editing && <EditingArea />}
        <div className="toast" ref={toast}>
          Progress Saved and Emptying the Editing Area
        </div>
      </div>
    </>
  );
}
