import Addnew from "./components/main/add.compo.jsx";
import PopupModal from "./components/main/PopupModal.compo.jsx";
import HeaderApp from "./components/main/Header.compo.jsx";
import LoginForm from "./components/login/loginForm.compo.jsx";
import CalendarWithEvents from "./components/smallComponent/calendar.jsx";
import RegisForm from "./components/register/regisForm.compo.jsx";
import { notification } from "antd";
import { useState, useEffect } from "react";
import { getNote } from "./api/apiHandle.js";
import { SyncOutlined } from "@ant-design/icons";
import "./App.css";
function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [isRegis, setIsRegis] = useState(false);
  const [isAddNewVisible, setIsAddNewVisible] = useState(false);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [editNote, setEditNote] = useState(null);
  const [searchQuerry, setSearchQuerry] = useState("");
  const [items, setItems] = useState([]);
  const [nameForHeader, setNameForHeader] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const listCard = ["To do", "In Progress", "In Review", "Done"];

  const handleLogin = () => {
    setIsLogin((prevState) => !prevState);
    fetchData();
  };
  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("selectUser");
    setIsLogin(false);
    setNameForHeader(null);
    setItems([]);
  };
  const fetchData = async () => {
    try {
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      const result = await getNote();
      if (result.success === true) {
        setItems(() =>
          result.data.filter((item) => item.assignment == currentUser.username)
        );
        setIsLoading(true);
        return;
      }
      setIsLoading(true);
      notification.error({
        message: result.message,
        placement: "topRight",
        duration: 1.5,
      });
      return;
    } catch (err) {
      setIsLoading(true);

      notification.error({
        message: err.message,
        placement: "topRight",
        duration: 1.5,
      });
    }
  };
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (currentUser && currentUser.username) {
      fetchData();
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
  const closeCalendar = () => {
    setIsCalendarVisible(false);
  };
  const openCalendar = () => {
    setIsCalendarVisible(true);
  };
  const handleAddNewItem = () => {
    setIsLoading(false);
    fetchData();
    closeAddNew();
  };
  const openRegisForm = () => setIsRegis((prevItem) => !prevItem);

  const filterItemsByStatus = (status) => {
    const result = items.filter((item) => item.status === status);
    return result;
  };

  useEffect(() => {
    console.log(isRegis);
  }, [isRegis]);
  return (
    <>
      {!isLogin ? (
        isRegis ? (
          <RegisForm openRegisForm={openRegisForm} isRegis={isRegis} />
        ) : (
          <LoginForm
            handleLogin={handleLogin}
            setName={setNameForHeader}
            openRegisForm={openRegisForm}
          />
        )
      ) : (
        <>
          <div
            className={`${isAddNewVisible && "overlay"} ${
              isCalendarVisible && "overlay"
            } h-screen`}
          >
            <HeaderApp
              handleSearch={handleSearch}
              openAddNew={openAddNew}
              isAddNewVisible={isAddNewVisible}
              handleLogout={handleLogout}
              username={nameForHeader}
              openCalendar={openCalendar}
            />
            {isLoading ? (
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
            ) : (
              <div className="absolute left-[800px] top-1/3 text-4xl text-[#1677ff]">
                <SyncOutlined spin className="mr-12" />
                <span className="pacifico ">Loading data ...</span>
              </div>
            )}
          </div>
          {isAddNewVisible && (
            <Addnew
              onXmarkClick={closeAddNew}
              onSave={handleAddNewItem}
              note={editNote}
            />
          )}
          {isCalendarVisible && (
            <CalendarWithEvents onCloseCalendar={closeCalendar} />
          )}
        </>
      )}
    </>
  );
}

export default App;
