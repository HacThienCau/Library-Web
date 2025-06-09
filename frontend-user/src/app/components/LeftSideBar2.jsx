const LeftSideBar2 = ({ groupedCategories, selectedSubcategory, onSelectSubcategory }) => (
  <aside className="w-60 p-4 bg-white rounded-xl h-fit">
    <h2 className="text-xl font-semibold mb-3">📚 Danh Mục</h2>

    {/* Mục Tất cả */}
    <button
      onClick={() => onSelectSubcategory("all")}
      className={`mb-3 block w-full text-center px-3 py-2 rounded-lg font-bold cursor-pointer ${
        selectedSubcategory === "all"
          ? "bg-sky-900 text-white"
          : "hover:bg-zinc-200 text-[#062D76]"
      }`}
    >
      Tất cả
    </button>

    {/* Các nhóm danh mục */}
    {groupedCategories.map((group) => (
      <div key={group.parentName} className="mb-4">
        <p className="font-bold text-[#062D76] mb-1">{group.parentName}</p>
        <ul className="pl-4 list-disc text-zinc-600 space-y-1">
          {group.subcategories.map((sub) => {
            const isSelected = selectedSubcategory?.id === sub.id;
            return (
              <li key={sub.id}>
                <button
                  onClick={() => onSelectSubcategory(sub)}
                  className={`w-full text-left px-2 py-1 rounded-lg cursor-pointer ${
                    isSelected
                      ? "bg-sky-900 text-white"
                      : "hover:bg-zinc-200"
                  }`}
                >
                  {sub.name}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    ))}
  </aside>
);

export default LeftSideBar2;