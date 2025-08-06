import type { PropsWithChildren } from "react";
import { createPortal } from "react-dom";

interface ModalInteface {
  modalHeader: string;
}
export default function Modal({
  modalHeader,
  children,
}: PropsWithChildren<ModalInteface>) {
  return createPortal(
    <div
      className="absolute inset-0  bg-black flex items-center justify-center"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.719)" }}
    >
      <div className="w-[50vw] h-[50vh] p-[10px] flex flex-col rounded-2xl bg-white opacity-100 ">
        <div className="p-[5px]">
          <h1>{modalHeader}</h1>
          <hr />
        </div>
        <div>{children}</div>
      </div>
    </div>,
    document.body
  );
}
