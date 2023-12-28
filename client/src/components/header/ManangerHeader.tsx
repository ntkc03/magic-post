import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { logout } from "../../features/redux/slices/user/userLoginAuthSlice";
import { clearToken } from "../../features/redux/slices/user/tokenSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../../features/redux/reducers/Reducer";
import {
  fetchUser,
  clearUserDetails,
} from "../../features/redux/slices/user/userDetailsSlice";
import { employerInterface } from "../../types/EmployerInterface";
import { employerData } from "../../features/axios/api/employer/userDetails";

//************************************
// Description: Phần Header cho trang dành cho Trưởng điểm tập kết/giao dịch.
//************************************

// Mảng lưu trữ thông tin chuyển hướng cho navigation section trên header.
const navigation = [
  { name: "Quản lý đơn hàng", href: "/manager/orders", current: false },
  { name: "Quản lý tài khoản", href: "/manager/employee", current: false },
];

// Hàm tạo một chuỗi tên lớp dựa trên các đối số đầu vào.
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}


function ManangerHeader() {
  // Kích hoạt hành động và sửa đổi trạng thái trong ứng dụng react.
  const dispatch = useDispatch();
  // Cho phép điều hướng theo chương trình đến các tuyến khác nhau trong ứng dụng.
  const navigate = useNavigate();

  // Thành phần và hàm thay đổi trạng thái của thành phần.
  const [employerDetails, setEmployerDetails] = useState<employerInterface>();
  
  // Biến xét xem trang đã được đăng nhập hay chưa?
  const isLoggedIn = useSelector(
    (state: RootState) => state.userAuth.isLoggedIn
  );

  // Token sử dụng khi trước đó đã lưu mã thông báo xác thực của người dùng 
  // vào bộ nhớ cục bộ sau khi đăng nhập thành công
  const token = localStorage.getItem("token");

  // Kiểm tra đã đăng nhập hay chưa, nếu chưa đăng nhập thì không vào được các trang làm việc
  // của trưởng điểm.
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/');
    }
  }, []);

  // Sau khi đăng nhập, lấy dữ liệu liên quan của trưởng điểm và lưu trữ vào emPloyerDetails.
  useEffect(() => {
    if (token) {
      dispatch(fetchUser());
      const employerDetails = async () => {
        const data = await employerData();
        setEmployerDetails(data);
      }
      employerDetails();
    }
    return () => {
      dispatch(clearUserDetails());
    };
  }, [dispatch]);

  // Hàm thực hiện hành động đăng xuất khi đăng xuất ra khỏi trang web.
  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearToken());
    navigate("/");
  };

  return (
    <div className="fixed top-0 w-full bg-background z-50 shadow-lg" id="fixed-header">
      <Disclosure as="nav" className="">
        {({ open }) => (
          <div className="">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Nút mở navigation đối với điện thoại*/}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                {/* Tên của trang web */}
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex flex-shrink-0 items-center">
                    <a href="/homepage" className="block h-8 w-auto text-bold text-2xl font-logo text-textColor">MagicPost</a>
                  </div>
                </div>

                {/* Tương ứng với một đối tượng trong mảng navigation, tạo ra một bộ chuyển hướng có tên và đường dẫn đã được lưu. */}
                {/* Navigation trên kích thước lớn hơn kích thước điện thoại (small).*/}
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            "text-black hover:bg-buttonBlue hover:text-white",
                            "rounded-md px-3 py-2 text-sm font-medium"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>


                  {/* Dropdown liên quan đến người dùng
                  Khi nhấn vào hình ảnh người dùng, sẽ hiện tên của trưởng điểm và nút Đăng xuất */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="flex rounded-full text-sm hover:opacity-50">
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full"
                          src="https://i.imgur.com/4yMatlX.png"
                          alt="user"
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none text-textColor">
                        <Menu.Item>
                          <text
                            className={classNames(
                              "block px-4 py-2 text-sm hover:opacity-50"
                            )}
                          >
                            {employerDetails?.name ?? ""}
                          </text>
                        </Menu.Item>
                        <Menu.Item>
                          <Link to={"/user/profile"}>
                            <button
                              className={classNames(
                                "block px-4 py-2 text-sm hover:opacity-50"
                              )}
                              onClick={() => {
                                handleLogout();
                              }}
                            >
                              Đăng xuất
                            </button>
                          </Link>
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>

            {/* Navigation của trang web trên điện thoại. Khi lớn hơn kích thước điện thoại thì nó sẽ không xuất hiện. */}
            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      "bg-buttonBlue text-textColor",
                      "hover:bg-gray-200 opacity-75",
                      "block rounded-md px-3 py-2 text-base font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </div>
        )}
      </Disclosure>
    </div>
  );
}

export default ManangerHeader;
export { };