import React from "react";

const StatusBadge = ({ status }) => {
  const isAvailable = status === "available";

  return (
    <div className="flex basis-1/4 min-w-0 justify-center w-full items-center">
      <div
        className={`self-center shrink w-[90%] max-w-full px-4 py-2 rounded-[99px] justify-center items-center inline-flex  ${
          isAvailable ? "bg-green-400 text-sky-900" : "bg-red-600 text-white"
        }`}
      >
        <p className="text-center text-xl font-medium truncate">
          {isAvailable ? "Còn sẵn" : "Đã hết"}
        </p>
      </div>
    </div>
  );
};

const BookTableRow = ({ id, title, quantity, status }) => {
  return (
    <article className="flex shrink overflow-hidden bg-white cursor-pointer min-h-[3.5rem] w-full">
      <div className="flex basis-1/4 min-w-0 justify-center items-center bg-[#EBF1F9]">
        <p className="gap-2.5 self-stretch my-auto">{id}</p>
      </div>
      <div className="flex basis-1/4 min-w-0 justify-center items-center">
        <p className="gap-2.5 self-stretch my-auto">{title}</p>
      </div>
      <div className="flex basis-1/4 min-w-0 justify-center items-center bg-[#EBF1F9]">
        <p className="gap-2.5 self-stretch my-auto">{quantity}</p>
      </div>
      <StatusBadge status={status} />
    </article>
  );
};

export default BookTableRow;
