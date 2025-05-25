export default function CategoryFilters({ groupedCategories, onSelectSubcategory }) {
  return (
    <div className="space-y-4">
      {Object.entries(groupedCategories).map(([group, subcategories]) => (
        <div key={group}>
          <h3 className="text-lg font-semibold mb-2 text-[#062D76]">{group}</h3>
          <ul className="space-y-1">
            {subcategories.map((subcategory) => (
              <li key={subcategory.id}>
                <button
                  onClick={() => onSelectSubcategory(subcategory)}
                  className="text-left w-full px-3 py-1 rounded hover:bg-slate-100 text-[#062D76]"
                >
                  {subcategory.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}