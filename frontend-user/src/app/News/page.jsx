

import CategorySidebar from "../components/CategorySidebar";
import NewsCard from "../components/NewsCard";

const newsItems = [
  {
    title: 'Khơi tình yêu văn hóa truyền thống qua bộ sách “Vang danh nghề cổ”',
    date: "04/12/2024",
    publisher: "Hoa Nguyễn",
    comments: 0,
    image: "https://file.hstatic.net/200000343865/article/img_3292_46ba473d55d44485a2b1db84b1f77645_large.jpg",
    description:
      "Bộ sách “Vang danh nghề cổ do Nhà Xuất bản Kim Đồng ấn hành, hiện có 10 tập. Theo hành trình của cô bé An – nhân vật chính, độc giả có những chuyến đi khám phá mọi miền đất nước",
      sub:"Nằm trong chuỗi hoạt động hưởng ứng Ngày Sách và Văn hóa đọc Việt Nam lần thứ tư năm 2025 tại Phố sách Hà Nội, chiều 19-4, Nhà Xuất bản Kim Đồng phối hợp với Dự án sách Nhà Mình...",
  },
  {
    title: "100 năm ngày sinh nhà văn Đoàn Giỏi: Nhà văn không chỉ của đất phương Nam",
    date: "04/5/2025",
    publisher: "Đông Hương",
    comments: 0,
    image: "https://file.hstatic.net/200000343865/article/1_1377c86898234388bab35d6aa9a09793_large.jpeg",
    description:
      "Đoàn Giỏi được đánh giá là 1 trong những cây bút hàng đầu của dòng văn học sinh thái, khi ngòi bút của ông từ lâu đã dấn thân, chủ động viết về môi trường, bảo vệ thiên nhiên.",
      sub:"Sinh thời, nhà văn Nguyễn Quang Sáng luôn dành sự trân trọng với người đồng hương miền Tây của mình: Với nhà văn Đoàn Giỏi, sự sáng tạo đồng nghĩa với ...",
  },
   {
    title: "Hành trình từ Italia đến Việt Nam của cuốn sách tranh về Chủ tịch Hồ Chí Minh",
    date: "04/10/2024",
    publisher: "Nhà xuất bản Kim Đồng",
    comments: 0,
    image: "https://file.hstatic.net/200000343865/article/ho_chi_minh_-_mot_con_nguoi_va_mot_dan_toc__5__3cf79b8d6c5a4bd38e550a253d3e2a2c_large.jpg",
    description:
      "Cuốn sách là tuyển tập gồm 12 số tạp chí, với 12 chủ đề được sắp xếp theo dòng lịch sử, do các nhà báo Paolo Bracaglia Morante và Camillo Pisani kể",
      sub:"Cách đây 57 năm tại đất nước Italia, một cuốn sách viết về Hồ Chí Minh và hai cuộc kháng chiến vĩ đại của nhân dân Việt Nam. Cuốn sách với nhan đề “Ho Ci Min – Un...",
  },
   {
    title: "Văn học thiếu nhi Việt Nam: Những bước chuyển mình sau ngày đất nước thống nhất",
    date: "08/2/2025",
    publisher: "Nhà xuất bản Kim Đồng",
    comments: 0,
    image: "https://file.hstatic.net/200000343865/article/16_863a291e62ad478e8945f59b53119198_large.jpg",
    description:
      "Viện Pháp tại Việt Nam triển khai một loạt hoạt động nhằm thúc đẩy sự phát triển của truyện tranh tại Việt Nam như một lĩnh vực công nghiệp văn hóa.",
      sub:"Sau 21 năm bị chia cắt, hai miền Nam - Bắc Việt Nam được nối liền một dải nhờ chiến thắng lịch sử mùa xuân năm 1975. Hòa chung niềm vui lớn của đất nước là niềm vui của sách văn......",
  },
];

export default function NewsPage() {
  return (
    <div className="px-4 py-6 lg:px-24">
      <div className="parallax h-[350px] relative">
                <div className="absolute w-full h-full bg-black/50">
                    <div className="absolute px-[15%] mt-38 ">
                        <p className="text-white uppercase text-3xl font-bold">Sự kiện</p>
                        <p className="text-white">
                            <span
                               
                                className="hover:text-primary-color cursor-pointer transition-all"
                            >
                                Trang chủ
                            </span>{' '}
                            / Sự kiện
                        </p>
                    </div>
                </div>
            </div>

      <div className="flex flex-col lg:flex-row gap-6 mt-10">
        <CategorySidebar />
 
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
       
          {newsItems.map((item, idx) => (
            <NewsCard key={idx} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
}
