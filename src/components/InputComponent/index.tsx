import type React from "react";

type AllowedInputTypes = "email" | "password" | "text";

interface DefaultInputProps {
  label: string;
  placeholderText: string;
  type: AllowedInputTypes;
  value: string;
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function DefaultInput({
  label,
  placeholderText,
  type,
  value,
  onChangeHandler,
}: DefaultInputProps) {
  return (
    <div className="flex flex-col">
      <label className="text-sm">{label}</label>
      <input
        className="inset-ring inset-ring-indigo-500 min-h-[40px] rounded-[2vw] border"
        style={{
          padding: "5px",
          borderRadius: "10px",
        }}
        value={value}
        type={type}
        onChange={onChangeHandler}
        placeholder={placeholderText}
      ></input>
    </div>
  );
}
