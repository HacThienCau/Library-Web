"use client";
import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { ThreeDot } from "react-loading-indicators";

const UploadImage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  // Hàm xử lý khi người dùng chọn ảnh
  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // Hàm gửi ảnh lên backend
  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Vui lòng chọn ảnh trước khi tải lên.");
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("file", selectedFile); // Đảm bảo rằng 'file' là tên trường mà backend mong đợi
    formData.append("type", "book");
    try {
      const response = await fetch(
        "http://localhost:8081/upload/barcodeImage",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Đã có lỗi xảy ra khi tải ảnh lên.");
      }

      const result = await response.json();
      setResult(result);
    } catch (error) {
      console.error("Lỗi khi gửi ảnh:", error);
    }
    setLoading(false);
  };

  return (
    <div className="flex w-full flex-col gap-2 items-center">
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
      ) : !result ? (
        <div className="flex flex-col w-full items-center h-[10px] mb-10 gap-5 px-10 py-6 ">
          <h1>Tải barcode sách</h1>
          <div className="flex gap-5">
            <input type="file" onChange={onFileChange} />
            <Button onClick={handleUpload}>Tải ảnh lên</Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col w-full h-full min-h-screen items-center h-[10px] py-6 gap-5 bg-[#EFF3FB]">
          <div className="flex flex-col bg-white w-1/2 rounded-lg mt-2 drop-shadow-lg p-5 gap-10 items-center">
            <h1>ID Sách:&nbsp;{result?.childBook?.id}</h1>
            <div className="flex space-x-20 items-center">
              <img
                src={`${result?.parentBook?.hinhAnh[0]}`}
                className="w-[145px] h-[205px] rounded"
              />
              <div className="flex flex-col gap-[10px] w-full">
                <p className="font-bold">
                  Tên sách:&nbsp;{result?.parentBook?.tenSach}
                </p>
                <p className="">
                  Tên tác giả:&nbsp;{result?.parentBook?.tenTacGia}
                </p>
                <p className="">Nhà xuất bản:&nbsp;{result?.parentBook?.nxb}</p>
                <p className="">Năm xuất bản:&nbsp;{result?.parentBook?.nam}</p>
                <p className="">
                  Còn sẵn:&nbsp;
                  {result?.parentBook?.tongSoLuong -
                    result?.parentBook?.soLuongMuon -
                    result?.parentBook?.soLuongXoa}
                </p>
              </div>
            </div>
            <div className="flex space-x-10 items-center w-2/3 items-center justify-center">
                <div className="flex flex-col gap-[10px] w-full">
                <p className="">Thể loại chính:&nbsp;{result?.parentBook?.tenTheLoaiCha}</p>
                <p className="">Thể loại phụ:&nbsp;{result?.parentBook?.tenTheLoaiCon}</p>
                </div>
                <div className="flex flex-col gap-[10px] w-full">
                <p className="">Vị trí:&nbsp;{result?.parentBook?.viTri}</p>
                </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadImage;
