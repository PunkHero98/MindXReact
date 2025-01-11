import { useState } from "react";
import { Calendar, Modal, Badge, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";

const CalendarWithEvents = ({ onCloseCalendar }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [events, setEvents] = useState({
    "2025-01-15": [{ type: "success", content: "Meeting with team" }],
    "2025-01-20": [{ type: "error", content: "Project deadline" }],
  });

  const onSelectDate = (date) => {
    setSelectedDate(date.format("YYYY-MM-DD"));
    setIsModalVisible(true);
  };

  const dateCellRender = (value) => {
    const dateKey = value.format("YYYY-MM-DD");
    const currentEvents = events[dateKey] || [];
    return (
      <ul>
        {currentEvents.map((item, index) => (
          <li key={index}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="ant-picker-calendar w-1/2 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[12]">
      <Button
        className="absolute top-8 left-8 "
        onClick={onCloseCalendar || (() => {})}
        icon={<CloseOutlined />}
      ></Button>
      <Calendar cellRender={dateCellRender} onSelect={onSelectDate} />
      <Modal
        title={`Events on ${selectedDate}`}
        // open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        {selectedDate && events[selectedDate] ? (
          <ul>
            {events[selectedDate].map((event, index) => (
              <li key={index}>
                <Badge status={event.type} text={event.content} />
              </li>
            ))}
          </ul>
        ) : (
          <p>No events for this date.</p>
        )}
      </Modal>
    </div>
  );
};

export default CalendarWithEvents;
