"use client";
import { usePathname } from "next/navigation";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Menu as MenuIcon, X, Bell } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const navigation = [
  { name: "Trang chủ", href: "/" },
  { name: "Thể loại", href: "/Categories" },
  { name: "Giới thiệu", href: "/About" },
  { name: "Liên hệ", href: "/Contact" },
];

const Header = () => {
  const pathname = usePathname();

  return (
    <header className="bg-blue-900 text-white shadow-lg fixed top-0 left-0 w-full z-50">
      <Disclosure as="nav" className="container mx-auto px-4 sm:px-6 lg:px-8">
        {({ open }) => (
          <>
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <div className="flex items-center">
                <Link href="/">
                  <Image
                    alt="Logo"
                    src="/images/logo.jpg"
                    width={40}
                    height={40}
                    className="h-10 w-auto rounded-full"
                  />
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
                        ? "bg-white text-blue-900"
                        : "hover:bg-white hover:text-blue-900"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              
              {/* Right Icons */}
              <div className="flex items-center space-x-4">
                <button className="relative p-2 rounded-full hover:bg-blue-700">
                  <Bell className="size-6" />
                </button>
                
                {/* Profile Dropdown */}
                <Menu as="div" className="relative">
                  <MenuButton className="flex rounded-full">
                    <Image
                      alt="User"
                      src="/images/logo.jpg"
                      width={40}
                      height={40}
                      className="size-10 rounded-full border-2 border-white"
                    />
                  </MenuButton>
                  <MenuItems className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black/5">
                    <MenuItem>
                      {({ active }) => (
                        <Link
                          href="/user-profile"
                          className={`block px-4 py-2 text-gray-700 ${active && "bg-gray-100"}`}
                        >
                          Hồ sơ của bạn
                        </Link>
                      )}
                    </MenuItem>
                    <MenuItem>
                      {({ active }) => (
                        <Link
                          href="/settings"
                          className={`block px-4 py-2 text-gray-700 ${active && "bg-gray-100"}`}
                        >
                          Cài đặt
                        </Link>
                      )}
                    </MenuItem>
                    <MenuItem>
                      {({ active }) => (
                        <Link
                          href="/logout"
                          className={`block px-4 py-2 text-gray-700 ${active && "bg-gray-100"}`}
                        >
                          Đăng xuất
                        </Link>
                      )}
                    </MenuItem>
                  </MenuItems>
                </Menu>
              </div>
              
              {/* Mobile Menu Button */}
              <div className="sm:hidden">
                <DisclosureButton className="p-2 rounded-md hover:bg-blue-700">
                  {open ? <X className="size-6" /> : <MenuIcon className="size-6" />}
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
                        ? "bg-white text-blue-900"
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
