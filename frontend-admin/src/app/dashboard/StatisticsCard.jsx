import React from "react";

const StatisticsCard = ({ icon, title, value, percentage }) => {
  return (
    <article className="self-stretch px-3 pt-1.5 pb-4 my-auto rounded-3xl bg-blue-950 min-w-[15rem] max-h-[230px] max-w-[26rem] max-md:max-w-full">
      <header className="flex gap-3 items-center px-3 py-[1.25rem] w-full text-[1.25rem] text-white">
        {icon && (
          <img
            src={icon}
            alt=""
            className="object-contain shrink-0 self-stretch my-auto aspect-square w-[30px]"
          />
        )}
        <h2 className="flex-1 shrink gap-2.5 self-stretch my-auto basis-0 min-w-60">
          {title}
        </h2>
      </header>
      <section className="flex gap-3 items-center px-3 py-3.5 w-full text-3xl font-semibold text-white whitespace-nowrap min-h-[59px]">
        <p className="flex-1 shrink gap-2.5 self-stretch my-auto w-full basis-0 min-w-60">
          {value}
        </p>
      </section>
      <footer className="flex gap-3 items-end p-3 w-full text-lg text-white min-h-[41px]">
        <p className="flex-1 shrink gap-2.5 self-stretch w-full basis-0 min-w-60">
          Tăng {percentage}%
        </p>
      </footer>
    </article>
  );
};

export default StatisticsCard;