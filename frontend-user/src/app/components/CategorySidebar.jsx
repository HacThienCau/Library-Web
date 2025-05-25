export default function CategorySidebar() {
  return (
    <div className="w-full lg:w-64 bg-white border rounded shadow">
      <div className="bg-sky-600 text-white font-semibold text-center py-2 rounded-t">
        DANH MỤC TIN TỨC
      </div>
      <ul className="p-4 space-y-2 text-sm">
        <li className="text-sky-600 font-semibold">Sự kiện</li>
        <li>Hoạt động</li>
        <li>Điểm sách</li>      
        <li>Thông báo định kỳ</li>
      </ul>
    </div>
  );
}
