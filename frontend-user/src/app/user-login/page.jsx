"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"





import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { yupResolver } from "@hookform/resolvers/yup";
import { motion } from "framer-motion";
import { LogIn } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as yup from "yup";

const Page = () => {
  const router = useRouter()

  // Schema kiểm tra đầu vào
  const registerSchema = yup.object().shape({
    tenND: yup.string().required("Tên không được để trống"),
    email: yup.string().email("Email không hợp lệ").required("Email không được để trống"),
    matKhau: yup.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự").required("Mật khẩu không được để trống"),
    ngaySinh: yup.date().required("Ngày sinh không được để trống"),
    gioiTinh: yup
      .string()
      .oneOf(["Nam", "Nu", "Khac"], "Vui lòng chọn giới tính")
      .required("Giới tính không được để trống"),
  })

  const loginSchema = yup.object().shape({
    email: yup.string().email("Email không hợp lệ").required("Email không được để trống"),
    matKhau: yup.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự").required("Mật khẩu không được để trống"),
  })

  // Form đăng nhập
  const {
    register: registerLogin,
    handleSubmit: handleSubmitLogin,
    reset: resetLoginForm,
    formState: { errors: errorsLogin },
  } = useForm({
    resolver: yupResolver(loginSchema),
  })

  // Form đăng ký
  const {
    register: registerSignUp,
    control,
    handleSubmit: handleSubmitSignUp,
    reset: resetSignUpForm,
    formState: { errors: errorsSignUp },
  } = useForm({
    resolver: yupResolver(registerSchema),
    defaultValues: { gioiTinh: "Nam" },
  })

  // Xử lý đăng ký
  const onSubmitRegister = async (data) => {
    try {
      // Gửi yêu cầu POST đến backend để đăng ký
      const response = await fetch("https://library-backend-ydnf.onrender.com/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error("Đăng ký thất bại")
      }

      const result = await response.json()
      router.push("/")
      toast.success("Đăng ký tài khoản thành công")
    } catch (error) {
      console.error(error)
      toast.error("Có lỗi xảy ra")
    }
  }

  // Xử lý đăng nhập
  const onSubmitLogin = async (data) => {
    try {
      // Gửi yêu cầu POST đến backend để đăng nhập
      const response = await fetch("https://library-backend-ydnf.onrender.com/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error("Đăng nhập thất bại")
      }

      const result = await response.json()
      localStorage.setItem("jwt", result.jwt)
      localStorage.setItem("id", result.id)

      router.push("/")
      toast.success("Đăng nhập tài khoản thành công")
    } catch (error) {
      console.error(error)
      toast.error("Có lỗi xảy ra")
    }
  }

  // Reset form khi chuyển tab
  useEffect(() => {
    resetLoginForm()
    resetSignUpForm()
  }, [resetLoginForm, resetSignUpForm])

  // Carousel data
  const carouselItems = [
  {
    title: "Khám phá tri thức không giới hạn",
    description: "Mượn và đọc sách mọi lúc, mọi nơi – đơn giản và tiện lợi.",
    image: "https://cdn.prod.website-files.com/641a3249b8c4027539157305/649cc7ae011753a88fbc403f_greenlight.jpeg", // thay thế bằng hình ảnh thật nếu có
  },
  {
    title: "Sách Hay Cho Mọi Lứa Tuổi",
    description: "Hàng nghìn đầu sách từ văn học, khoa học, kỹ năng sống đến công nghệ đang chờ bạn khám phá.",
    image: "https://images.squarespace-cdn.com/content/v1/6487d3d312599067b14fb36d/ae9b4b20-fe91-4722-bad4-acb1ddc224af/DSCF1212+Curtis+Perry.jpg",
  },
  {
    title: "Thế Giới Trong Tầm Tay",
    description: "Kho sách học thuật và tham khảo phong phú hỗ trợ việc học và nghiên cứu hiệu quả hơn.",
    image: "https://images.photowall.com/products/57491/greatest-bookshop-in-the-world.jpg?h=699&q=85",
  },
  {
    title: "Gợi ý sách cá nhân hóa",
    description: "Hệ thống đề xuất thông minh giúp bạn tìm ra cuốn sách phù hợp với sở thích và mục tiêu học tập.",
    image: "https://ppj-group.com.vn/wp-content/uploads/2023/08/bia-cu-2.png",
  },
];

  return (
    <div className="flex min-h-screen overflow-hidden">
      {/* Left side - Carousel */}
      <div className="hidden md:flex md:w-1/2 bg-blue-900 relative">
        <div className="w-full h-full flex flex-col items-center justify-center p-12">
          <Carousel className="w-full max-w-md">
            <CarouselContent>
              {carouselItems.map((item, index) => (
                <CarouselItem key={index} className="flex flex-col items-center">
                  <div className="bg-gray-600 p-1 rounded-lg shadow-lg mb-8">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      className="w-full aspect-square object-cover"
                    />
                  </div>
                  <div className="text-center text-white">
                    <h2 className="text-2xl font-bold mb-4">{item.title}</h2>
                    <p className="text-md">{item.description}</p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="absolute -bottom-8 left-0 right-0 flex justify-center gap-2">
              {carouselItems.map((_, index) => (
                <div key={index} className={`h-2 w-2 rounded-full ${index === 0 ? "bg-white" : "bg-white/50"}`} />
              ))}
            </div>
          </Carousel>
        </div>
        
        
      </div>

      {/* Right side - Login/Register Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-4 scale-115 ">

             <motion.div
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 0.5 }}
             >
               <Card className="w-[25vw] border-[#062D76]">
                 <CardHeader>
                   <CardTitle className="flex justify-center">
                     <img src="/images/logo.png" alt="logo" className="w-30" />
                   </CardTitle>
                   <CardDescription className="text-center text-[#062D76]">
                   Mỗi cuốn sách là một cánh cửa mở ra thế giới tri thức
                   </CardDescription>
                 </CardHeader>
       
                 <CardContent>
                   <Tabs defaultValue="login" className="w-full">
                     <TabsList className="grid w-full grid-cols-2 bg-slate-200">
                       <TabsTrigger value="login" className="cursor-pointer">Đăng nhập</TabsTrigger>
                       <TabsTrigger value="signup" className="cursor-pointer">Đăng ký</TabsTrigger>
                     </TabsList>
       
                     {/* Đăng nhập */}
                     <TabsContent value="login">
                       <form onSubmit={handleSubmitLogin(onSubmitLogin)}>
                         <div className="space-y-4">
                           <div className="space-y-2">
                           <Label htmlFor="loginEmail" className="text-[#086280]">Email</Label>
                             <Input
                               type="email"
                               {...registerLogin("email")}
                               placeholder="Nhập email của bạn"
                               className="col-span-3 dark:border-gray-400 border-[#0E42D2] placeholder:text-gray-400"
                             />
                             {errorsLogin.email && (
                               <p className="text-red-500">{errorsLogin.email.message}</p>
                             )}
                           </div>
                           <div className="space-y-2">
                           <Label htmlFor="loginPassword" className="text-[#086280]">Mật khẩu</Label>
                             <Input
                               type="password"
                               {...registerLogin("matKhau")}
                               placeholder="Nhập mật khẩu của bạn"
                               className="col-span-3 dark:border-gray-400 border-[#0E42D2] placeholder:text-gray-400"
                             />
                             {errorsLogin.password && (
                               <p className="text-red-500">{errorsLogin.password.message}</p>
                             )}
                           </div>
       
                          
       
                           <Button type="submit" className="w-full bg-[#062D76] text-white">
                             <LogIn className="mr-2 w-4 h-4" /> Đăng nhập
                           </Button>
                         </div>
                       </form>
                     </TabsContent>
       
                     {/* Đăng ký */}
                     <TabsContent value="signup">
                       <form onSubmit={handleSubmitSignUp(onSubmitRegister)}>
                         <div className="space-y-4">
                           <div className="space-y-2">
                           <Label htmlFor="signupName" className="text-[#086280]">Tên người dùng</Label>
                             <Input
                               type="text"
                               {...registerSignUp("tenND")}
                               placeholder="Nhập tên người dùng"
                               className="col-span-3 dark:border-gray-400 border-[#0E42D2] placeholder:text-gray-400"
                             />
                           </div>
                           <div className="space-y-2">
                           <Label htmlFor="loginEmail" className="text-[#086280]">Email</Label>
                             <Input
                               type="email"
                               {...registerSignUp("email")}
                               placeholder="Nhập email của bạn"
                               className="col-span-3 dark:border-gray-400 border-[#0E42D2] placeholder:text-gray-400"
                             />
                           </div>
                           <div className="space-y-2">
                           <Label htmlFor="loginPassword" className="text-[#086280]">Mật khẩu</Label>
                             <Input
                               type="password"
                               {...registerSignUp("matKhau")}
                               placeholder="Nhập mật khẩu"
                               className="col-span-3 dark:border-gray-400 border-[#0E42D2] placeholder:text-gray-400"
                             />
                           </div>
                           <div className="space-y-2">
                             <Label>Ngày sinh</Label>
                             <Input type="date" {...registerSignUp("ngaySinh")}
                             className="col-span-3 dark:border-gray-400 border-[#0E42D2]" />
                           </div>
                           <div className="space-y-2">
                           <Label className="text-[#086280]">Giới tính</Label>
                             <Controller
                               name="gioiTinh"
                               control={control}
                               render={({ field }) => (
                                 <RadioGroup value={field.value} onValueChange={field.onChange} className="flex justify-between">
                                   <div className="flex items-center space-x-2">
                                   <RadioGroupItem value="Nam" id="male" /> Nam
                                   </div>
                                   <div className="flex items-center space-x-2">
                                   <RadioGroupItem value="Nu" id="female" /> Nữ
                                   </div>
                                   <div className="flex items-center space-x-2">
                                   <RadioGroupItem value="Khac" id="other" /> Khác
                                   </div>
                                 </RadioGroup>
                               )}
                             />
                           </div>
                           <Button type="submit" className="w-full bg-[#062D76] text-white">
                             Đăng ký
                           </Button>
                         </div>
                       </form>
                     </TabsContent>
                   </Tabs>
                 </CardContent>
               </Card>
             </motion.div>
       
      </div>
    </div>
  )
}

export default Page
