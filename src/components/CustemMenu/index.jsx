import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";

export function CustemMenu({
  button = "Menu",
  buttonClassName = "",
  children = "",
  className = "",
}) {
  function getChildren(items) {
    if (Array.isArray(items)) {
      return items.map((item, index) => getItem(item, index));
    } else {
      return getItem(items);
    }
  }

  function getItem(item, index = "0") {
    return (
      <div
        className="px-1 py-1 "
        key={index}>
        <Menu.Item>{item}</Menu.Item>
      </div>
    );
  }
  return (
    <Menu
      as="div"
      className="relative inline-block text-left">
      <div>
        <Menu.Button
          className={`flex w-full justify-center items-center rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 ${buttonClassName}`}>
          {button}
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95">
        <Menu.Items
          className={`absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-200 rounded-md bg-white shadow-lg ring-2 ring-black ring-opacity-5 focus:outline-none ${className}`}>
          {getChildren(children)}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export default CustemMenu;
