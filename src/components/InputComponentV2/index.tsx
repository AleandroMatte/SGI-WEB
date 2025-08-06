import type { ComponentProps } from "react";

interface DefaultInputComponent2 extends ComponentProps<"input"> {
  className: string;
  label: string;
}

export default function DefaultInputComponent2({
  className,
  label,
  ...inputProps
}: DefaultInputComponent2) {
  return (
    <div className="flex flex-col">
      <label className="block">
        {label}{" "}
        <input
          {...inputProps}
          className={`block inset-ring inset-ring-sgiBlack rounded-[2vw] border p-[10px] ${className}`}
        ></input>
      </label>
    </div>
  );
}
