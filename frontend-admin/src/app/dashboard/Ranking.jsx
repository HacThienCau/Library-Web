import React from "react";

const Ranking = ({ books }) => {
  return (
    <div className="bg-white text-white p-6 rounded-2xl w-full max-w-3xl mx-auto shadow-xl">
      <ul className="space-y-3">
        {books.map((book, index) => (
          <li
            key={index}
            className="flex items-center p-4 rounded-xl bg-[#E5ECFF]"
          >
            <div className="text-[1.5rem] font-bold">{index + 1}</div>
            <img
              src={book.cover}
              alt={book.title}
              className="w-12 h-12 object-cover rounded-md mx-3"
            />
            <div className="flex-1">
              <p className="font-semibold truncate">{book.title}</p>
              <p className="text-sm text-gray-600">{book.author}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Ranking;
