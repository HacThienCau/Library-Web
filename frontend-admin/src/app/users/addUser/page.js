"use client";
import Sidebar from "../../components/sidebar/Sidebar";
import { useState } from "react";
import { useRouter } from "next/navigation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ChevronDown, CircleCheck, Undo2 } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import axios from "axios";
import { toast } from "react-hot-toast";

const CalendarIcon = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.346 0C11.7173 0 12.0734 0.1475 12.3359 0.410051C12.5985 0.672601 12.746 1.0287 12.746 1.4V4.018H27.78V1.418C27.78 1.0467 27.9275 0.690601 28.1901 0.428051C28.4526 0.1655 28.8087 0.018 29.18 0.018C29.5513 0.018 29.9074 0.1655 30.1699 0.428051C30.4325 0.690601 30.58 1.0467 30.58 1.418V4.018H36C37.0605 4.018 38.0776 4.43915 38.8277 5.18887C39.5778 5.93858 39.9995 6.95548 40 8.016V36.002C39.9995 37.0625 39.5778 38.0794 38.8277 38.8291C38.0776 39.5788 37.0605 40 36 40H4C2.93948 40 1.92237 39.5788 1.17228 38.8291C0.422192 38.0794 0.00053026 37.0625 0 36.002L0 8.016C0.00053026 6.95548 0.422192 5.93858 1.17228 5.18887C1.92237 4.43915 2.93948 4.018 4 4.018H9.946V1.398C9.94653 1.02704 10.0943 0.671462 10.3568 0.409343C10.6193 0.147225 10.975 -3.78527e-07 11.346 0Z"
      fill="white"
    />
  </svg>
);

const UploadIcon = () => (
  <svg
    className="w-7 h-7"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10.0001 33.3334C9.08341 33.3334 8.29897 33.0072 7.64675 32.355C6.99453 31.7028 6.66786 30.9178 6.66675 30V26.6667C6.66675 26.1945 6.82675 25.7989 7.14675 25.48C7.46675 25.1611 7.8623 25.0011 8.33341 25C8.80453 24.9989 9.20064 25.1589 9.52175 25.48C9.84286 25.8011 10.0023 26.1967 10.0001 26.6667V30H30.0001V26.6667C30.0001 26.1945 30.1601 25.7989 30.4801 25.48C30.8001 25.1611 31.1956 25.0011 31.6667 25C32.1379 24.9989 32.534 25.1589 32.8551 25.48C33.1762 25.8011 33.3356 26.1967 33.3334 26.6667V30C33.3334 30.9167 33.0073 31.7017 32.3551 32.355C31.7029 33.0084 30.9179 33.3345 30.0001 33.3334H10.0001ZM18.3334 13.0834L15.2084 16.2084C14.8751 16.5417 14.4795 16.7017 14.0217 16.6884C13.564 16.675 13.1679 16.5011 12.8334 16.1667C12.5279 15.8334 12.3679 15.4445 12.3534 15C12.339 14.5556 12.499 14.1667 12.8334 13.8334L18.8334 7.83336C19.0001 7.66669 19.1806 7.54891 19.3751 7.48003C19.5695 7.41114 19.7779 7.37614 20.0001 7.37503C20.2223 7.37391 20.4306 7.40891 20.6251 7.48003C20.8195 7.55114 21.0001 7.66891 21.1667 7.83336L27.1667 13.8334C27.5001 14.1667 27.6601 14.5556 27.6467 15C27.6334 15.4445 27.4734 15.8334 27.1667 16.1667C26.8334 16.5 26.4379 16.6739 25.9801 16.6884C25.5223 16.7028 25.1262 16.5428 24.7917 16.2084L21.6667 13.0834V25C21.6667 25.4722 21.5067 25.8684 21.1867 26.1884C20.8667 26.5084 20.4712 26.6678 20.0001 26.6667C19.529 26.6656 19.1334 26.5056 18.8134 26.1867C18.4934 25.8678 18.3334 25.4722 18.3334 25V13.0834Z"
      fill="white"
    />
  </svg>
);

