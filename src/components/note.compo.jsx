import { LuPencilLine } from "react-icons/lu";
import { BsPaperclip } from "react-icons/bs";
import { RiFlagFill } from "react-icons/ri";
import PropTypes from "prop-types"; // Import PropTypes
import { ClockCircleOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
function Note({ items, onEdit }) {
  const cleanDate = () => {
    let cleanDateString = items.date.replace(/(\d+)(st|nd|rd|th)/, "$1");
    let date = new Date(cleanDateString);
    let timestamp = date.getTime();
    return timestamp;
  };
  const checkFlag = () => {
    const today = Date.now();
    return cleanDate() < today;
  };
  const countDue = () => {
    const today = Date.now();
    return Math.round((today - cleanDate()) / 86400000);
  };

  return (
    <div className="mt-4 bg-white px-4 rounded-lg">
      <div className="top flex justify-between py-4">
        <h1 className="text-base merriweather-bolder">{items.title}</h1>
        <LuPencilLine className="text-2xl" onClick={onEdit} />
      </div>
      <div className="text_container mb-5 merriweather">
        <p>{items.description}</p>
      </div>
      <span className="bg-[#1677ff] text-white p-2 rounded-md merriweather-bold text-">
        {items.assignment}
      </span>
      <hr className="mt-5 mb-3" />
      <div className="bottom flex justify-center items-center gap-8 pb-4">
        <div className="clip flex justify-center items-center ">
          <BsPaperclip className="text-3xl hover:text-[#1677ff]" />
          <label className="roboto-slab-base text-base" htmlFor="">
            3
          </label>
        </div>
        <Tooltip
          title={`${checkFlag() ? `Over Due ${countDue()} Days` : "On Time"}`}
        >
          <RiFlagFill
            className={`${
              checkFlag() ? "text-red-500" : "text-green-500"
            } text-2xl `}
          />
        </Tooltip>
        <div className="dueTime flex justify-center items-center">
          <ClockCircleOutlined className="text-2xl mr-2" />
          <label className="roboto-slab-base" htmlFor="">
            {items.date}
          </label>
        </div>
      </div>
    </div>
  );
}

Note.propTypes = {
  items: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    assignment: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default Note;
