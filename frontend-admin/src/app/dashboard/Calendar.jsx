"use client";
import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format } from "date-fns";

const fakeEvents = {
  "2025-05-29": [
    { type: "borrow", title: "Mượn: Chí Phèo" },
    { type: "return", title: "Trả: Đôi Mắt Của Mona" },
  ],
  "2025-05-23": [{ type: "borrow", title: "Mượn: Tiếng Việt Lớp 1 - Tập 2" }],
  "2025-05-14": [
    { type: "borrow", title: "Mượn: Mê Cung Của Linh Hồn" },
    { type: "return", title: "Trả: Bồi Dưỡng Học Sinh Giỏi Toán 8 - Tập 2" },
    { type: "return", title: "Trả: Lão Hạc" },
  ],
};

export default function Calendar() {
  const [selected, setSelected] = useState();
  const [showPopup, setShowPopup] = useState(false);
  const [events, setEvents] = useState([]);

  // Lấy danh sách ngày có sự kiện
  const eventDates = Object.keys(fakeEvents).map((key) => new Date(key));

  const handleSelect = (date) => {
    if (!date) return; // tránh lỗi khi date null

    setSelected(date);
    const key = format(date, "yyyy-MM-dd");
    const eventList = fakeEvents[key] || [
      { type: "", title: "Không có sự kiện" },
    ];
    setEvents(eventList);
    setShowPopup(true);
  };
  return (
    <>
      <style>
        {`
            .rdp-month {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            border: 1px solid #D1D5DB;   /* viền xám nhẹ */
            border-radius: 10px;        /* bo góc viền */
            padding-bottom: 0.5rem;            /* padding xung quanh */
            box-shadow: 0 1px 3px rgb(0 0 0 / 0.1); /* bóng nhẹ */
            }

            .rdp-month_caption {
            background-color: #f1f1f1 !important;
            padding: 0.5rem 1rem;
            border-radius: 10px 10px 0 0; /* bo góc trên */
            font-weight: bold !important;
            margin-bottom: 0.5rem;
            }

            .rdp-caption_label {
            color: #062D76 !important;
            font-weight: bold !important;
            font-size: 1.25rem !important;
            text-align: center !important;
            }

            .rdp-chevron {
            fill: #062D67 !important;
            cursor: pointer;
            self-align: center; /* căn giữa */
            }

            .rdp-selected .rdp-day_button {
            border: 2px solid #062D76;
            background-color: white;
            color: #062D76;
            border-radius: 9999px;
            }

          .rdp-today .rdp-day_button{
            background-color: #062D76 !important;
            color: white !important;
            border-radius: 9999px;
          }

          .rdp-day_selected:not(.rdp-day_today) {
            border: 2px solid #062D76;
            background-color: transparent !important;
            color: #062D76 !important;
          }

            .dot-blue .rdp-day_button {
            position: relative; /* để ::after định vị tuyệt đối dựa trên button */
            }

            .dot-blue .rdp-day_button::after {
            content: '';
            position: absolute; /* tuyệt đối */
            bottom: 2px;        /* cách đáy button 4px (tuỳ chỉnh) */
            left: 50%;
            transform: translateX(-50%);
            width: 6px;
            height: 6px;
            background-color: #062D76;
            border-radius: 9999px;
            pointer-events: none; /* tránh chặn sự kiện chuột */
            }

            /* Dot trắng cho ngày hôm nay có sự kiện */
        .rdp-today.dot-blue .rdp-day_button::after {
        background-color: white !important;
        }

          .rdp-outside .rdp-day_button  {
            color: #989898 !important;
          }
        `}
      </style>

      <DayPicker
        mode="single"
        selected={selected || new Date()}
        onSelect={handleSelect}
        showOutsideDays
        modifiers={{ hasEvent: eventDates }}
        modifiersClassNames={{ hasEvent: "dot-blue" }}
      />

      {showPopup && (
        <div className="absolute top-[50%] left-[84%] -translate-x-1/2 mt-2 bg-white border rounded shadow-md p-4 z-50 w-64">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-bold text-[#062D76]">
              Sự kiện ngày {format(selected, "dd/MM/yyyy")}
            </h2>
            <button
              onClick={() => setShowPopup(false)}
              className="text-sm text-gray-500 hover:text-red-500 cursor-pointer"
            >
              ✕
            </button>
          </div>
          <ul className="text-sm text-gray-800 list-disc pl-5 space-y-1">
            {events.map((event, i) => (
              <li key={i}>
                {event.type === "borrow"
                  ? "📘"
                  : event.type === "return"
                  ? "📤"
                  : ""}{" "}
                {event.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
