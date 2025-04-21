"use client";
import { usePathname, useRouter } from "next/navigation";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Menu as MenuIcon, X, Bell, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";




const navigation = [
  { name: "Trang chủ", href: "/" },
  { name: "Thể loại", href: "/Categories" },
  { name: "Giới thiệu", href: "/About" },
  { name: "Liên hệ", href: "/Contact" },
];

const CartBadge = ({ count }) => {
  return (
    <div
      className="absolute self-center items-center right-0.5 px-1 text-[0.65rem] font-medium text-center justify-center text-white bg-[#F7302E] rounded-full"
      role="status"
      aria-label={`${count} books`}
    >
      {count}
    </div>
  );
};

const Header = () => {
  const pathname = usePathname();
const router = useRouter();

const handleLogout = () => {
  localStorage.removeItem("jwt");
  router.push("/user-login");
};
  return (
    <header className="bg-[#062D76] text-white shadow-lg fixed top-0 left-0 w-full z-50">
      <Disclosure as="nav" className="mx-auto">
        {({ open }) => (
          <>
            <div className="flex justify-between items-center h-14 px-2 md:px-5">
              {/* Logo */}
              <div className="flex items-center">
                <Link href="/">
                  {/* <Image
                    alt="Logo"
                    src="/images/logo.jpg"
                    width={40}
                    height={40}
                    className="h-10 w-auto rounded-full"
                  /> */}
                  <h1 className="text-3xl font-bold text-white font-[Moul]">
                    OurLogo
                  </h1>
                </Link>
              </div>

              {/* Navigation Links */}
              <div className="hidden sm:flex space-x-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`px-3 py-2 rounded-md text-lg font-medium transition duration-200 ${
                      pathname === item.href
                        ? "bg-white text-[#052259]"
                        : "hover:bg-white hover:text-[#052259]"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* Right Icons */}
              <div className="flex items-center space-x-4">
                <button
                  className={`relative pr-2 pl-1.5 py-2 rounded-full cursor-pointer hover:bg-white hover:text-[#052259] ${
                    pathname === "/cart"
                      ? "bg-white text-[#052259]"
                      : "hover:bg-white hover:text-[#052259]"
                  }`}
                >
                  <Link href="/cart">
                    <CartBadge count={3} />
                    <ShoppingCart
                      style={{
                        width: "1.5rem",
                        height: "1.5rem",
                        strokeWidth: "1.5px",
                      }}
                      className="size-6"
                    />
                  </Link>
                </button>

                <button
                  className={`relative p-2 rounded-full cursor-pointer hover:bg-white hover:text-[#052259] ${
                    pathname === "/notifications"
                      ? "bg-white text-[#052259]"
                      : "hover:bg-white hover:text-[#052259]"
                  }`}
                >
                  <Link href="/notifications">
                    <Bell
                      style={{
                        width: "1.5rem",
                        height: "1.5rem",
                        strokeWidth: "1.5px",
                      }}
                      className="size-6"
                    />
                  </Link>
                </button>

                {/* Profile Dropdown */}
                <Menu as="div" className="relative">
                  <MenuButton className="flex rounded-full">
                    <Image
                      alt="User"
                      src="/images/logo.jpg"
                      width={40}
                      height={40}
                      className="size-10 rounded-full border-2 border-white cursor-pointer"
                    />
                  </MenuButton>
                  <MenuItems className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black/5">
                    <MenuItem>
                      {({ active }) => (
                        <Link
                          href="/user-profile"
                          className={`block px-4 py-2 text-gray-700 ${
                            active && "bg-gray-100"
                          }`}
                        >
                          Hồ sơ của bạn
                        </Link>
                      )}
                    </MenuItem>
                    <MenuItem>
                      {({ active }) => (
                        <Link
                          href="/settings"
                          className={`block px-4 py-2 text-gray-700 ${
                            active && "bg-gray-100"
                          }`}
                        >
                          Cài đặt
                        </Link>
                      )}
                    </MenuItem>
                    <MenuItem>
                      {({ active }) => (
                        <button
                        onClick={handleLogout}
                        className={`w-full text-left px-4 py-2 text-gray-700 ${
                          active && "bg-gray-100"
                        }`}
                      >
                        Đăng xuất
                      </button>
                      )}
                    </MenuItem>
                  </MenuItems>
                </Menu>
              </div>

              {/* Mobile Menu Button */}
              <div className="sm:hidden">
                <DisclosureButton className="p-2 rounded-md hover:bg-blue-700">
                  {open ? (
                    <X className="size-6" />
                  ) : (
                    <MenuIcon className="size-6" />
                  )}
                </DisclosureButton>
              </div>
            </div>

            {/* Mobile Menu Panel */}
            <DisclosurePanel className="sm:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigation.map((item) => (
                  <DisclosureButton
                    key={item.name}
                    as={Link}
                    href={item.href}
                    className={`block px-3 py-2 rounded-md text-base font-medium transition ${
                      pathname === item.href
                        ? "bg-white text-[#052259]"
                        : "hover:bg-blue-700 hover:text-gray-100"
                    }`}
                  >
                    {item.name}
                  </DisclosureButton>
                ))}
              </div>
            </DisclosurePanel>
          </>
        )}
      </Disclosure>
    </header>
  );
};

export default Header;
