import React from "react";
import { Fragment } from "react";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const navigation = [
  { name: "Home", href: "homepage", current: false },
  { name: "Service", href: "", current: false },
  { name: "Process", href: "", current: false },
  { name: "About", href: "", current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

function CommonHeader() {
  return (
    <Disclosure as="nav" className="bg-background">
      {({ open }) => (
        <>
          <div className="sm:mx-2 mx-auto  px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-black-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="sm:flex-1 sm:justify-start flex w-full justify-center text-bold text-2xl font-logo">
                MagicPost
              </div>
              <div className="flex-4 hidden sm:block">
                <div className="flex space-x-4">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={classNames(
                          "text-black hover:opacity-75",
                          "rounded-md px-3 py-2 text-base font-mediun"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name} 
                    </a>
                  ))}
                </div>
              </div>

              <div className="absolute right-0 flex-1 sm:relative sm:block">
                <Disclosure.Button className="flex-1 items-center float-right rounded-md p-2 sm:bg-buttonbg bg-buttonBlue hover:underline sm:text-white text-textColor focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <a href = "/user/login">LOGIN</a>
                </Disclosure.Button>
              </div>
            </div>
          </div>

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
        </>
      )}
    </Disclosure>
  );
}

export default CommonHeader;
export{};