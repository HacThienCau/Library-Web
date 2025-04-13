"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { yupResolver } from "@hookform/resolvers/yup";
import { motion } from "framer-motion";
import { LogIn } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as yup from "yup";

const Page = () => {
  const router = useRouter();

  // Schema kiểm tra đầu vào
  const registerSchema = yup.object().shape({
    tenND: yup.string().required("Tên không được để trống"),
    email: yup
      .string()
      .email("Email không hợp lệ")
      .required("Email không được để trống"),
      matKhau: yup
      .string()
      .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
      .required("Mật khẩu không được để trống"),
    ngaySinh: yup.date().required("Ngày sinh không được để trống"),
    gioiTinh: yup
      .string()
      .oneOf(["Nam", "Nu", "Khac"], "Vui lòng chọn giới tính")
      .required("Giới tính không được để trống"),
  });

  const loginSchema = yup.object().shape({
    email: yup
      .string()
      .email("Email không hợp lệ")
      .required("Email không được để trống"),
      matKhau: yup
      .string()
      .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
      .required("Mật khẩu không được để trống"),
  });

  // Form đăng nhập
  const {
    register: registerLogin,
    handleSubmit: handleSubmitLogin,
    reset: resetLoginForm,
    formState: { errors: errorsLogin },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

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
  });

  // Xử lý đăng ký
const onSubmitRegister = async (data) => {
  try {
    // Gửi yêu cầu POST đến backend để đăng ký
    const response = await fetch('http://localhost:8081/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Đăng ký thất bại');
    }

    const result = await response.json();
    router.push('/');
    toast.success('Đăng ký tài khoản thành công');
  } catch (error) {
    console.error(error);
    toast.error('Có lỗi xảy ra');
  }
};

// Xử lý đăng nhập
const onSubmitLogin = async (data) => {
  try {
    // Gửi yêu cầu POST đến backend để đăng nhập
    const response = await fetch('http://localhost:8081/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Đăng nhập thất bại');
    }

    const result = await response.json();

    //  backend trả về JWT token
    localStorage.setItem('jwt', result.jwt); // Lưu token vào localStorage hoặc sessionStorage

    // Chuyển hướng người dùng sau khi đăng nhập thành công
    router.push('/');
    toast.success('Đăng nhập tài khoản thành công');
  } catch (error) {
    console.error(error);
    toast.error('Có lỗi xảy ra');
  }
};
  

  // Reset form khi chuyển tab
  useEffect(() => {
    resetLoginForm();
    resetSignUpForm();
  }, [resetLoginForm, resetSignUpForm]);

  return (
    <div className="min-h-screen bg-[#F9FDFF] flex items-center justify-center p-4 pt-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-md border-[#062D76]">
          <CardHeader>
            <CardTitle className="flex justify-center">
              <img src="/images/logo.jpg" alt="logo" className="w-20" />
            </CardTitle>
            <CardDescription className="text-center text-[#062D76]">
            Mỗi cuốn sách là một cánh cửa mở ra thế giới tri thức
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-slate-200">
                <TabsTrigger value="login">Đăng nhập</TabsTrigger>
                <TabsTrigger value="signup">Đăng ký</TabsTrigger>
              </TabsList>

              {/* Đăng nhập */}
              <TabsContent value="login">
                <form onSubmit={handleSubmitLogin(onSubmitLogin)}>
                  <div className="space-y-4">
                    <div>
                      <Label>Email</Label>
                      <Input
                        type="email"
                        {...registerLogin("email")}
                        placeholder="Nhập email của bạn"
                      />
                      {errorsLogin.email && (
                        <p className="text-red-500">{errorsLogin.email.message}</p>
                      )}
                    </div>
                    <div>
                      <Label>Mật khẩu</Label>
                      <Input
                        type="password"
                        {...registerLogin("matKhau")}
                        placeholder="Nhập mật khẩu của bạn"
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
                    <div>
                      <Label>Tên người dùng</Label>
                      <Input
                        type="text"
                        {...registerSignUp("tenND")}
                        placeholder="Nhập tên người dùng"
                      />
                    </div>
                    <div>
                      <Label>Email</Label>
                      <Input
                        type="email"
                        {...registerSignUp("email")}
                        placeholder="Nhập email của bạn"
                      />
                    </div>
                    <div>
                      <Label>Mật khẩu</Label>
                      <Input
                        type="password"
                        {...registerSignUp("matKhau")}
                        placeholder="Nhập mật khẩu"
                      />
                    </div>
                    <div>
                      <Label>Ngày sinh</Label>
                      <Input type="date" {...registerSignUp("ngaySinh")} />
                    </div>
                    <div>
                      <Label>Giới tính</Label>
                      <Controller
                        name="gioiTinh"
                        control={control}
                        render={({ field }) => (
                          <RadioGroup value={field.value} onValueChange={field.onChange}>
                            <RadioGroupItem value="Nam" id="male" /> Nam
                            <RadioGroupItem value="Nu" id="female" /> Nữ
                            <RadioGroupItem value="Khac" id="other" /> Khác
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
  );
};

export default Page;
