import Addnew from "./add.compo";
import PopupModal from "./PopupModal.compo";
import HeaderApp from "./Header.compo";
import CalendarWithEvents from "../smallComponent/calendar";
import { notification } from "antd";
import { useState , useEffect } from "react";
import { getNote } from "../../api/apiHandle";
import { SyncOutlined } from "@ant-design/icons";

const Home = () =>{
  const [isAddNewVisible, setIsAddNewVisible] = useState(false);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [editNote, setEditNote] = useState(null);
  const [searchQuerry, setSearchQuerry] = useState("");
  const [items, setItems] = useState([]);
  const [nameForHeader, setNameForHeader] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const listCard = ["To do", "In Progress", "In Review", "Done"];

//   const handleLogin = () => {
//     setIsLogin((prevState) => !prevState);
//     fetchData();
//   };
  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("selectUser");
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
    //   setIsLogin(true);
      setNameForHeader(currentUser.username);
    } else {
    //   setIsLogin(false);
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

  const filterItemsByStatus = (status) => {
    const result = items.filter((item) => item.status === status);
    return result;
  };
    return (
        <>
        <div
          className={`${isAddNewVisible && "overlay"} ${
            isCalendarVisible && "overlay"
          } h-screen`}
        >
          <HeaderApp
            isCalendarVisible={isCalendarVisible}
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
                  isCalendarVisible={isCalendarVisible}
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
          <CalendarWithEvents onCloseCalendar={closeCalendar} noteItems={items} />
        )}
      </>
    )
}

export {Home};