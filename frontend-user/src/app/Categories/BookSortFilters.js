export default function BookSortFilters({ onChangeSort, activeSort }) {
  const filters = ["Tất cả", "Mới nhất", "Được mượn nhiều", "Đánh giá cao"];
  return (
    <div className="flex gap-4 mb-4">
      {filters.map((label, index) => (
        <button
          key={index}
          onClick={() => onChangeSort(label)}
          className={`px-4 py-2 rounded-lg border transition ${
            activeSort === label
              ? "bg-sky-900 text-white"
              : "bg-slate-100 text-[#062D76]"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}