// import { useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import Addnew from "./components/add.compo.jsx";
import Card from "./components/card.compo.jsx";

import {useState} from "react";
import "./App.css";

function App() {
  const [isAddNewVisible, setIsAddNewVisible] = useState(false);

  const [editNote, setEditNote] = useState(null);

  const openAddNew = () => setIsAddNewVisible(true);
  const closeAddNew = () => {
    setIsAddNewVisible(false);
    setEditNote(null); 
  };
  const handleEditNote = (note) => {
    setEditNote(note); 
    openAddNew(); 
  };

  const [items, setItems] = useState([]);

  const handleAddNewItem = (note) => {
    if(note.id){
      setItems((prevItem) => 
      prevItem.map((n) =>(n.id === note.id ? {...n , ...note} : n)))
    }else{
      const newItem = {...note , id:Date.now() };
      setItems((prevItem) => [...prevItem , newItem]);
    }
    closeAddNew();
  };

  const filterItemsByStatus = (status) => {
    return items.filter((item) => item.status === status);
  };
  return (
    <>
    <div className={`${isAddNewVisible && 'overlay'} h-screen`}>
      <div className={`${isAddNewVisible && 'blur-sm opacity-50'} upperContainer flex justify-between px-8 py-5`}>
        <div className={`search flex items-center border-2 rounded-md bg-white`}>
          <FaMagnifyingGlass className="mx-4 " />
          <input
            type="text"
            placeholder="Search items"
            className="px-4 py-2 border-l-2"
          />
        </div>
        <button onClick={openAddNew} className={`${isAddNewVisible && 'blur-sm opacity-50'}addNew bg-blue-500 text-white rounded-md px-4 py-2`}>
          New Item
        </button>
      </div>
      <div className="main px-8 grid grid-cols-4 gap-8 ">
        <Card toggle={isAddNewVisible} onEdit={handleEditNote} title={'To do'} items={filterItemsByStatus("To do")}/>
        <Card toggle={isAddNewVisible} onEdit={handleEditNote} title={'In Progress'} items={filterItemsByStatus("In Progress")}/>
        <Card toggle={isAddNewVisible} onEdit={handleEditNote} title={'In Review'} items={filterItemsByStatus("In Review")}/>
        <Card toggle={isAddNewVisible} onEdit={handleEditNote} title={'Done'} items={filterItemsByStatus("Done")}/>
      </div>
    </div>
    {isAddNewVisible && <Addnew onXmarkClick={closeAddNew} onSave={handleAddNewItem} note={editNote}/>}
    </>
  );
}

export default App;
