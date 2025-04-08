"use client";
import Sidebar from "@/app/components/sidebar/Sidebar";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { ArrowUpFromLine, ChevronDown, CircleCheck, Undo2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { ThreeDot } from "react-loading-indicators";

function page() {
  const [loading, setLoading] = useState(false);
  const route = useRouter();
  const handleGoBack = () => {
    route.back();
  };
  const [bookname, setBookname] = useState(""); // Tên sách
  const [author, setAuthor] = useState(""); //Tên tác giả
  const [publisher, setPublisher] = useState(""); //NXB
  const [year, setYear] = useState(""); //Năm XB
  const [quantity, setQuantity] = useState(""); //SL
  const [description, setDescription] = useState(""); // Mô tả
  const [category, setCategory] = useState("");
  const fileInputRef = useRef(null);
  const fileInputRef1 = useRef(null);
  const fileInputRef2 = useRef(null);
  const fileInputRef3 = useRef(null);
  const [image, setImage] = useState([
    {
      filePreview: null,
      selectedFile: null,
    },
    {
      filePreview: null,
      selectedFile: null,
    },
    {
      filePreview: null,
      selectedFile: null,
    },
    {
      filePreview: null,
      selectedFile: null,
    },
  ]);
  const [cateList, setCateList] = useState([]);
  useEffect(() => {
    setLoading(true);
    const book =
      //api....
      [
        {
          _id: 1,
          tenSach: "Lão Hạc",
          moTa: "Lão Hạc là một truyện ngắn của nhà văn Nam Cao được viết năm 1943. Tác…",
          hinhAnh:
            "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1631870884i/43320300.jpg",
          theLoai: "Truyện Ngắn", // ở backend từ maTheLoai lấy theLoai rồi mới trả về
          tenTacGia: "Nam Cao", // ở backend từ maTacGia lấy tenTacGia rồi mới trả về
          nxb: "Kim Đồng",
          nam: 2021,
          soLuongTon: 50,
          soLuongMuon: 10,
        },
        {
          _id: 2,
          tenSach: "Chí Phèo",
          moTa: "Chí Phèo – Với những tình tiết hấp hẫn Nam Cao đã đưa người đọc tái hiện bức tranh chân thực nông thôn Việt Nam trước 1945, nghèo đói, xơ xác,... ",
          hinhAnh: [
            "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1630749913i/9175777.jpg",
            "https://cdn1.fahasa.com/media/flashmagazine/images/page_images/chi_pheo___tai_ban_2019_bia_cung/2020_06_18_09_14_47_1-390x510.png",
          ],
          theLoai: "Truyện Ngắn", // ở backend từ maTheLoai lấy theLoai rồi mới trả về
          tenTacGia: "Nam Cao", // ở backend từ maTacGia lấy tenTacGia rồi mới trả về
          nxb: "Văn Nghệ",
          nam: 1941,
          soLuongTon: 20,
          soLuongMuon: 10,
        },
      ];
    const rd =  Math.round(Math.random()); // có backend r thì xóa cái này đi 
    setBookname(book[rd].tenSach);
    setAuthor(book[rd].tenTacGia);
    setCategory(book[rd].theLoai);
    setDescription(book[rd].moTa);
    setPublisher(book[rd].nxb);
    setYear(book[rd].nam);
    setQuantity(book[rd].soLuongTon + book[rd].soLuongMuon);
    const hinhAnhArray = Array.isArray(book[rd].hinhAnh)
      ? book[rd].hinhAnh
      : [book[rd].hinhAnh];
    setImage((prev) =>
      prev.map((item, index) => ({
        ...item,
        filePreview: hinhAnhArray[index] || null, // Nếu thiếu ảnh thì gán null
      }))
    );
    console.log(image);
    const fetchCategory = [
      "Sách Giáo Khoa",
      "Tiểu Thuyết",
      "Sách Tham Khảo",
      "Truyện Ngắn",
    ];
    setCateList(fetchCategory);
    setLoading(false);
  }, []);
  const [isCateListOpen, setIsCateListOpen] = useState(false);
  const openCategoryList = () => {
    setIsCateListOpen(!isCateListOpen);
  };
  const handleFileChange = (number, event) => {
    const file = event.target.files[0];
    setImage((prev) => {
      const updated = [...prev]; // copy mảng cũ
      updated[number] = {
        ...updated[number], // giữ lại các giá trị cũ nếu không muốn ghi đè hết
        filePreview: URL.createObjectURL(file),
        selectedFile: file,
      };
      return updated;
    });
  };
  /*  upload các ảnh lên cloudinary để lấy link => ảnh nào thay đổi thì mới up
  const uploadImagesToCloudinary = async () => {
    const formData = new FormData();
    image.forEach((img, index) => {
      if (img.selectedFile) {
        formData.append("images", img.selectedFile);
      }
    });
  
    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
  
    if (!res.ok) {
      throw new Error("Upload thất bại");
    }
  
    const data = await res.json(); // [{url: "...", index: 0}, ...]
    return data;
  };
  */
  const handleSubmit = async () => {
    if (
      bookname === "" ||
      author === "" ||
      year === "" ||
      publisher === "" ||
      description === "" ||
      category === "" ||
      quantity === ""
    ) {
      toast.error("Vui lòng điền đầy đủ thông tin");
      return;
    }
    if (quantity < 1) {
      toast.error("Số lượng sách phải lớn hơn 0");
      return;
    }
    if (!image[0].filePreview) {
      toast.error("Vui lòng tải ít nhất hình ảnh bìa");
      return;
    }
    setLoading(true);
    /*
    const newImages = await uploadImagesToCloudinary();
    const updatedImages = image.map((img, index) => {
      if (img.selectedFile) {
        return {
          ...img,
          filePreview: newImages.shift(), // lấy URL đầu tiên từ mảng
          selectedFile: null, // reset lại
        };
      }
      return img;
    });
    const finalImageURLs = updatedImages
      .filter((img) => img.filePreview)
      .map((img) => img.filePreview);
    */
    console.log(
      "Nội dung sách mới:",
      "\ntenSach: ",
      bookname,
      "\ntenTacGia: ",
      author, //khi tạo sách nhập tên tác giả, lên backend xử lý đổi thành mã tác giả sau
      "\ntheLoai: ",
      category, //khi tạo sách nhập tên thể loại, lên backend xử lý đổi thành mã thể loại sau
      "\nmoTa: ",
      description,
      "\nsoLuongTon: ",
      quantity,
      "\nsoLuongMuon: ",
      0,
      "\nhinhAnh: "
      //finalImageURLS
    );
    // API here
    await delay(4000);
    setLoading(false);
    toast.success("Sửa sách thành công");
    handleGoBack();
  };
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms)); // test
  return (
    <div className="flex flex-row w-full h-full min-h-screen bg-[#EFF3FB] pb-15">
      <Sidebar />
      {loading ? (
        <div className="flex md:ml-52 w-full h-screen justify-center items-center">
          <ThreeDot
            color="#062D76"
            size="large"
            text="Vui lòng chờ"
            variant="bounce"
            textColor="#062D76"
          />
        </div>
      ) : (
        <div className="flex w-full flex-col py-6 md:ml-52 relative mt-10 gap-2 items-center px-10">
          {/*Nút Back*/}
          <div className="absolute top-5 left-5 md:left-57 fixed">
            <Button
              title={"Quay Lại"}
              className="bg-[#062D76] rounded-3xl w-10 h-10"
              onClick={() => {
                handleGoBack();
              }}
            >
              <Undo2 className="w-12 h-12" color="white" />
            </Button>
          </div>
          {/*Dòng tên sách*/}
          <div className="flex flex-col w-full gap-[5px] md:gap-[10px]">
            <p className="font-semibold text-lg mt-3">Tên Sách</p>
            <Input
              type="text"
              placeholder="Nhập tên sách"
              className="font-semibold rounded-lg w-full h-10 flex items-center px-5 bg-white"
              value={bookname}
              onChange={(e) => setBookname(e.target.value)}
            />
          </div>
          {/*Dòng tên tg*/}
          <div className="flex flex-col w-full gap-[5px] md:gap-[10px]">
            <p className="font-semibold text-lg mt-3">Tên Tác Giả</p>
            <Input
              type="text"
              placeholder="Nhập tên tác giả"
              className="font-semibold rounded-lg w-full h-10 flex items-center px-5 bg-white"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>
          {/*Dòng năm xuất bản và nhà xuất bản */}
          <div className="flex w-full justify-between gap-10">
            <div className="flex flex-col w-2/3 gap-[5px] md:gap-[10px]">
              <p className="font-semibold text-lg mt-3">Năm Xuất Bản</p>
              <Input
                type="number"
                placeholder="Nhập năm xuất bản"
                className="font-semibold rounded-lg w-full h-10 flex items-center px-5 bg-white"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
            </div>
            <div className="flex flex-col w-full gap-[5px] md:gap-[10px]">
              <p className="font-semibold text-lg mt-3">Nhà Xuất Bản</p>
              <Input
                type="text"
                placeholder="Nhập tên nhà xuất bản"
                className="font-semibold rounded-lg w-full h-10 flex items-center px-5 bg-white"
                value={publisher}
                onChange={(e) => setPublisher(e.target.value)}
              />
            </div>
          </div>
          {/*Dòng số lượng và thể loại */}
          <div className="flex w-full justify-between gap-10">
            <div className="flex flex-col w-2/3 gap-[5px] md:gap-[10px]">
              <p className="font-semibold text-lg mt-3">Số lượng</p>
              <Input
                type="number"
                placeholder="Nhập số lượng"
                className="font-semibold rounded-lg w-full h-10 flex items-center px-5 bg-white"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className="flex flex-col w-full gap-[5px] md:gap-[10px] space-y-2 relative inline-block text-left">
              <p className="font-semibold text-lg mt-3">Thể Loại</p>
              <Button
                title={"Thể Loại"}
                className="bg-white text-black rounded-lg w-full h-10 hover:bg-gray-300 flex justify-between"
                onClick={() => {
                  openCategoryList();
                }}
              >
                {category !== "" ? category : "Chọn Thể Loại"}
                <ChevronDown className="w-12 h-12" color="#062D76" />
              </Button>
              {isCateListOpen && (
                <div className="absolute bg-white rounded-lg w-full z-50 shadow-lg">
                  {cateList?.map((cate, index) => {
                    return (
                      <Button
                        key={index}
                        className="flex justify-start block w-full px-4 py-2 text-left bg-white text-black hover:bg-gray-300 items-center gap-2"
                        onClick={() => {
                          setCategory(cate);
                          setIsCateListOpen(false);
                        }}
                      >
                        {cate}
                      </Button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
          {/*Dòng mô tả*/}
          <div className="flex flex-col w-full gap-[5px] md:gap-[10px]">
            <p className="font-semibold text-lg mt-3">Mô Tả</p>
            <Input
              type="text"
              placeholder="Nhập mô tả sách"
              className="font-semibold rounded-lg w-full h-10 flex px-5 bg-white"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          {/*Dòng hình ảnh*/}
          <div className="flex flex-col w-full gap-[5px] md:gap-[10px]">
            <p className="font-semibold text-lg mt-3">Hình ảnh</p>
            <div className="grid grid-cols-4 gap-4">
              {/*Cột ảnh bìa*/}
              <div className="flex flex-col space-y-3">
                {image[0].filePreview ? ( //size sách thường là 14.5 x 20.5
                  <img
                    src={image[0].filePreview}
                    className="w-[290px] h-[410px] rounded-lg"
                    width={145}
                    height={205}
                    alt={"Ảnh Bìa"}
                  />
                ) : (
                  <div className="w-[290px] h-[410px] bg-gray-300 rounded-lg flex justify-center items-center text-gray-700">
                    Không có hình ảnh
                  </div>
                )}
                <Button
                  className="flex w-[290px] bg-[#062D76]"
                  onClick={() => {
                    fileInputRef.current.click();
                  }}
                >
                  <ArrowUpFromLine className="w-12 h-12" color="white" />
                  Tải Ảnh Bìa
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden input-new-file"
                    onChange={(e) => handleFileChange(0, e)}
                    ref={fileInputRef}
                  />
                </Button>
              </div>
              {/*Cột ảnh 1*/}
              <div className="flex flex-col space-y-3">
                {image[1].filePreview ? ( //size sách thường là 14.5 x 20.5
                  <img
                    src={image[1].filePreview}
                    className="w-[290px] h-[410px] rounded-lg"
                    width={145}
                    height={205}
                    alt={"Ảnh Xem Trước 1"}
                  />
                ) : (
                  <div className="w-[290px] h-[410px] bg-gray-300 rounded-lg flex justify-center items-center text-gray-700">
                    Không có hình ảnh
                  </div>
                )}
                <Button
                  className="flex w-[290px] bg-[#062D76]"
                  onClick={() => {
                    fileInputRef1.current.click();
                  }}
                >
                  <ArrowUpFromLine className="w-12 h-12" color="white" />
                  Tải Ảnh Xem Trước
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden input-new-file"
                    onChange={(e) => handleFileChange(1, e)}
                    ref={fileInputRef1}
                  />
                </Button>
              </div>
              {/*Cột ảnh 2*/}
              <div className="flex flex-col space-y-3">
                {image[2].filePreview ? ( //size sách thường là 14.5 x 20.5
                  <img
                    src={image[2].filePreview}
                    className="w-[290px] h-[410px] rounded-lg"
                    width={145}
                    height={205}
                    alt={"Ảnh Xem Trước 2"}
                  />
                ) : (
                  <div className="w-[290px] h-[410px] bg-gray-300 rounded-lg flex justify-center items-center text-gray-700">
                    Không có hình ảnh
                  </div>
                )}
                <Button
                  className="flex w-[290px] bg-[#062D76]"
                  onClick={() => {
                    fileInputRef2.current.click();
                  }}
                >
                  <ArrowUpFromLine className="w-12 h-12" color="white" />
                  Tải Ảnh Xem Trước
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden input-new-file"
                    onChange={(e) => handleFileChange(2, e)}
                    ref={fileInputRef2}
                  />
                </Button>
              </div>
              {/*Cột ảnh 3*/}
              <div className="flex flex-col space-y-3">
                {image[3].filePreview ? ( //size sách thường là 14.5 x 20.5
                  <img
                    src={image[3].filePreview}
                    className="w-[290px] h-[410px] rounded-lg"
                    width={145}
                    height={205}
                    alt={"Ảnh Xem Trước 3"}
                  />
                ) : (
                  <div className="w-[290px] h-[410px] bg-gray-300 rounded-lg flex justify-center items-center text-gray-700">
                    Không có hình ảnh
                  </div>
                )}
                <Button
                  className="flex w-[290px] bg-[#062D76]"
                  onClick={() => {
                    fileInputRef3.current.click();
                  }}
                >
                  <ArrowUpFromLine className="w-12 h-12" color="white" />
                  Tải Ảnh Xem Trước
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden input-new-file"
                    onChange={(e) => handleFileChange(3, e)}
                    ref={fileInputRef3}
                  />
                </Button>
              </div>
            </div>
          </div>
          <div className="w-full bottom-0 px-10 left-0 md:left-52 md:w-[calc(100%-208px)] fixed h-18 bg-white flex items-center justify-between">
            {/*Control Bar*/}
            <div></div>
            <Button
              title={"Hoàn Tất"}
              className={`rounded-3xl w-40 h-12 bg-[#062D76]`}
              onClick={() => {
                handleSubmit();
              }}
            >
              <CircleCheck className="w-12 h-12" color="white" />
              Hoàn Tất
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default page;
