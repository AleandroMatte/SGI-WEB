import type { ComponentProps } from "react";

interface DefaultButtonComponent extends ComponentProps<"button"> {
  className: string;
  label: string;
}

export default function DefaultButton({
  className,
  label,
  ...buttonProps
}: DefaultButtonComponent) {
  return (
    <button
      {...buttonProps}
      className={`min-h-[10px] text-white cursor-pointer bg-sgiBlack hover:bg-sgiHoverBlack rounded-full shadow-xl/30 flex items-center transition duration-200 ease-linear justify-center text-center ${className}`}
    >
      {label}
    </button>
  );
}