// const DropdownIcon = () => (
//   <svg
//     width="40"
//     height="40"
//     viewBox="0 0 40 40"
//     fill="none"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <path
//       d="M11.6665 16.6665L19.9998 24.9998L28.3332 16.6665H11.6665Z"
//       fill="#D66766"
//     />
//   </svg>
// );

// Input Field Component
const InputField = ({ label, placeholder, value, disabled, onChange }) => (
  <div className="flex flex-col w-full">
    <label className="block mb-2 ml-1 text-[1.125rem] font-semibold text-[#131313]/90 max-sm:text-[1rem]">
      {label}
    </label>
    <input
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className={`p-3 w-full text-[1.125rem] rounded-xl shadow-sm max-sm:text-[1rem] ${
        disabled
          ? "bg-[#D8DBE4] text-neutral-500 cursor-not-allowed"
          : "bg-white text-black"
      }`}
    />
  </div>
);

// Date Picker Field Component
const DatePickerField = ({ value, onChange }) => {
  const [startDate, setStartDate] = useState(new Date(value));

  const handleDateChange = (date) => {
    setStartDate(date);
    onChange(date.toLocaleDateString("vi-VN"));
  };

  return (
    <div className="flex flex-col w-full max-md:w-full">
      <label className="block mb-2 ml-1 text-[1.125rem] font-semibold text-[#131313]/90 max-sm:text-[1rem]">
        Ngày Sinh
      </label>
      <div className="flex gap-3 w-full items-center">
        <DatePicker
          selected={startDate}
          onChange={handleDateChange}
          dateFormat="dd/MM/yyyy"
          className="flex-grow p-3 flex text-[1.125rem] text-black bg-white rounded-xl shadow-sm h-[53px] max-md:text-[1rem] max-md:h-[45px]"
        />
        <button
          className="flex justify-center items-center p-2 bg-[#062D76] rounded-xl h-[45px] w-[45px]" // Giảm kích thước icon
          onClick={() =>
            document
              .querySelector(".react-datepicker__input-container input")
              .focus()
          }
        >
          <CalendarIcon />
        </button>
      </div>
    </div>
  );
};

// Avatar Upload Component
const AvatarUpload = ({ avatarUrl, onAvatarChange }) => {
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(
        "https://library-backend-ydnf.onrender.com/upload/image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const urls = response.data;
      const imageUrl = urls[0];
      onAvatarChange(imageUrl);
      toast.success("Tải ảnh thành công!");
    } catch (error) {
      toast.error("Tải ảnh thất bại");
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col max-md:w-full">
      <h2 className="flex  mb-2 ml-1 text-[1.125rem] font-semibold text-[#131313]/90 max-sm:text-[1rem]">
        Ảnh Đại Diện
      </h2>

      <div className="flex flex-col items-center">
        <img
          src={avatarUrl ? avatarUrl : null}
          alt="Avatar"
          className="border-3 border-white border-solid w-30 aspect-square rounded-full"
        />

        <input
          type="file"
          accept="image/*"
          className="hidden"
          id="avatarUpload"
          onChange={handleFileChange}
        />

        <label
          htmlFor="avatarUpload"
          className="flex gap-2.5 justify-center items-center p-3 rounded-xl max-md:w-full w-fit mt-5 bg-[#062D76] hover:bg-primary/90 cursor-pointer"
        >
          <span className="text-[1rem] font-medium text-center text-white max-sm:text-base">
            Tải ảnh đại diện
          </span>
          <UploadIcon />
        </label>
      </div>
    </div>
  );
};

