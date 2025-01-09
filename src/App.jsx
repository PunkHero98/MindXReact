import Addnew from "./components/add.compo.jsx";
import PopupModal from "./components/PopupModal.compo.jsx";
import HeaderApp from "./components/Header.compo.jsx";
import { useState } from "react";
import "./App.css";
function App() {
  const [isAddNewVisible, setIsAddNewVisible] = useState(false);
  const [editNote, setEditNote] = useState(null);
  const [searchQuerry, setSearchQuerry] = useState("");
  const [items, setItems] = useState([]);
  const listCard = ["To do", "In Progress", "In Review", "Done"];
  const handleSearch = (value) => {
    setSearchQuerry(value);
  };
  const openAddNew = (status) => {
    if (status) {
      setEditNote({ status: status });
      setIsAddNewVisible(true);
      return;
    }
    setIsAddNewVisible(true);
  };
  const closeAddNew = () => {
    setIsAddNewVisible(false);
    setEditNote(null);
  };
  const handleEditNote = (note) => {
    setEditNote(note);
    openAddNew();
  };

  const handleAddNewItem = (note) => {
    if (note.id) {
      setItems((prevItem) =>
        prevItem.map((n) => (n.id === note.id ? { ...n, ...note } : n))
      );
    } else {
      const newItem = { ...note, id: Date.now() };
      setItems((prevItem) => [...prevItem, newItem]);
    }
    closeAddNew();
  };

  const filterItemsByStatus = (status) => {
    return items.filter((item) => item.status === status);
  };
  return (
    <>
      <div className={`${isAddNewVisible && "overlay"} h-screen`}>
        <HeaderApp
          handleSearch={handleSearch}
          openAddNew={openAddNew}
          isAddNewVisible={isAddNewVisible}
        />
        <div className="main px-8 grid grid-cols-4 gap-8 ">
          {listCard.map((item, index) => (
            <PopupModal
              key={`${Date.now()}-${index}`}
              title={item}
              items={filterItemsByStatus(item)}
              toggle={isAddNewVisible}
              onEdit={handleEditNote}
              searchQuerry={searchQuerry}
              openAddNew={() => openAddNew(item)}
            />
          ))}
        </div>
      </div>
      {isAddNewVisible && (
        <Addnew
          onXmarkClick={closeAddNew}
          onSave={handleAddNewItem}
          note={editNote}
        />
      )}
    </>
  );
}

export default App;
