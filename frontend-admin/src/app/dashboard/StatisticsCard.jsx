import React from "react";

const StatisticsCard = ({ title, value, percentage, status, bgColor }) => {
  const getStatusDisplay = () => {
    if (status === "up") {
      return { icon: "▲", color: "text-[#037847]" };
    }
    else {
      return { icon: "▼", color: "text-[#E02424]" };
    }
  };

  const { icon, color } = getStatusDisplay();

  return (
    <article
      className={`flex flex-col flex-1 self-stretch justify-between px-3 pb-[1.25rem] pt-1 my-auto rounded-xl border-1 h-full max-md:max-w-full ${bgColor}`}
    >
      <header className="flex gap-3 items-center px-3 pt-[1.25rem] pb-[1rem] w-full text-[1.125rem] text-[#131313]">
        <h2 className="flex-1 shrink gap-2.5 self-stretch my-auto basis-0 w-full font-[500] text-[1rem] text-[#82879D">
          {title}
        </h2>
      </header>
      <section className="flex gap-2 items-center px-3 w-full text-[1.5rem] font-bold text-[#1A2656] whitespace-nowrap">
        <p className="flex shrink gap-2.5 self-center my-auto basis-0 w-full">
          {value}
        </p>
        <p className={`flex items-center text-[1rem] font-[500] ${color}`}>
          {icon} {percentage}%
        </p>
      </section>
    </article>
  );
};

export default StatisticsCard;
