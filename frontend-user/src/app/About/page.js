import Image from "next/image"
import Link from "next/link"
import { Book, Users, BookOpen, Mail, MapPin, Phone, GraduationCap, Clock, Calendar } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 ">
      {/* Hero Section */}
      <section className="relative h-[20vh] md:h-[50vh]  overflow-hidden"
      style={{
    backgroundImage: "url('/images/about.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}>
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-20" />
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-7">Về Chúng Tôi</h1>
          <p className="text-xl text-blue-100 max-w-2xl">
            ReadHub - Thư viện thông minh cho thế hệ mới.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-sky-700 mb-8">Sứ Mệnh Của Chúng Tôi</h2>
          <div className="flex items-center justify-center mb-8">
            <div className="h-1 w-20 bg-sky-700 mr-4"></div>
            <GraduationCap size={32} className="text-sky-700" />
            <div className="h-1 w-20 bg-sky-700 ml-4"></div>
          </div>
          <p className="text-lg text-gray-700 mb-8">
          ReadHub là một thư viện công nghệ hiện đại, cung cấp nguồn tài liệu số hóa phong phú cùng không gian học tập tiện nghi.
  Chúng tôi hướng đến việc tạo dựng một hệ sinh thái học thuật linh hoạt, nơi người dùng có thể tra cứu, mượn sách và
  truy cập tài liệu một cách dễ dàng, nhanh chóng và tự động nhờ công nghệ quét mã vạch.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-t-4 border-blue-500">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Book className="text-blue-700" size={28} />
              </div>
              <h3 className="text-xl font-semibold text-blue-800 mb-3">Kho Tài Liệu Phong Phú</h3>
              <p className="text-gray-600">
                Hàng ngàn đầu sách, tạp chí khoa học và tài liệu số hóa chuyên ngành công nghệ thông tin và các lĩnh vực
                liên quan.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-t-4 border-blue-500">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="text-blue-700" size={28} />
              </div>
              <h3 className="text-xl font-semibold text-blue-800 mb-3">Không Gian Học Tập</h3>
              <p className="text-gray-600">
                Môi trường học tập hiện đại với không gian yên tĩnh, phòng thảo luận nhóm và khu vực nghiên cứu cá nhân.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-t-4 border-blue-500">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-blue-700" size={28} />
              </div>
              <h3 className="text-xl font-semibold text-blue-800 mb-3">Hỗ Trợ Chuyên Nghiệp</h3>
              <p className="text-gray-600">
                Đội ngũ thủ thư chuyên nghiệp luôn sẵn sàng hỗ trợ bạn tìm kiếm tài liệu và giải đáp mọi thắc mắc.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Library Stats */}
      <section className="py-12 bg-sky-700 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">50,000+</div>
              <p className="text-blue-200">Đầu sách</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">10,000+</div>
              <p className="text-blue-200">Tài liệu số</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <p className="text-blue-200">Chỗ ngồi</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">15,000+</div>
              <p className="text-blue-200">Sinh viên sử dụng</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-sky-700 text-center mb-12">Đội Ngũ Thư Viện</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Lê Nguyễn Thùy Dương",
  
                image: "/images/td.jpg",
              },
              {
                name: "Đỗ Mai Tường Vy",
  
               image: "/images/tv.jpg",
              },
              {
                name: "Nguyễn Lê Thanh Huyền",
    
                image: "/images/th.jpg",
              },
              {
                name: "Nguyễn Đăng Hương Uyên",

              image: "/images/hu.jpg",
              },
            ].map((member, index) => (
              <div
                key={index}
                className="text-center bg-slate-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="relative w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full border-4 border-blue-100">
                  <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                </div>
                <h3 className="text-xl font-semibold text-blue-800">{member.name}</h3>

              </div>
            ))}
          </div>
        </div>
      </section>



      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-sky-700 text-center mb-12">Cách Thức Mượn Sách</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-sky-700">1</span>
              </div>
              <h3 className="text-xl font-semibold text-blue-800 mb-3">Đăng Ký Thẻ</h3>
              <p className="text-gray-600">Đăng ký thẻ thư viện trên hệ thống website.</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-sky-700">2</span>
              </div>
              <h3 className="text-xl font-semibold text-blue-800 mb-3">Tìm Sách</h3>
              <p className="text-gray-600">Tìm kiếm sách qua hệ thống tra cứu trực tuyến hoặc tại kệ sách.</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-sky-700">3</span>
              </div>
              <h3 className="text-xl font-semibold text-blue-800 mb-3">Mượn Sách</h3>
              <p className="text-gray-600">Quét thẻ và sách tại quầy tự phục vụ hoặc nhờ sự hỗ trợ của thủ thư.</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-sky-700">4</span>
              </div>
              <h3 className="text-xl font-semibold text-blue-800 mb-3">Trả Sách</h3>
              <p className="text-gray-600">Trả sách đúng hạn tại quầy hoặc hộp trả sách tự động.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section className="py-16 bg-slate-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-sky-700 text-center mb-12">Cơ Sở Vật Chất</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <Image
                  src="/images/about1.jpg"
                  alt="Khu vực đọc sách"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-blue-800 mb-2">Khu Vực Đọc Sách</h3>
                <p className="text-gray-600">
                  Không gian yên tĩnh với hơn 300 chỗ ngồi, ánh sáng tự nhiên và môi trường thoải mái để đọc và học tập.
                </p>
              </div>
            </div>
            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <Image src="/images/about3.jpg" alt="Phòng máy tính" fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-blue-800 mb-2">Phòng Máy Tính</h3>
                <p className="text-gray-600">
                  Hơn 10 máy tính hiện đại kết nối internet tốc độ cao, cài đặt các phần mềm chuyên ngành CNTT.
                </p>
              </div>
            </div>
            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <Image
                  src="/images/about2.jpg"
                  alt="Phòng thảo luận nhóm"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-blue-800 mb-2">Phòng Thảo Luận Nhóm</h3>
                <p className="text-gray-600">
                  2 phòng thảo luận nhóm được trang bị bảng, máy chiếu và bàn ghế tiện nghi cho các hoạt động học tập
                  nhóm.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <section className="py-12 bg-sky-700 text-white">
        <div className="container mx-auto px-4">
          <div className=" mx-10 flex flex-col md:flex-row items-center justify-between">
            <div className="mb-8 md:mb-0 text-center md:text-left">
              <h2 className="text-2xl font-bold mb-4">Giờ Mở Cửa</h2>
              <div className="flex items-center mb-2">
                <Clock className="mr-2" size={20} />
                <span>Thứ Hai - Thứ Sáu: 7:30 - 21:00</span>
              </div>
              <div className="flex items-center mb-2">
                <Clock className="mr-2" size={20} />
                <span>Thứ Bảy: 8:00 - 17:00</span>
              </div>
              <div className="flex items-center">
                <Calendar className="mr-2" size={20} />
                <span>Chủ Nhật và Ngày Lễ: Đóng cửa</span>
              </div>
            </div>
            <div className="text-center md:text-right">
              <h2 className="text-2xl font-bold mb-4">Liên Hệ</h2>
              <div className="flex items-center justify-center md:justify-end mb-2">
                <Phone className="mr-2" size={20} />
                <span>(028) 1234 5678</span>
              </div>
              <div className="flex items-center justify-center md:justify-end mb-2">
                <Mail className="mr-2" size={20} />
                <span>thuvien@uit.edu.vn</span>
              </div>
              <div className="flex items-center justify-center md:justify-end">
                <MapPin className="mr-2" size={20} />
                <span>Khu phố 6, P. Linh Trung, TP. Thủ Đức, TP.HCM</span>
              </div>
            </div>
          </div>
        </div>
      </section>

    
    </div>
  )
}
