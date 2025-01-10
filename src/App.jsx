import Addnew from "./components/main/add.compo.jsx";
import PopupModal from "./components/main/PopupModal.compo.jsx";
import HeaderApp from "./components/main/Header.compo.jsx";
import LoginForm from "./components/login/loginForm.compo.jsx";
import { useState, useEffect } from "react";
import "./App.css";
function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [isAddNewVisible, setIsAddNewVisible] = useState(false);
  const [editNote, setEditNote] = useState(null);
  const [searchQuerry, setSearchQuerry] = useState("");
  const [items, setItems] = useState([]);
  const [nameForHeader, setNameForHeader] = useState(null);
  const listCard = ["To do", "In Progress", "In Review", "Done"];

  const handleLogin = () => setIsLogin((prevState) => !prevState);
  const handleLogout = () => {
    localStorage.removeItem("currentUser"); // Xóa thông tin đăng nhập
    setIsLogin(false); // Cập nhật trạng thái là chưa đăng nhập
    setNameForHeader(null);
  };
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (currentUser && currentUser.username) {
      setIsLogin(true);
      setNameForHeader(currentUser.username);
    } else {
      setIsLogin(false);
    }
  }, []);

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
    console.log(note);
    // if (note["_id"]) {
    //   setItems((prevItem) =>
    //     prevItem.map((n) =>
    //       n["_id"] === note["_id"] ? { ...n, ...note } : { ...note }
    //     )
    //   );
    //   console.log(true);
    // } else {
    //   const newItem = { ...note, _id: Date.now() };
    //   setItems((prevItem) => [...prevItem, newItem]);
    //   console.log(false);
    // }
    setItems(
      (prevItems) =>
        prevItems.some((n) => n["_id"] === note["_id"]) // Kiểm tra xem có ghi chú với _id trùng không
          ? prevItems.map(
              (n) => (n["_id"] === note["_id"] ? { ...n, ...note } : n) // Nếu có _id trùng, cập nhật ghi chú
            )
          : [...prevItems, { ...note }] // Nếu không có _id trùng, thêm ghi chú mới vào
    );

    closeAddNew();
  };

  const filterItemsByStatus = (status) => {
    const result = items.filter((item) => item.status === status);
    return result;
  };

  useEffect(() => {
    console.log("Updated items:", items);
  }, [items]);
  return (
    <>
      {!isLogin ? (
        <LoginForm handleLogin={handleLogin} setName={setNameForHeader} />
      ) : (
        <>
          <div className={`${isAddNewVisible && "overlay"} h-screen`}>
            <HeaderApp
              handleSearch={handleSearch}
              openAddNew={openAddNew}
              isAddNewVisible={isAddNewVisible}
              handleLogout={handleLogout}
              username={nameForHeader}
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
      )}
    </>
  );
}

export default App;
