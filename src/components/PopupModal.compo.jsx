import { BsThreeDots } from "react-icons/bs";
import Note from "./note.compo.jsx";
import PropTypes from "prop-types";
import { Card } from "antd";
import { PlusOutlined } from "@ant-design/icons";

function PopupModal({
  toggle,
  onEdit,
  title,
  items,
  searchQuerry,
  openAddNew,
}) {
  const filteredNotes = items.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuerry.toLowerCase()) ||
      note.description.toLowerCase().includes(searchQuerry.toLowerCase())
  );
  return (
    <Card
      className={`${toggle && "blur-sm opacity-50"}mx-4 px-4 py-6 bg-[#E6ECF0]`}
    >
      <div className="top_show flex justify-between items-center">
        <div className="left flex items-center">
          <h2 className="text-2xl font-bold mr-8 pacifico">{title}</h2>
          <span
            className={`numberOfNote cursor-default roboto-slab-base flex justify-center items-center w-8 h-8 rounded-full  text-lg ${
              filteredNotes.length > 0
                ? "bg-[#1677ff] text-white"
                : "bg-[#D5D5D5]"
            }`}
          >
            {filteredNotes.length}
          </span>
        </div>
        <div className="right flex items-center">
          <div
            onClick={openAddNew}
            className="add hover:bg-[#1677ff] transs hover:text-white hover:text-xl  transition duration-300 ease-out flex justify-center cursor-pointer items-center w-8 h-8 rounded-full bg-[#D5D5D5] text-sm mr-4"
          >
            <PlusOutlined onClick={openAddNew} className="cursor-pointer" />
          </div>
          <div className="more flex justify-center items-center w-8 h-8 rounded-full bg-[#D5D5D5] text-sm">
            <BsThreeDots />
          </div>
        </div>
      </div>
      <div className="main">
        {filteredNotes.length > 0 &&
          filteredNotes.map((note) => (
            <Note
              key={`${note.date}-${note.title}`}
              onEdit={() => onEdit(note)}
              items={note}
            />
          ))}
      </div>
    </Card>
  );
}

PopupModal.propTypes = {
  items: PropTypes.array.isRequired,
  toggle: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired,
  searchQuerry: PropTypes.func.isRequired,
  openAddNew: PropTypes.func.isRequired,
};
export default PopupModal;
