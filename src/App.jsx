// import { useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import Addnew from "./components/add.compo.jsx";
import "./App.css";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <div className="upperContainer flex justify-between mx-8 my-5">
        <div className="search flex items-center border-2 rounded-md">
          <FaMagnifyingGlass className="mx-4" />
          <input
            type="text"
            placeholder="Search items"
            className="px-4 py-2 border-l-2"
          />
        </div>
        <button className="addNew bg-blue-500 text-white rounded-md px-4 py-2">
          New Item
        </button>
      </div>
      <Addnew />
    </>
  );
}

export default App;
