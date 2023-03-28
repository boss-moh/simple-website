import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import ButtonIcon from "../ButtonIcon";
import { CloseIcon } from "../../images";
import Button from "../Button";

export function Message({
  title = "",
  children,
  isShow,
  setIsShow,
  defaultButtton = "Close",
  actionButton = "",
  classButtons = "",
  defaultButttonClass = "",
  defaultActionClass = "",
  action,
}) {
  function closeModal() {
    setIsShow(false);
  }

  function handleAction() {
    action();
    closeModal();
  }

  return (
    <>
      <Transition
        appear
        show={isShow}
        as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center relative">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95">
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-4 text-left align-middle shadow-xl transition-all">
                  {title && (
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900">
                      {title}
                    </Dialog.Title>
                  )}
                  <ButtonIcon
                    className="absolute top-5 right-3"
                    onClick={closeModal}>
                    <CloseIcon />
                  </ButtonIcon>
                  <div className="mt-2">{children}</div>
                  <div className={`mt-6 ${classButtons}`}>
                    {defaultButtton && (
                      <Button
                        theme="second"
                        onClick={closeModal}
                        className={defaultButttonClass}>
                        {defaultButtton}
                      </Button>
                    )}
                    {actionButton && (
                      <Button
                        theme="main"
                        onClick={handleAction}
                        className={defaultActionClass}>
                        {actionButton}
                      </Button>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default Message;
