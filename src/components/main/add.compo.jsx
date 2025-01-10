// import { HiXMark } from "react-icons/hi2";
import { useState, useEffect } from "react";
import { Select, Input, DatePicker, Button, notification } from "antd";
import { FlagFilled, CloseSquareOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import moment from "moment";
import { getNote } from "../../api/apiHandle.js";
import { insertNote } from "../../api/apiHandle.js";
const { TextArea } = Input;

function Addnew({ onXmarkClick, onSave, note }) {
  const [id, setId] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(null);
  const [assignment, setAssignment] = useState("");
  const [status, setStatus] = useState("To do");
  const [check, setCheck] = useState("---");

  useEffect(() => {
    if (note) {
      setId(note["_id"] || null);
      setTitle(note.title);
      setDescription(note.description);
      setAssignment(note.assignment);
      setDate(note.date);
      setStatus(note.status);
    }
  }, [note]);
  const renderSelect = () => {
    const users = [
      { userId: 1, name: "Nguyễn Văn A" },
      { userId: 2, name: "Trịnh Hồng M" },
      { userId: 3, name: "Lạc Khôi B" },
    ];
    return [
      ...users.map((f) => ({
        label: <span>{f.name}</span>,
        value: f.name,
      })),
    ];
  };
  const handleSave = async () => {
    // try {
    //   const updatedNote = { title, description, assignment, date, status };
    //   const result = await insertNote(updatedNote);
    //   if (result.success === true) {
    //     onSave(result.data.data);
    //     setTitle("");
    //     setDescription("");
    //     setDate("");
    //     setAssignment("");
    //     setStatus("To do");
    //     notification.success({
    //       message: "Success",
    //       placement: "topRight",
    //       duration: 1.5,
    //     });
    //     return;
    //   }

    //   notification.error({
    //     message: result.message,
    //     placement: "topRight",
    //     duration: 1.5,
    //   });
    // } catch (err) {
    //   notification.error({
    //     message: err.message,
    //     description: "Please try it again later !",
    //     placement: "topRight",
    //     duration: 1.5,
    //   });
    // }
    const updatedNote = {
      _id: id,
      title,
      description,
      assignment,
      date,
      status,
    };

    onSave(updatedNote);
    setTitle("");
    setDescription("");
    setDate("");
    setAssignment("");
    setStatus("To do");
  };
  const handleDate = (date) => {
    if (date) {
      const customFormat = date.format("MMM Do YYYY");
      setDate(customFormat); // Lưu chuỗi
    } else {
      setDate(null); // Xử lý nếu không chọn ngày
    }
  };
  const handleAssingment = (value) => {
    setAssignment(value);
  };
  const handleStatus = (value) => {
    setStatus(value);
  };
  const checkTitle = () => {
    if (title == "") {
      setCheck("Title is required");
    } else {
      setCheck("---");
      handleSave();
    }
  };
  return (
    <div className="w-[700px] h-[600px] bg-white rounded-lg px-4 py-2 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[12] border-2 shadow-lg">
      <div className="first_row flex justify-between items-center mt-5">
        <div className=" w-fit p-1 rounded-xl border-2">
          <FlagFilled className="text-3xl text-green-400" />
        </div>

        <CloseSquareOutlined
          onClick={onXmarkClick}
          className="text-4xl text-[#f5222d] hover:bg-[#f5222d] hover:text-white"
        />
      </div>
      <h2 className="table_name pacifico text-left text-4xl mt-6 mb-9">
        {id ? "Edit Task" : "Save Task"}
      </h2>
      <div className="second_row flex gap-6 mb-1">
        <div className="title w-4/6 flex flex-col">
          <label className="merriweather-bolder text-lg mb-1">
            Title<span className="text-red-500">*</span>
          </label>

          <Input
            className="merriweather-bold text-lg"
            placeholder="Enter title"
            showCount
            value={title}
            style={{ height: 50 }}
            status={check == "---" ? "" : "error"}
            maxLength={50}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div
            className={`merriweather-bolder text-sm mt-1 ${
              check == "---" ? "opacity-0" : "text-red-500"
            }`}
          >
            <span>{check}</span>
          </div>
        </div>
        <div className="endDate w-2/6 flex flex-col">
          <label className="merriweather-bolder text-lg mb-1" htmlFor="">
            End Date <span className="text-red-500">*</span>
          </label>

          <DatePicker
            className="merriweather"
            value={date ? moment(date, "MMM Do YYYY") : null}
            style={{ height: 50 }}
            format="DD-MMM-YYYY"
            onChange={handleDate}
            needConfirm
          />
          <div className="opacity-0">
            <span>----</span>
          </div>
        </div>
      </div>
      <div className="third flex gap-6">
        <div className="description w-4/6 flex flex-col">
          <label className="merriweather-bolder text-lg mb-1" htmlFor="">
            Description <span className="text-red-500">*</span>
          </label>

          <TextArea
            placeholder="Enter description"
            className="merriweather"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            autoSize={{
              minRows: 2,
              maxRows: 6,
            }}
          />
          <div className="opacity-0">
            <span>----</span>
          </div>
        </div>
        <div className="assign w-2/6 flex flex-col">
          <label className="merriweather-bolder text-lg mb-1" htmlFor="">
            Assign <span className="text-red-500">*</span>
          </label>
          <Select
            style={{
              height: 50,
              zIndex: 50,
            }}
            className="merriweather"
            value={assignment}
            onChange={handleAssingment}
            options={renderSelect()}
          />
          <div className="opacity-0">
            <span>----</span>
          </div>
        </div>
      </div>
      <div className="fourth_row flex flex-col">
        <label className="merriweather-bolder text-lg mb-1" htmlFor="">
          Status <span className="text-red-500">*</span>
        </label>
        <Select
          className="merriweather"
          style={{
            height: 50,
            zIndex: 50,
            width: 200,
          }}
          value={status}
          onChange={handleStatus}
          options={[
            {
              label: <span>To do</span>,
              value: "To do",
            },
            {
              label: <span>In Progress</span>,
              value: "In Progress",
            },
            {
              label: <span>In Review</span>,
              value: "In Review",
            },
            {
              label: <span>Done</span>,
              value: "Done",
            },
          ]}
        />
        <div className="opacity-0">
          <span>----</span>
        </div>
      </div>
      <div className="last_row flex justify-between items-center mt-2">
        {/* <button
          onClick={onXmarkClick}
          className="cancel w-[46%] p-3 border-2 rounded-xl text-xl "
        >
          Cancel
        </button> */}
        <Button
          color="danger"
          onClick={onXmarkClick}
          variant="outlined"
          className="cancel pacifico w-[46%] h-12 text-xl"
        >
          Cancel
        </Button>
        {/* <button
          onClick={checkTitle}
          className="save bg-[#7F56D9] w-[46%] p-3 border-2 rounded-xl text-xl text-white"
        >
          Save
        </button> */}
        <Button
          color="primary"
          onClick={checkTitle}
          variant="solid"
          className="save pacifico w-[46%] h-12 text-xl "
        >
          Save
        </Button>
      </div>
    </div>
  );
}

Addnew.propTypes = {
  onXmarkClick: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  note: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    assignment: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }),
};

export default Addnew;