function Page() {
  const initialData = {
    username: "",
    email: "",
    phone: "",
    birthDate: "01/01/2000",
    avatar: "",
    role: "",
  };

  const router = useRouter();

  const [formData, setFormData] = useState(initialData);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

const handleSubmit = async () => {
  try {
    const response = await axios.post("https://library-backend-ydnf.onrender.com/user/add-user", {
      tenND: formData.username,
      email: formData.email,
      sdt: formData.phone,
      ngaySinh: new Date(formData.birthDate),
      avatarUrl: formData.avatar,
    });

    toast.success("Thêm người dùng thành công!");
    setIsPopupOpen(true);
    setTimeout(() => {
      setIsPopupOpen(false);
      router.push("/users");
    }, 2000);
  } catch (error) {
    toast.error("Thêm người dùng thất bại");
    console.error(error);
  }
};

  const isFormChanged =
    JSON.stringify(formData) !== JSON.stringify(initialData);

  const handleAvatarChange = (newAvatar) => {
    setFormData((prev) => ({ ...prev, avatar: newAvatar }));
  };
  const handleDateChange = (newDate) => {
    setFormData((prev) => ({ ...prev, birthDate: newDate }));
  };

  const handlePhoneChange = (newPhone) => {
    setFormData((prev) => ({ ...prev, phone: newPhone }));
  };

  const handleUserNameChange = (newUserName) => {
    setFormData((prev) => ({ ...prev, username: newUserName }));
  };

  const handleEmailChange = (newEmail) => {
    setFormData((prev) => ({ ...prev, email: newEmail }));
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="flex flex-row w-full h-full bg-[#EFF3FB]">
      <Sidebar />
      <main className="flex w-full min-h-screen flex-col md:ml-52 gap-3 ">
        {/*Nút Back*/}
        <div className="mb-2 py-6 px-10 max-md:px-4 fixed z-50 justify-between items-center">
          <Button
            title={"Quay Lại"}
            className="bg-[#062D76] rounded-3xl w-10 h-10 cursor-pointer"
            onClick={() => {
              handleGoBack();
            }}
          >
            <Undo2 className="w-12 h-12" color="white" />
          </Button>
        </div>
        <div className="flex flex-col w-full min-h-screen py-6 gap-3 px-10 mb-15 max-md:px-4">
          <div className="flex pt-12 max-md:w-full">
            <InputField label="ID" value={formData.id} disabled />
          </div>

          <div className="flex max-md:w-full">
            <InputField
              label="Tên Người Dùng"
              placeholder="Nhập tên người dùng"
              value={formData.username}
              onChange={handleUserNameChange}
            />
          </div>

          <div className="flex max-w-full">
            <InputField
              label="Email"
              placeholder="Nhập email"
              value={formData.email}
              onChange={handleEmailChange}
            />
          </div>

          <div className="flex max-md:flex-col gap-10 max-md:gap-3">
            <div className="flex basis-1/2 min-w-0 max-md:w-full">
              <InputField
                label="Số Điện Thoại"
                placeholder="Nhập số điện thoại"
                value={formData.phone}
                onChange={handlePhoneChange}
              />
            </div>

            <div className="flex basis-1/2 min-w-0 max-md:w-full">
              <DatePickerField
                value={formData.birthDate}
                onChange={handleDateChange}
              />
            </div>

            {/* <div className="max-md:w-full">
            <RoleSelector value={formData.role} onChange={handleRoleChange} />
          </div> */}
          </div>

          <div className="flex flex-wrap gap-20">
            <AvatarUpload
              avatarUrl={formData.avatar}
              onAvatarChange={handleAvatarChange}
            />
          </div>
        </div>
        <footer className="w-full bottom-0 px-10 right-0 md:w-[calc(100%-208px)] fixed h-18 bg-white flex items-center justify-end">
          {isPopupOpen && (
            <div className="flex bg-white p-4 rounded-lg shadow-lg border border-green-400">
              <p className="text-green-600 font-semibold">
                Cập nhật thành công!
              </p>
            </div>
          )}
          <Button
            onClick={handleSubmit}
            className={`flex gap-2.5 justify-center items-center p-3 rounded-xl max-md:w-full w-fit
      ${
        isFormChanged
          ? "bg-[#062D76] cursor-pointer"
          : "bg-gray-400 cursor-not-allowed"
      }
    `}
            disabled={!isFormChanged}
          >
            <CircleCheck className="w-12 h-12" color="white" />
            Hoàn Tất
          </Button>
        </footer>
      </main>
    </div>
  );
}

export default Page;
